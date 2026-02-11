const express = require("express");
const { getInvestmentAdvice } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/recommend", protect, getInvestmentAdvice);

module.exports = router;
