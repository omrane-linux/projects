const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getDashboardData, updateTarget } = require("../controllers/dashboardController");
const router = express.Router();
router.get("/", protect, getDashboardData);
router.post("/target", protect, updateTarget);

module.exports = router;