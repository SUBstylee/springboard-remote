window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const initialValues = {
    amount: 1000,
    year: 1,
    rate: 5
  }
  const uiAmount = document.getElementById('loan-amount');
  uiAmount.value = initialValues.amount;
  const uiYear = document.getElementById('loan-years');
  uiYear.value = initialValues.year;
  const uiRate = document.getElementById('loan-rate');
  uiRate.value = initialValues.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const uiValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(uiValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const p = values.amount;
  const i = (values.rate / 100) / 12;
  const n = Math.floor(values.years * 12);
  const due = ((p * i) / (1 - Math.pow((1 + i), -n))).toFixed(2);
  if (isNaN(n) || !isFinite(due)) {
    return 'You must enter a valid term and rate.'
  }
  return due;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const display = document.getElementById('monthly-payment');
  display.innerHTML = `$${monthly}`;
}
