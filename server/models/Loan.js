const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  amount: Number,
  rate: Number,
  time: Number,
  interest: Number,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Loan", loanSchema);