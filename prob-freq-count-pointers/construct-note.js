// add whatever parameters you deem necessary
function constructNote() {
    const { msg, letters } = arguments;
    if (!letters) return false;
    for (let i = 0; i < msg.length; i++) {
        if (!letters.contains(msg.charAt(i))) {
            return false;
        }
    }
    return true;
}

module.exports = { constructNote };