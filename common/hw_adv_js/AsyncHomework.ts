/**
 * 2) Написать функцию-генератор, выдающую числа фибоначчи.
 */
function* fibonacciGenerator(): Generator<number> {
    let previous = 0
    let current = 1

    yield previous

    while (true) {
        yield current
        const next = previous + current
        previous = current
        current = next
    }
}

// Тестирование функции
const fibSequence = fibonacciGenerator()

console.log("Функция-генератор, выдающая числа фибоначчи:")
console.log(fibSequence.next().value)
console.log(fibSequence.next().value)
console.log(fibSequence.next().value)
console.log(fibSequence.next().value)
console.log(fibSequence.next().value)
console.log(fibSequence.next().value)

/**
 * 1) Реализовать асинхронное выполнение трудной вычислительной задачи (без блокировки потока) Например, вычисление большого числа
 */
async function calculateHeavyTask() {
    let result = 0
    for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i)
        if (i % 1000 === 0) {
            await new Promise(resolve => setTimeout(resolve))
        }
    }
    return result
}

console.log(`Результат после выполнения асинхронной функции:`)
calculateHeavyTask().then(console.log)