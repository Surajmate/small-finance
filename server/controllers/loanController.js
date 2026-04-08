const Loan = require("../models/Loan");

exports.calculateLoan = async (req, res) => {
  try {
    const { amount, rate, time } = req.body;

    const interest = (amount * rate * time) / 100;
    const total = amount + interest;

    const loan = new Loan({
      userId: req.user.id, // 🔥 link user
      amount,
      rate,
      time,
      interest,
      total
    });

    await loan.save();

    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all loans (for logged-in user)
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};