import db from '../database/database.js';

const getOrdersByCustomerId = async (req, res) => {
  try {
    const customerID = req.params.id
    const orders = await db.orders.find({ customerID: customerID });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ orders })
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const getOrderByOrderId = async (req, res) => {
  try {
    const orderId = req.params.id
    const order = await db.orders.findOne({ _id: orderId });

    if (!order || order.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order })
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export { getOrdersByCustomerId, getOrderByOrderId };