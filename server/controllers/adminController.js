const Loan = require("../models/Loan");

// Get all loans
exports.getAllLoans = async (req, res) => {
  const loans = await Loan.find().populate("userId", "email");
  res.json(loans);
};

// Update loan status
exports.updateLoanStatus = async (req, res) => {
  const { status } = req.body;

  const loan = await Loan.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(loan);
};