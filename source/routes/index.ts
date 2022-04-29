import { Router } from "express";
import * as MainControllers from "../controllers/supplier.controller";

const router = Router();

router.get("/", MainControllers.searchAll);
router.get("/search-supplier", MainControllers.search);
router.post("/register", MainControllers.resgiter);
router.put("/update", MainControllers.update);
router.delete("/delete", MainControllers.exclude);

export default router;
