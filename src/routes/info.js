import { Router } from "express";
import { getCompanyInfo } from "../controller/info.js"
import { getAllProducts } from "../controller/menu.js";

const router = Router();

// GET menu
router.get("/menu", getAllProducts)

// GET company info
router.get("/", getCompanyInfo)

export default router;