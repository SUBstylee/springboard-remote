describe('Payments test (with setup and tear-down)', function () {
    beforeEach(function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 10;
    });

    it('should add new payment info to allServers on submitPaymentInfo()', function () {
        submitPaymentInfo()

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('10');
        expect(allPayments['payment1'].tipPercent).toEqual(10);
    });

    it('should do nothing if empty billAmtInput', function () {
        billAmtInput.value = '';
        tipAmtInput.value = 10;
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should do nothing if empty tipAmtInput', function () {
        billAmtInput.value = 100;
        tipAmtInput.value = '';
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should do nothing if empty inputs', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should add td to #paymentTable', function () {
        submitPaymentInfo();
        createCurPayment();
        let checkTd = document.querySelectorAll('#paymentTable tbody tr td');
        expect(checkTd.length).toEqual(3);
        expect(checkTd[0].innerHTML).toEqual('$100');
        expect(checkTd[1].innerHTML).toEqual('$10');
        expect(checkTd[2].innerHTML).toEqual('10%');
    });

    it('should create new payment with createCurPayment()', function () {
        let newPayment = {
            billAmt: '100',
            tipAmt: '10',
            tipPercent: 10
        };
        expect(createCurPayment()).toEqual(newPayment);
    });

    it('should not create new payment with empty bill amount input with createCurPayment()', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '10';
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should not create new payment with empty inputs with createCurPayment()', function () {
        billAmtInput.value = '100';
        tipAmtInput.value = '';
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should not create new payment with empty tip amount input with createCurPayment()', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        expect(createCurPayment()).toEqual(undefined);
    });

    afterEach(function () {
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        allPayments = {};
        paymentId = 0;
        billAmtInput.value = '';
        tipAmtInput.value = '';
    });
});
