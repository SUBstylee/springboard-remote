describe('Helpers test (with setup and tear-down', function () {
    beforeEach(function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 10;
        submitPaymentInfo();
    });

    it('should add all bill amounts with sumPaymentTotal()', function () {
        expect(sumPaymentTotal('billAmt')).toEqual(100);
        //one more payment
        billAmtInput.value = 50;
        tipAmtInput.value = 5;
        submitPaymentInfo();
        expect(sumPaymentTotal('billAmt')).toEqual(150);
    });

    it('should add all tip amounts with sumPaymentTotal()', function () {
        expect(sumPaymentTotal('tipAmt')).toEqual(10);
        //one more payment
        billAmtInput.value = 50;
        tipAmtInput.value = 5;
        submitPaymentInfo();
        expect(sumPaymentTotal('tipAmt')).toEqual(15);
    });

    it('should find out total tip percentage with sumPaymentTotal()', function () {
        expect(sumPaymentTotal('tipPercent')).toEqual(10);
        //one more payment
        billAmtInput.value = 50;
        tipAmtInput.value = 5;
        submitPaymentInfo();
        expect(sumPaymentTotal('tipPercent')).toEqual(20);
    });

    it('should get tip percent on each payment with calculateTipPercent()', function () {
        expect(calculateTipPercent(100, 50)).toEqual(50);
        expect(calculateTipPercent(200, 10)).toEqual(5);
    });

    it('should append to tr with appendTd(tr, value)', function () {
        let newTr = document.createElement('tr');
        appendTd(newTr, 'new table row');
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerText).toEqual('new table row');
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
        serverTbody.innerHTML = '';
    });
});