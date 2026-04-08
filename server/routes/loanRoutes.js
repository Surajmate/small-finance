const express = require("express");
const router = express.Router();
const { calculateLoan, getLoans } = require("../controllers/loanController");
const auth = require("../middleware/auth");

router.get("/", auth, getLoans);
router.post("/", auth, calculateLoan);

module.exports = router;