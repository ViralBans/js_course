interface QueueElement {
    val: string;
    priority: number;
}

class PriorityQueue {
    values: QueueElement[];

    constructor() {
        this.values = [];
    }

    enqueue(val: string, priority: number): void {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue(): QueueElement | undefined {
        return this.values.shift();
    }

    sort(): void {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

class WeightedGraph {
    private graph: Record<string, Record<string, number>>;

    constructor() {
        this.graph = {};
    }

    addNode(node: string): void {
        if (!this.graph[node]) {
            this.graph[node] = {};
        }
    }

    removeNode(node: string): void {
        if (!this.graph[node]) {
            console.error('Узел не существует!');
            return;
        }

        const neighbors = { ...this.graph[node] };
        for (const neighbor in neighbors) {
            this.removeDistance(node, neighbor);
        }
        delete this.graph[node];
    }

    addDistance(start: string, end: string, distance: number): void {
        if (!this.graph[start] || !this.graph[end]) {
            console.error('Отсутствует одна из вершин!');
            return;
        }
        this.graph[start][end] = distance;
        this.graph[end][start] = distance;
    }

    removeDistance(start: string, end: string): void {
        if (!this.graph[start] || !this.graph[end]) {
            console.error('Отсутствует одна из вершин!');
            return;
        }
        delete this.graph[start][end];
        delete this.graph[end][start];
    }

    updateDistance(start: string, end: string, newDistance: number): void {
        if (!this.graph[start] || !this.graph[end]) {
            console.error('Отсутствует одна из вершин!');
            return;
        }
        this.graph[start][end] = newDistance;
        this.graph[end][start] = newDistance;
    }

    showGraph(): void {
        console.log(this.graph);
    }

    sizeGraph(): number {
        return Object.keys(this.graph).length;
    }

    shortestPath(start: string, end: string): string {
        const distances: Record<string, number> = {};
        const previous: Record<string, string | null> = {};
        const nodes = new PriorityQueue();
        const path: string[] = [];

        // Инициализация расстояний и очереди
        for (const node in this.graph) {
            distances[node] = node === start ? 0 : Infinity;
            previous[node] = null;
            nodes.enqueue(node, distances[node]);
        }

        // Основной цикл алгоритма
        while (nodes.values.length > 0) {
            const current = nodes.dequeue();
            if (!current) break;

            const currentVertex = current.val;
            if (currentVertex === end) break;

            const neighbors = this.graph[currentVertex];
            if (!neighbors || distances[currentVertex] === Infinity) continue;

            for (const neighbor in neighbors) {
                const candidate = distances[currentVertex] + neighbors[neighbor];
                if (candidate < distances[neighbor]) {
                    distances[neighbor] = candidate;
                    previous[neighbor] = currentVertex;
                    nodes.enqueue(neighbor, candidate);
                }
            }
        }

        // Построение пути
        let current: string | null = end;
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }

        if (path.length < 2 || path[0] !== start) {
            return `Путь между ${start} и ${end} не существует`;
        }

        return `Кратчайший путь: [${path.join(' -> ')}], расстояние: ${distances[end]}`;
    }
}

// Тестирование
const testGraph = new WeightedGraph();

testGraph.addNode('A');
testGraph.addNode('B');
testGraph.addNode('C');
testGraph.addNode('D');

testGraph.addDistance('A', 'B', 25);
testGraph.addDistance('A', 'C', 5);
testGraph.addDistance('B', 'C', 13);
testGraph.addDistance('C', 'D', 11);

console.log('Исходный граф:');
testGraph.showGraph();

testGraph.updateDistance('D', 'C', 60);
console.log('После изменения расстояния D-C:');
testGraph.showGraph();

testGraph.removeDistance('B', 'C');
console.log('После удаления связи B-C:');
testGraph.showGraph();

console.log('После удаления узла A:');
testGraph.removeNode('A');
testGraph.showGraph();

testGraph.addNode('E');
testGraph.addDistance('B', 'D', 7);
testGraph.addDistance('B', 'E', 22);
testGraph.addDistance('E', 'D', 9);
console.log('Финальный граф:');
testGraph.showGraph();

console.log(testGraph.shortestPath('B', 'E'));