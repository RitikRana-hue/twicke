import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import {
    Type, Square, ToggleLeft, Gauge, Image, Box, Activity, CheckSquare,
    Circle, TrendingUp, BarChart3, Minus, ChevronDown, ChevronRight
} from 'lucide-react';
import { WidgetType, WidgetCategory } from '../types/widgets';
import { ALL_WIDGETS, getWidgetsByCategory, WidgetDefinition } from '../data/widgetDefinitions';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
    'Type': Type,
    'Square': Square,
    'ToggleLeft': ToggleLeft,
    'Gauge': Gauge,
    'Image': Image,
    'Box': Box,
    'Activity': Activity,
    'CheckSquare': CheckSquare,
    'Circle': Circle,
    'TrendingUp': TrendingUp,
    'BarChart3': BarChart3,
    'Minus': Minus
};

const CATEGORY_LABELS: Record<WidgetCategory, string> = {
    'text-display': 'Text & Display',
    'input-control': 'Input & Control',
    'data-visualization': 'Data Visualization',
    'media': 'Media',
    'containers': 'Containers',
    'navigation': 'Navigation',
    'status-feedback': 'Status & Feedback',
    'iot-system': 'IoT System',
    'logic-invisible': 'Logic Elements'
};

export const WidgetLibrary: React.FC = () => {
    const [expandedCategories, setExpandedCategories] = useState<Set<WidgetCategory>>(
        new Set(['text-display', 'input-control', 'data-visualization'])
    );

    const toggleCategory = (category: WidgetCategory) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(category)) {
            newExpanded.delete(category);
        } else {
            newExpanded.add(category);
        }
        setExpandedCategories(newExpanded);
    };

    const categories = Object.keys(CATEGORY_LABELS) as WidgetCategory[];
    const availableCategories = categories.filter(category =>
        getWidgetsByCategory(category).length > 0
    );

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-900">Widget Library</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {availableCategories.map((category) => {
                    const widgets = getWidgetsByCategory(category);
                    const isExpanded = expandedCategories.has(category);

                    return (
                        <div key={category} className="mb-4">
                            <button
                                onClick={() => toggleCategory(category)}
                                className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 mb-2"
                            >
                                <span>{CATEGORY_LABELS[category]}</span>
                                {isExpanded ? (
                                    <ChevronDown size={16} />
                                ) : (
                                    <ChevronRight size={16} />
                                )}
                            </button>

                            {isExpanded && (
                                <div className="space-y-2 ml-2">
                                    {widgets.map((widget) => (
                                        <WidgetItem
                                            key={widget.type}
                                            definition={widget}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface WidgetItemProps {
    definition: WidgetDefinition;
}

const WidgetItem: React.FC<WidgetItemProps> = ({ definition }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'widget',
        item: { type: definition.type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const IconComponent = ICON_MAP[definition.icon] || Box;
    const isPhase2 = definition.phase === 2;

    return (
        <div
            ref={drag}
            className={`
                flex items-center space-x-3 p-2 rounded-lg border border-gray-200 
                cursor-grab hover:bg-gray-50 hover:border-gray-300 transition-colors
                ${isDragging ? 'opacity-50' : ''}
                ${isPhase2 ? 'border-primary-200 bg-primary-50' : ''}
            `}
        >
            <div className={`
                flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center
                ${isPhase2 ? 'bg-primary-200' : 'bg-primary-100'}
            `}>
                <IconComponent size={14} className={`
                    ${isPhase2 ? 'text-primary-700' : 'text-primary-600'}
                `} />
            </div>

            <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 flex items-center">
                    {definition.name}
                    {isPhase2 && (
                        <span className="ml-1 px-1 py-0.5 text-xs bg-primary-100 text-primary-700 rounded">
                            Pro
                        </span>
                    )}
                </div>
                <div className="text-xs text-gray-500 truncate">{definition.description}</div>
            </div>
        </div>
    );
};