import { Screen, HistoryState } from '../types';

export class HistoryManager {
    private history: HistoryState[] = [];
    private currentIndex = -1;
    private maxHistorySize = 50;

    addState(screens: Screen[], currentScreenId: string, action: string) {
        // Remove any future states if we're not at the end
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }

        // Add new state
        const newState: HistoryState = {
            screens: JSON.parse(JSON.stringify(screens)), // Deep clone
            currentScreenId,
            timestamp: Date.now(),
            action
        };

        this.history.push(newState);
        this.currentIndex++;

        // Limit history size
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
            this.currentIndex--;
        }
    }

    canUndo(): boolean {
        return this.currentIndex > 0;
    }

    canRedo(): boolean {
        return this.currentIndex < this.history.length - 1;
    }

    undo(): HistoryState | null {
        if (!this.canUndo()) return null;

        this.currentIndex--;
        return this.history[this.currentIndex];
    }

    redo(): HistoryState | null {
        if (!this.canRedo()) return null;

        this.currentIndex++;
        return this.history[this.currentIndex];
    }

    getCurrentAction(): string {
        if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
            return this.history[this.currentIndex].action;
        }
        return '';
    }

    clear() {
        this.history = [];
        this.currentIndex = -1;
    }
}