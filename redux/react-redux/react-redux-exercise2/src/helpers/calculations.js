

export const calculateTotalCount = (cart) => {
    let total = 0;
    for (let id in cart) {
        total += cart[id];
    };
    return total;
};