import { Router } from "express";
import { createDeal, getFarmerDeals, getBuyerDeals, getDeal, responseDeal, requestCompletion, confirmCompletion } from "../controllers/deal.controller.js";

const router = Router();

router.post("/", createDeal);
router.get("/farmer", getFarmerDeals);
router.get("/buyer", getBuyerDeals);
router.get("/:id", getDeal);
router.patch("/:id/respond", responseDeal);
router.patch("/:id/request-completion", requestCompletion);
router.patch("/:id/confirm-completion", confirmCompletion);

export default router;
