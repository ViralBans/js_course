class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Возвращает длину списка
    getLength() {
        return this.length;
    }

    // Поиск индекса первого вхождения значения
    find(value) {
        let current = this.head;
        let index = 0;
        while (current !== null) {
            if (current.value === value) return index;
            current = current.next;
            index++;
        }
        return -1;
    }

    // Вставка элемента на указанную позицию
    insertAt(value, index) {
        if (index < 0 || index > this.length) return false;

        const newNode = new Node(value);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else if (index === 0) {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        } else if (index === this.length) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            let current = this.head;
            for (let i = 0; i < index; i++) current = current.next;
            newNode.prev = current.prev;
            newNode.next = current;
            current.prev.next = newNode;
            current.prev = newNode;
        }

        this.length++;
        return true;
    }

    // Удаление элемента по индексу
    removeAt(index) {
        if (index < 0 || index >= this.length) return null;

        let removedNode;
        if (this.length === 1) {
            removedNode = this.head;
            this.head = null;
            this.tail = null;
        } else if (index === 0) {
            removedNode = this.head;
            this.head = this.head.next;
            this.head.prev = null;
        } else if (index === this.length - 1) {
            removedNode = this.tail;
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            removedNode = this.head;
            for (let i = 0; i < index; i++) removedNode = removedNode.next;
            removedNode.prev.next = removedNode.next;
            removedNode.next.prev = removedNode.prev;
        }

        this.length--;
        return removedNode.value;
    }

    // Обновление значения элемента по индексу
    update(index, newValue) {
        if (index < 0 || index >= this.length) return false;

        let current = this.head;
        for (let i = 0; i < index; i++) current = current.next;
        current.value = newValue;
        return true;
    }
}

const list = new DoublyLinkedList();

list.insertAt('a', 0); // Вставка в начало
list.insertAt('b', 1); // Вставка в конец
list.insertAt('c', 1); // Вставка в середину

console.log(list.getLength()); // 3
console.log(list.find('c')); // 1

list.update(1, 'd'); // Изменение значения
console.log(list.removeAt(1)); // 'd' (удаление элемента)

console.log(list.getLength()); // 2