import { Router } from "express";
import getCompanyInfo from "../controller/info.js"
import { getAllProducts } from "../controller/menu.js";

const router = Router();

router.get("/menu", getAllProducts)

// localhost:8000/company
router.get("/", async (req, res) => {
  const info = await getCompanyInfo()
  res.json({ info: info[0].info })

});

export default router;