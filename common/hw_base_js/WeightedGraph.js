class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

class WeightedGraph {
    constructor() {
        this.graph = {};
    }

    // Формирование узлов
    addNode(n) {
        if (!this.graph[n]) {
            this.graph[n] = {};
        }
    }

    // Удаление узла
    removeNode(n) {
        if (!this.graph[n]) {
            alert('Узел не существует!')
        }
        // Цикл для поиска и удаления связанных с узлом путей
        for (let searchPath in this.graph[n]) {
            this.removeDistance(n, searchPath)
        }
        delete this.graph[n]
    }

    // Добавление расстояния между узлами
    addDistance(start, end, distance) {
        if (!this.graph[start] || !this.graph[end]) {
            alert('Отсутствует одна из вершин!')
        }
        this.graph[start][end] = distance
        this.graph[end][start] = distance
    }

    // Удаление расстояния между узлами
    removeDistance(start, end) {
        if (!this.graph[start] || !this.graph[end]) {
            alert('Отсутствует одна из вершин!')
        }
        delete this.graph[start][end]
        delete this.graph[end][start]
    }

    // Изменение расстояния между узлами
    updateDistance(start, end, newDistance) {
        if (!this.graph[start] || !this.graph[end]) {
            alert('Отсутствует одна из вершин!')
        }
        this.graph[start][end] = newDistance
        this.graph[end][start] = newDistance
    }

    // Отображение графа в консоли
    showGraph() {
        console.log(this.graph)
    }

    // Определение количества элементов
    sizeGraph() {
        return Object.keys(this.graph).length
    }

    // Нахождение кратчайшего пути между двумя узлами
    shortestPath(start, end) {
        const distances = {}
        const previous = {}
        const nodes = new PriorityQueue()
        const path = [] // Для хранения итогового пути
        let smallest

        // Инициализация расстояний и очереди
        for (let node in this.graph) {
            if (node === start) {
                distances[node] = 0
                nodes.enqueue(node, 0)
            } else {
                distances[node] = Infinity
                nodes.enqueue(node, Infinity)
            }
            previous[node] = null
        }

        // Основной цикл алгоритма
        while (nodes.values.length) {
            smallest = nodes.dequeue().val

            if (smallest === end) {
                // Построение пути
                while (previous[smallest]) {
                    path.push(smallest)
                    smallest = previous[smallest]
                }
                break;
            }

            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.graph[smallest]) {
                    // Вычисление нового расстояния
                    let candidate = distances[smallest] + this.graph[smallest][neighbor];
                    if (candidate < distances[neighbor]) {
                        // Обновление расстояния
                        distances[neighbor] = candidate
                        // Обновление предыдущей вершины
                        previous[neighbor] = smallest
                        // Добавление в очередь с новым приоритетом
                        nodes.enqueue(neighbor, candidate)
                    }
                }
            }
        }

        // Возвращаем путь и расстояние
        return `Кратчайший путь проходит по пути [${path.concat(smallest).reverse()}] и составляет расстояние ${distances[end]}`
    }
}

// Тестирование логики
const testGraph = new WeightedGraph()

testGraph.addNode('A')
testGraph.addNode('B')
testGraph.addNode('C')
testGraph.addNode('D')

testGraph.addDistance('A', 'B', 25)
testGraph.addDistance('A', 'C', 5)
testGraph.addDistance('B', 'C', 13)
testGraph.addDistance('C', 'D', 11)

console.log('Исходный граф:')
testGraph.showGraph()

testGraph.updateDistance('D', 'C', 60)

console.log('Изменение расстояния между D и C:')
testGraph.showGraph()

testGraph.removeDistance('B', 'C')

console.log('Удаление связи между B и C:')
testGraph.showGraph()

console.log('Удаление узла A:')
testGraph.removeNode('A')
testGraph.showGraph()

console.log('Добавление нового узла E. Связывание его с B и D:')
testGraph.addNode('E')
testGraph.addDistance('B', 'D', 7)
testGraph.addDistance('B', 'E', 22)
testGraph.addDistance('E', 'D', 9)
testGraph.showGraph()

console.log(`Узлов в финальном графе - ${testGraph.sizeGraph()}. ${testGraph.shortestPath('B', 'E')}`)
