const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  getAllLoans,
  updateLoanStatus,
} = require("../controllers/adminController");

router.get("/loans", auth, admin, getAllLoans);
router.put("/loan/:id", auth, admin, updateLoanStatus);

module.exports = router;