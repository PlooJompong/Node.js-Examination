import db from "../../database/database.js";
import formatDate from "../../utils/dateFormatter.js";

// Add new product
const addProduct = async (req, res) => {
  try {
    const { title, desc, price } = req.body;

    // Case-insensitive check for an existing product title
    const existingProduct = await db.menu.findOne({ title: { $regex: new RegExp('^' + title + '$', 'i') } });

    if (existingProduct) {
      return res.status(409).json({ message: "Product with this title already exists" });
    }

    const newProduct = await db.menu.insert({
      title,
      desc,
      price,
      createAt: formatDate(new Date()),
      modifiedAt: ""
    });

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { title, desc, price, productID } = req.body;

    const existingProduct = await db.menu.findOne({ _id: productID });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newTitle = title ? title : existingProduct.title;
    const newDesc = desc ? desc : existingProduct.desc;
    const newPrice = price ? price : existingProduct.price;

    // Check if title already exists
    if (newTitle !== existingProduct.title) {
      const titleExists = await db.menu.findOne({ title: { $regex: new RegExp('^' + newTitle + '$', 'i') } });

      if (titleExists) {
        return res.status(409).json({ message: "Product with this title already exists" });
      }
    }

    const updateData = {
      title: newTitle,
      desc: newDesc,
      price: newPrice,
      createAt: existingProduct.createAt,
      modifiedAt: formatDate(new Date()),
      _id: productID
    }

    await db.menu.update(
      { _id: productID },
      { $set: updateData }
    );

    const updatedProduct = await db.menu.findOne({ _id: productID });

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { productID } = req.body;
    const existingProduct = await db.menu.findOne({ _id: productID });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await db.menu.remove({ _id: productID }, {});

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { addProduct, updateProduct, deleteProduct }