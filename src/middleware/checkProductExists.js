import db from "../database/database.js";

const checkProductExists = async (req, res, next) => {
  const { product, customerID, cartID, quantity } = req.body;

  if (quantity && quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity can not be negative or zero" });
  }

  try {
    const productQuery = await db.menu.findOne({ _id: product });

    if (!productQuery) {
      return res
        .status(404)
        .json({ error: "Product not found in the database" });
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
  if (cartID && customerID) {
    try {
      const cartQuery = await db.cart.findOne({
        _id: cartID,
        customerID: customerID,
      });
      if (!cartQuery) {
        return res.status(404).json({
          error: "Cart with customerID and cartID  not found in database",
        });
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    if (cartID) {
      try {
        const cartQuery = await db.cart.findOne({ _id: cartID });
        if (!cartQuery) {
          return res.status(404).json({ error: "Cart not found in database" });
        }
      } catch (error) {
        console.error("Error querying the database:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
    if (customerID) {
      try {
        const customerQuery = await db.customers.findOne({ _id: customerID });
        if (!customerQuery) {
          return res
            .status(404)
            .json({ error: "Customer not found in database" });
        }
      } catch (error) {
        console.error("Error querying the database:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  }
  next();
}

export default checkProductExists;