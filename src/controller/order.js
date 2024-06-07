import db from '../database/database.js';

//Search for all orders in orders database made by customer with selected customerId.
//User story:  Som en inloggad användare vill jag kunna se min orderhistorik för att jag ska kunna få en överblick över när och vad jag beställt samt för hur mycket.

const getOrdersByCustomerId = async (customerId) => {
  try {
    const orders = await db.orders.find({ customerID: customerId });
    return orders;
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
}

const getOrderByOrderId = async (orderId) => {
  try {
    const order = await db.orders.findOne({ _id: orderId });
    return order;
  } catch (error) {
    console.error("Error fetching order", error);
    throw error;
  }
}

export { getOrdersByCustomerId, getOrderByOrderId };