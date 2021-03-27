
it('should calculate the monthly rate correctly', function () {
  // ...
  const values = {
    amount: 1000,
    years: 2,
    rate: 12
  };
  expect(calculateMonthlyPayment(values)).toBe('47.07');
});


it("should return a result with 2 decimal places", function () {
  // ..
  const values = {
    amount: 123456,
    years: 5,
    rate: 20
  };
  expect(calculateMonthlyPayment(values)).toEqual('3270.83');
});

it("should return a result of 0.00 if there is no loan amount", function () {
  // ..
  const values = {
    amount: 0,
    years: 5,
    rate: 20
  };
  expect(calculateMonthlyPayment(values)).toEqual('0.00');
});

it("should recognize when there is no term length or interest rate", function () {
  // ..
  const values = {
    amount: 1000,
    years: 0,
    rate: 0
  };
  expect(calculateMonthlyPayment(values)).toEqual('You must enter a valid term and rate.');
});

it("should recognize when there is no term length", function () {
  // ..
  const values = {
    amount: 1000,
    years: 0,
    rate: 10
  };
  expect(calculateMonthlyPayment(values)).toEqual('You must enter a valid term and rate.');
});

it("should recognize when there is no interest rate", function () {
  // ..
  const values = {
    amount: 1000,
    years: 2,
    rate: 0
  };
  expect(calculateMonthlyPayment(values)).toEqual('You must enter a valid term and rate.');
});

/// etc
