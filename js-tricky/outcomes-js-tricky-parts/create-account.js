function createAccount(pin, amount = 0) {
    const PINERROR = 'Invalid PIN.';
    return {
        checkBalance(userPin) {
            if (userPin !== pin) return PINERROR;
            return `$${amount}`;
        },
        deposit(userPin, depositAmount) {
            if (userPin !== pin) return PINERROR;
            amount += depositAmount;
            return `Succesfully deposited $${depositAmount}. Current balance: $${amount}.`;
        },
        withdraw(userPin, withdrawalAmount) {
            if (userPin !== pin) return PINERROR;
            if (withdrawalAmount > amount) return 'Withdrawal amount exceeds account balance. Transaction cancelled.';
            amount -= withdrawalAmount;
            return `Succesfully withdrew $${withdrawalAmount}. Current balance: $${amount}.`;
        },
        changePin(userPin, newPin) {
            if (userPin !== pin) return PINERROR;
            pin = newPin;
            return 'PIN successfully changed!'
        },
    };

};

module.exports = { createAccount };
