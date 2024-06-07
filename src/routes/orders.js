import { Router } from "express";
import { getOrdersByCustomerId, getOrderByOrderId } from "../controller/order.js";
import authenticate from "../middleware/auth.js";

const router = Router();

//Sök order genom att ange order-id. Använd authenticate middleware för att kontrollera att användaren är inloggad.:
router.get("/:id", authenticate, async (req, res) => {
  try {
    const order = await getOrdersByCustomerId(req.params.id);
    if (order) {
      res.json({ order })
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
});

//Sök order genom att ange order-id:
router.get("/confirmation/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getOrderByOrderId(orderId);
    if (order) {
      //Beräkna tid för leverans (20 min)
      const orderDate = new Date(order.date);
      const deliveryDate = new Date(orderDate.getTime() + 20 * 60000); //Räkna om till millisekunder
      // Gör formatet till HH:MM
      const deliveryTime = deliveryDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Returnera order med leveranstid
      res.json({ ...order, deliveryTime });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
});

export default router;