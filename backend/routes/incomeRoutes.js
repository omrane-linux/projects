const express = require("express");
const {
  addIncome,
  getAllincomes,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controllers/incomeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllincomes);
router.delete("/:id", protect, deleteIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);

module.exports = router;
