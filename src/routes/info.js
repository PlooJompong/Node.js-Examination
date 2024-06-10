import { Router } from "express";
import { getCompanyInfo } from "../controller/info.js"
import { getAllProducts } from "../controller/menu.js";

const router = Router();

// Get menu
router.get("/menu", getAllProducts)

// Get company info
router.get("/", getCompanyInfo)

export default router;