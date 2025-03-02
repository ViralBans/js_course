class NodeTS<T> {
    value: T;
    prev: NodeTS<T> | null;
    next: NodeTS<T> | null;

    constructor(value: T) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList<T> {
    private head: NodeTS<T> | null;
    private tail: NodeTS<T> | null;
    private length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    getLength(): number {
        return this.length;
    }

    find(value: T): number {
        let current = this.head;
        let index = 0;
        while (current !== null) {
            if (current.value === value) return index;
            current = current.next;
            index++;
        }
        return -1;
    }

    insertAt(value: T, index: number): boolean {
        if (index < 0 || index > this.length) return false;

        const newNode = new NodeTS(value);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else if (index === 0) {
            const head = this.head;
            if (head === null) return false;
            newNode.next = head;
            head.prev = newNode;
            this.head = newNode;
        } else if (index === this.length) {
            const tail = this.tail;
            if (tail === null) return false;
            newNode.prev = tail;
            tail.next = newNode;
            this.tail = newNode;
        } else {
            let current = this.head;
            for (let i = 0; i < index; i++) {
                if (current === null) return false;
                current = current.next;
            }
            if (current === null || current.prev === null) return false;
            newNode.prev = current.prev;
            newNode.next = current;
            current.prev.next = newNode;
            current.prev = newNode;
        }

        this.length++;
        return true;
    }

    removeAt(index: number): T | null {
        if (index < 0 || index >= this.length) return null;

        let removedNode: NodeTS<T>;
        if (this.length === 1) {
            if (this.head === null || this.tail === null) return null;
            removedNode = this.head;
            this.head = null;
            this.tail = null;
        } else if (index === 0) {
            const head = this.head;
            if (head === null) return null;
            removedNode = head;
            this.head = head.next;
            if (this.head !== null) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
        } else if (index === this.length - 1) {
            const tail = this.tail;
            if (tail === null) return null;
            removedNode = tail;
            this.tail = tail.prev;
            if (this.tail !== null) {
                this.tail.next = null;
            } else {
                this.head = null;
            }
        } else {
            let current = this.head;
            for (let i = 0; i < index; i++) {
                if (current === null) return null;
                current = current.next;
            }
            if (current === null || current.prev === null || current.next === null) return null;
            removedNode = current;
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }

        this.length--;
        return removedNode.value;
    }

    update(index: number, newValue: T): boolean {
        if (index < 0 || index >= this.length) return false;

        let current = this.head;
        for (let i = 0; i < index; i++) {
            if (current === null) return false;
            current = current.next;
        }
        if (current === null) return false;
        current.value = newValue;
        return true;
    }
}

const list = new DoublyLinkedList<string>();

list.insertAt('a', 0);
list.insertAt('b', 1);
list.insertAt('c', 1);

console.log(list.getLength()); // 3
console.log(list.find('c')); // 1

list.update(1, 'd');
console.log(list.removeAt(1)); // 'd'

console.log(list.getLength()); // 2