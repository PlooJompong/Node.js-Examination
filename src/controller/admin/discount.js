import db from "../../database/database.js";

// Add new discount
const addDiscount = async (req, res) => {
  try {
    const { title, productID, discountPrice } = req.body;

    const products = await db.menu.find({ _id: { $in: productID } });

    if (products.length !== productID.length) {
      return res.status(404).json({ message: "One or more product not found in database" });
    }

    const productTitles = products.map(product => product.title);

    const discount = await db.discount.insert({
      title,
      products: productTitles,
      discountPrice
    });

    res.status(200).json({ message: "Discount added successfully", discount });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { addDiscount }