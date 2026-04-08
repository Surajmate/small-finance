function calculateLoan() {
  let amount = document.getElementById("amount").value;
  let rate = document.getElementById("rate").value;
  let time = document.getElementById("time").value;

  let interest = (amount * rate * time) / 100;
  let total = parseFloat(amount) + interest;

  document.getElementById("result").innerText =
    "Total Payable: ₹" + total.toFixed(2);
}

function scrollToApply() {
  document.getElementById("apply").scrollIntoView({ behavior: "smooth" });
}