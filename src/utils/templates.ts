import { Template, WidgetCategory } from '../types';
import { generateId } from './helpers';

export const PROJECT_TEMPLATES: Template[] = [
    {
        id: 'blank',
        name: 'Blank Project',
        description: 'Start with an empty canvas',
        category: 'blank',
        screens: [
            {
                name: 'Main Screen',
                widgets: [],
                isStartup: true,
                backgroundColor: '#000000'
            }
        ]
    },
    {
        id: 'dashboard',
        name: 'IoT Dashboard',
        description: 'Temperature, humidity, and status monitoring',
        category: 'dashboard',
        screens: [
            {
                name: 'Dashboard',
                widgets: [
                    {
                        id: generateId(),
                        type: 'label',
                        position: { x: 20, y: 20 },
                        size: { width: 200, height: 30 },
                        category: 'text-display' as WidgetCategory,
                        properties: {
                            text: 'IoT Dashboard',
                            fontSize: 18,
                            color: '#FFFFFF',
                            backgroundColor: 'transparent'
                        },
                        dataBinding: {
                            type: 'static'
                        }
                    },
                    {
                        id: generateId(),
                        type: 'gauge',
                        position: { x: 50, y: 80 },
                        size: { width: 120, height: 120 },
                        category: 'data-visualization' as WidgetCategory,
                        properties: {
                            value: 23,
                            min: 0,
                            max: 50,
                            color: '#0EA5E9',
                            units: '°C'
                        },
                        dataBinding: {
                            type: 'virtualPin',
                            virtualPin: 'V1',
                            units: '°C'
                        }
                    },
                    {
                        id: generateId(),
                        type: 'gauge',
                        position: { x: 250, y: 80 },
                        size: { width: 120, height: 120 },
                        category: 'data-visualization' as WidgetCategory,
                        properties: {
                            value: 65,
                            min: 0,
                            max: 100,
                            color: '#10B981',
                            units: '%'
                        },
                        dataBinding: {
                            type: 'virtualPin',
                            virtualPin: 'V2',
                            units: '%'
                        }
                    },
                    {
                        id: generateId(),
                        type: 'label',
                        position: { x: 80, y: 210 },
                        size: { width: 60, height: 20 },
                        category: 'text-display' as WidgetCategory,
                        properties: {
                            text: 'Temperature',
                            fontSize: 12,
                            color: '#CCCCCC'
                        }
                    },
                    {
                        id: generateId(),
                        type: 'label',
                        position: { x: 280, y: 210 },
                        size: { width: 60, height: 20 },
                        category: 'text-display' as WidgetCategory,
                        properties: {
                            text: 'Humidity',
                            fontSize: 12,
                            color: '#CCCCCC'
                        }
                    }
                ] as any[],
                isStartup: true,
                backgroundColor: '#1F2937'
            }
        ]
    },
    {
        id: 'control-panel',
        name: 'Control Panel',
        description: 'Switches, buttons, and controls',
        category: 'control',
        screens: [
            {
                name: 'Controls',
                widgets: [
                    {
                        id: generateId(),
                        type: 'label',
                        position: { x: 20, y: 20 },
                        size: { width: 150, height: 30 },
                        category: 'text-display' as WidgetCategory,
                        properties: {
                            text: 'Device Control',
                            fontSize: 16,
                            color: '#FFFFFF'
                        }
                    },
                    {
                        id: generateId(),
                        type: 'switch',
                        position: { x: 50, y: 80 },
                        size: { width: 80, height: 40 },
                        category: 'input-control' as WidgetCategory,
                        properties: {
                            value: 0,
                            color: '#0EA5E9'
                        },
                        events: [
                            {
                                id: generateId(),
                                trigger: 'onToggle',
                                actions: [
                                    {
                                        type: 'setValue',
                                        targetWidgetId: 'status-label',
                                        value: 'ON'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: generateId(),
                        type: 'button',
                        position: { x: 200, y: 80 },
                        size: { width: 100, height: 40 },
                        category: 'input-control' as WidgetCategory,
                        properties: {
                            text: 'Reset',
                            color: '#FFFFFF',
                            backgroundColor: '#EF4444',
                            borderRadius: 6
                        },
                        events: [
                            {
                                id: generateId(),
                                trigger: 'onClick',
                                actions: [
                                    {
                                        type: 'resetValue',
                                        targetWidgetId: 'main-switch'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: generateId(),
                        type: 'label',
                        position: { x: 50, y: 140 },
                        size: { width: 100, height: 25 },
                        category: 'text-display' as WidgetCategory,
                        properties: {
                            text: 'Main Power',
                            fontSize: 12,
                            color: '#CCCCCC'
                        }
                    }
                ] as any[],
                isStartup: true,
                backgroundColor: '#111827'
            }
        ]
    },
    {
        id: 'ev-dashboard',
        name: 'EV Dashboard',
        description: 'Electric vehicle monitoring interface',
        category: 'ev',
        screens: [
            {
                name: 'EV Status',
                widgets: [
                    {
                        id: generateId(),
                        type: 'gauge',
                        position: { x: 50, y: 50 },
                        size: { width: 150, height: 150 },
                        category: 'data-visualization' as WidgetCategory,
                        properties: {
                            value: 85,
                            min: 0,
                            max: 100,
                            color: '#10B981',
                            units: '%'
                        },
                        dataBinding: {
                            type: 'virtualPin',
                            virtualPin: 'V0',
                            units: '%'
                        }
                    },
                    {
                        id: generateId(),
                        type: 'label',
                        position: { x: 100, y: 210 },
                        size: { width: 50, height: 20 },
                        category: 'text-display' as WidgetCategory,
                        properties: {
                            text: 'Battery',
                            fontSize: 12,
                            color: '#FFFFFF'
                        }
                    },
                    {
                        id: generateId(),
                        type: 'label',
                        position: { x: 250, y: 80 },
                        size: { width: 120, height: 30 },
                        category: 'text-display' as WidgetCategory,
                        properties: {
                            text: '245 km',
                            fontSize: 20,
                            color: '#0EA5E9'
                        },
                        dataBinding: {
                            type: 'virtualPin',
                            virtualPin: 'V1',
                            units: 'km'
                        }
                    },
                    {
                        id: generateId(),
                        type: 'label',
                        position: { x: 250, y: 110 },
                        size: { width: 80, height: 20 },
                        category: 'text-display' as WidgetCategory,
                        properties: {
                            text: 'Range',
                            fontSize: 12,
                            color: '#CCCCCC'
                        }
                    }
                ] as any[],
                isStartup: true,
                backgroundColor: '#0F172A'
            }
        ]
    }
];

export function getTemplateById(id: string): Template | undefined {
    return PROJECT_TEMPLATES.find(template => template.id === id);
}

export function getTemplatesByCategory(category: Template['category']): Template[] {
    return PROJECT_TEMPLATES.filter(template => template.category === category);
}