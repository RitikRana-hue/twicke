// Re-export from widgets for backward compatibility
export * from './widgets';

// Legacy exports for existing components
export type { BaseWidget as Widget } from './widgets';
export type { BaseWidgetProperties as WidgetProperties } from './widgets';

// Layer 3: Events & Actions
export interface WidgetEvent {
    id: string;
    trigger: EventTrigger;
    actions: EventAction[];
}

export type EventTrigger = 'onClick' | 'onToggle' | 'onValueChange';

export interface EventAction {
    type: ActionType;
    targetWidgetId?: string;
    targetScreen?: string;
    value?: any;
    property?: string;
}

export type ActionType = 'navigateToScreen' | 'setValue' | 'resetValue' | 'showWidget' | 'hideWidget' | 'setProperty';

// Layer 3: Conditions
export interface WidgetCondition {
    id: string;
    condition: Condition;
    actions: EventAction[];
}

export interface Condition {
    type: 'value' | 'comparison' | 'state';
    operator: '>' | '<' | '==' | '!=' | '>=' | '<=';
    value: any;
    property?: string;
}

// Layer 3: Data Binding
export interface DataBinding {
    type: 'static' | 'variable' | 'virtualPin';
    source?: string;
    virtualPin?: string;
    units?: string;
    format?: string;
}

// Layer 4: Screen Management
export interface Screen {
    id: string;
    name: string;
    widgets: BaseWidget[];
    isStartup?: boolean;
    backgroundColor?: string;
}

export interface DeviceConfig {
    name: string;
    width: number;
    height: number;
    pixelDensity: number;
    dpi?: number; // Dots per inch for unit conversion
}

export type SizeUnit = 'px' | 'mm' | 'inch';

export interface ScreenDimensions {
    width: number;
    height: number;
    unit: SizeUnit;
}

export interface Project {
    id: string;
    name: string;
    device: DeviceConfig;
    screens: Screen[];
    currentScreenId: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

// Layer 4: History for Undo/Redo
export interface HistoryState {
    screens: Screen[];
    currentScreenId: string;
    timestamp: number;
    action: string;
}

// Layer 4: Templates
export interface Template {
    id: string;
    name: string;
    description: string;
    category: 'blank' | 'dashboard' | 'control' | 'industrial' | 'ev' | 'solar';
    screens: Omit<Screen, 'id'>[];
    preview?: string;
}