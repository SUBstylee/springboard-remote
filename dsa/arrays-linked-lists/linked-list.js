/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    };

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    let popVal = this.tail.val;
    let currNode = this.head;
    if (this.length > 0) this.length--;
    if (this.length === 0) {
      this.tail = null, this.head = null;
    } else {
      while (currNode) {
        if (currNode.next === this.tail) {
          this.tail = currNode;
        }
        currNode = currNode.next;
      }
    }
    return popVal;
  }

  /** shift(): return & remove first item. */

  shift() {
    let shiftVal = this.head.val;
    this.head = this.head.next;
    if (this.length > 0) this.length--;
    if (this.length === 0) {
      this.tail = null, this.head = null;
    }
    if (this.length < 2) this.tail = this.head;
    return shiftVal;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx, obj = false) {
    let currNode = this.head;
    let count = 0;
    while (currNode !== null && count != idx) {
      count += 1;
      currNode = currNode.next;
    }
    return obj ? currNode : currNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    const changeNode = this.getAt(idx, true);
    changeNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let prevNode = this.getAt(idx - 1, true);
    let newNode = new Node(val);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx === 0) return this.shift(this.getAt(idx, true).val);
    if (idx === this.length - 1) return this.pop(this.getAt(idx, true).val);

    let prevNode = this.getAt(idx - 1, true);
    let removeNode = prevNode.next.val;
    newNode.next = prevNode.next;
    prevNode.next = removeNode.next;
    this.length--;
    return removeNode;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;
    let tally = 0;
    let curNode = this.head;

    while (curNode) {
      tally += curNode.val;
      curNode = curNode.next;
    }
    return tally / this.length;
  }
}

module.exports = LinkedList;
