import db from "../database/database.js";
import formatDate from "../utils/dateFormatter.js";

// Add to cart
const addToCart = async (req, res) => {
  const productID = req.body.product;
  const cartID = req.body.cartID;
  const quantity = req.body.quantity ? req.body.quantity : 1;
  const coffeeQuery = await db.menu.findOne({ _id: productID });

  const queryWithQuantity = {
    ...coffeeQuery,
    quantity: (quantity),
  };

  if (cartID) {
    const cartQuery = await db.cart.findOne({ _id: cartID });
    // Check if product is already added
    const productExists = cartQuery.product.some(
      (product) => product._id === productID
    );

    if (productExists) {
      // Find index of the existing product
      const productIndex = cartQuery.product.findIndex(
        (product) => product._id === productID
      );

      // Calculate new quantity
      const newQuantity = quantity + cartQuery.product[productIndex].quantity;

      // Update the document
      try {
        await db.cart.update(
          { _id: cartID },
          {
            $set: {
              [`product.${productIndex}.quantity`]: newQuantity,
            },
          },
          { returnUpdatedDocs: true }
        );
        const productInfo = { ...coffeeQuery };
        return res.status(200).json({ product: "Added", productInfo });
      } catch {
        return res.status(500).send({ message: "Could not update database" });
      }
    }
    // Add new product
    else {
      // Add new product to the product array
      try {
        const result = await db.cart.update(
          { _id: cartID },
          { $push: { product: queryWithQuantity } },
          { returnUpdatedDocs: true } // This option will return the updated document
        );

        const productInfo = { ...coffeeQuery };
        return res.status(200).json({ product: "Added", productInfo });
      } catch {
        return res.status(500).json({ message: "Error updating document" });
      }
    }
  } else {
    try {
      const inputQuery = await db.cart.insert({
        customerID: req.body.customerID ? req.body.customerID : "",
        product: [queryWithQuantity],
      });
      const instructions =
        "cartID would've been saved to session/cookie to be included in the next call";
      const message = { ...inputQuery, instructions };
      res.status(200).json(message);
    } catch {
      return res.status(500).json({ message: "Error updating document" });
    }
  }
};

// Show cart
const showCart = async (req, res) => {
  try {
    const cartID = req.params.id;
    const cart = await db.cart.findOne({ _id: cartID });

    let totalPrice = 0;

    if (!cart) {
      return res
        .status(404)
        .json({ message: `Cart: ${cartID} could not be found` });
    }

    cart.product.forEach((product) => {
      totalPrice += product.quantity * product.price;
    });

    const showCart = { ...cart, totalPrice, };

    res.send(showCart);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Could not get find the cart... no coffee for you!" });
  }
};

// Place order
const placeOrder = async (req, res) => {
  try {
    const { customerID, cartID, guestInfo, discountID } = req.body;

    const orderTime = formatDate(new Date());
    const estimatedDelivery = formatDate(new Date(Date.now() + 20 * 60 * 1000));

    let orderCustomerID = customerID;
    let price = 0;
    let discountPrice = 0;
    let discountItems = [];

    if (!cartID) {
      return res.status(400).json({ message: "CartID is required" });
    }

    const cart = await db.cart.findOne({ _id: cartID });

    if (!cart) {
      return res.status(400).json({ message: "Invalid CartID" });
    }

    if (guestInfo && customerID) {
      return res.status(400).json({ message: "Cannot provide both CustomerID and GuestInfo" });
    }

    if (!orderCustomerID && guestInfo) {
      const { email, phone } = guestInfo;
      if (!email || !phone) {
        return res.status(400).json({ message: "Guest email and phone are required" });
      }

      // Create a guest entry if not order as registered user
      const guestCustomer = await db.customers.insert({
        username: "guest",
        email: guestInfo.email,
        phone: guestInfo.phone
      });
      orderCustomerID = guestCustomer._id;
    }

    if (orderCustomerID && !guestInfo) {
      const customer = await db.customers.findOne({ _id: orderCustomerID });

      if (!customer) {
        return res.status(400).json({ message: "Customer not found" });
      }
    }

    // Check if customerID or guestInfo is provided
    if (!orderCustomerID) {
      return res.status(400).json({ message: "CustomerID or valid GuestInfo is required" });
    }

    // Check if discount code is valid
    if (discountID) {
      const discount = await db.discount.findOne({ _id: discountID });

      if (!discount) {
        return res.status(400).json({ message: "Invalid discount code" });
      }

      discountItems = discount.products;
      discountPrice = discount.discountPrice;

      // All product titles from cart
      const productTitles = cart.product.map(product => product.title);

      // Compare product titles with discount items
      const allItemsInDiscount = discountItems.every(item => productTitles.includes(item));

      if (!allItemsInDiscount) {
        return res.status(400).json({ message: "Not all discount products are in the cart" });
      }
    }

    // All products from cart
    const allCartProducts = cart.product;

    // Calculate total price
    allCartProducts.forEach((product) => {
      price += product.quantity * product.price;
    });

    const totalPrice = Math.max(price - discountPrice, 0);

    const newOrder = {
      customerID: orderCustomerID,
      cartID: cartID,
      cartProducts: allCartProducts,
      orgPrice: price,
      discount: discountPrice,
      totalPrice: totalPrice,
      orderAt: orderTime,
      estimatedDelivery: estimatedDelivery,
    };

    const savedOrder = await db.orders.insert(newOrder);

    res.json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteOrder = async (req, res) => {
  try {
    const { cartID } = req.body
    const cartItem = await db.cart.findOne({ _id: cartID });

    if (!cartItem) {
      return res.status(400).json({ message: "Cart not found" });
    }

    await db.cart.remove({ _id: cartID }, {});

    res.json({ message: `successfully delete cart ${cartID}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteItemInOrder = async (req, res) => {
  try {
    const { cartID, productID } = req.body;

    if (!cartID || !productID) {
      return res.status(400).json({ message: "CartID and productID are required" });
    }

    const cartItem = await db.cart.findOne({ _id: cartID });

    if (!cartItem) {
      return res.status(400).json({ message: "Cart not found" });
    }

    const productIndex = cartItem.product.findIndex(p => p._id === productID);

    if (productIndex === -1) {
      return res.status(400).json({ message: "Product not found in cart" });
    }

    cartItem.product.splice(productIndex, 1);

    await db.cart.update(
      { _id: cartID },
      { $set: { product: cartItem.product } }
    );

    res.json({ message: `Product ${cartID} removed from the cart`, updatedCart: cartItem.product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  addToCart,
  deleteOrder,
  deleteItemInOrder,
  showCart,
  placeOrder,
  formatDate,
};