export function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function snapToGrid(value: number, gridSize: number = 10): number {
    return Math.round(value / gridSize) * gridSize;
}