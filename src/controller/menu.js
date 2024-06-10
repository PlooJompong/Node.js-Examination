import db from '../database/database.js';

// Get menu
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await db.menu.find({});
    res.send(allProducts);
  } catch (error) {
    res.status(500).send({ error: 'Could not get find the menu... no coffee for you!' });
  }
};

export { getAllProducts };