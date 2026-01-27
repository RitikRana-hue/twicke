import React from 'react';
import { BaseWidget } from '../types/widgets';
import { getWidgetDefinition } from '../data/widgetDefinitions';

interface PropertiesPanelProps {
    selectedWidget: BaseWidget | null;
    onWidgetUpdate: (id: string, updates: Partial<BaseWidget>) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
    selectedWidget,
    onWidgetUpdate
}) => {
    if (!selectedWidget) {
        return (
            <div className="w-80 bg-white border-l border-gray-200 p-4">
                <div className="text-center text-gray-500 mt-8">
                    <div className="text-lg font-medium mb-2">No widget selected</div>
                    <div className="text-sm">Select a widget to edit its properties</div>
                </div>
            </div>
        );
    }

    const widgetDefinition = getWidgetDefinition(selectedWidget.type);
    if (!widgetDefinition) {
        return (
            <div className="w-80 bg-white border-l border-gray-200 p-4">
                <div className="text-center text-gray-500 mt-8">
                    <div className="text-lg font-medium mb-2">Unknown widget type</div>
                    <div className="text-sm">Widget definition not found</div>
                </div>
            </div>
        );
    }

    const updateProperty = (key: string, value: any) => {
        console.log('🔧 Updating property:', key, 'Value type:', typeof value, 'Value length:', value?.length);
        onWidgetUpdate(selectedWidget.id, {
            properties: {
                ...selectedWidget.properties,
                [key]: value
            }
        });
        console.log('🔧 Property update sent to parent component');
    };

    const updatePosition = (axis: 'x' | 'y', value: number) => {
        onWidgetUpdate(selectedWidget.id, {
            position: {
                ...selectedWidget.position,
                [axis]: value
            }
        });
    };

    const updateSize = (dimension: 'width' | 'height', value: number) => {
        onWidgetUpdate(selectedWidget.id, {
            size: {
                ...selectedWidget.size,
                [dimension]: value
            }
        });
    };

    const updateZIndex = (value: number) => {
        onWidgetUpdate(selectedWidget.id, { zIndex: value });
    };

    const handleImageUpload = (file: File) => {
        console.log('📤 Starting image upload for:', file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64String = e.target?.result as string;
            console.log('📤 Base64 generated, length:', base64String?.length);

            // Update the widget properties directly
            onWidgetUpdate(selectedWidget.id, {
                properties: {
                    ...selectedWidget.properties,
                    src: base64String,
                    alt: file.name
                } as any // Type assertion to handle dynamic property access
            });

            console.log('📤 Widget updated with new image');
        };
        reader.readAsDataURL(file);
    };

    const renderPropertyInput = (schema: any) => {
        const currentValue = (selectedWidget.properties as any)[schema.key] ?? schema.default;

        // Special handling for image src property
        if (schema.key === 'src' && selectedWidget.type === 'image') {
            return (
                <div className="space-y-2">
                    {/* URL Input */}
                    <input
                        type="text"
                        value={currentValue || ''}
                        onChange={(e) => updateProperty(schema.key, e.target.value)}
                        placeholder="https://example.com/image.jpg or paste base64"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />

                    {/* File Upload */}
                    <div className="flex items-center space-x-2">
                        <label className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                Upload Image
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        handleImageUpload(file);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>

                        {currentValue && (
                            <button
                                onClick={() => updateProperty('src', '')}
                                className="px-2 py-1 text-xs text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50 transition-colors"
                                title="Clear image"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Image Preview */}
                    {currentValue && (
                        <div className="mt-2">
                            <div className="text-xs text-gray-500 mb-1">Preview:</div>
                            <div className="w-full h-20 border border-gray-200 rounded overflow-hidden bg-gray-50 flex items-center justify-center">
                                <img
                                    src={currentValue}
                                    alt="Preview"
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        const parent = (e.target as HTMLImageElement).parentElement;
                                        if (parent) {
                                            parent.innerHTML = '<div class="text-xs text-gray-400">Invalid image</div>';
                                        }
                                    }}
                                />
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                {currentValue.startsWith('data:') ? 'Base64 image (embedded)' : 'External URL'}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        switch (schema.type) {
            case 'text':
            case 'textarea':
                return (
                    <input
                        type="text"
                        value={currentValue || ''}
                        onChange={(e) => updateProperty(schema.key, e.target.value)}
                        placeholder={schema.default}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                );

            case 'number':
            case 'range':
                return (
                    <input
                        type="number"
                        value={currentValue ?? schema.default}
                        onChange={(e) => updateProperty(schema.key, parseFloat(e.target.value) || schema.default)}
                        min={schema.min}
                        max={schema.max}
                        step={schema.step || 1}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                );

            case 'boolean':
                return (
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={currentValue ?? schema.default}
                            onChange={(e) => updateProperty(schema.key, e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Enabled</span>
                    </label>
                );

            case 'color':
                return (
                    <div className="flex space-x-2">
                        <input
                            type="color"
                            value={currentValue || schema.default}
                            onChange={(e) => updateProperty(schema.key, e.target.value)}
                            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                            type="text"
                            value={currentValue || schema.default}
                            onChange={(e) => updateProperty(schema.key, e.target.value)}
                            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                );

            case 'select':
                return (
                    <select
                        value={currentValue ?? schema.default}
                        onChange={(e) => updateProperty(schema.key, e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    >
                        {schema.options?.map((option: any) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            default:
                return (
                    <input
                        type="text"
                        value={currentValue || ''}
                        onChange={(e) => updateProperty(schema.key, e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                );
        }
    };

    // Group properties by their group
    const groupedProperties = widgetDefinition.propertySchema.reduce((groups, schema) => {
        const group = schema.group || 'General';
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(schema);
        return groups;
    }, {} as Record<string, any[]>);

    return (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
                <div className="text-sm text-gray-500 capitalize">{widgetDefinition.name}</div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                    {/* Position & Size */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Position & Size</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">X</label>
                                <input
                                    type="number"
                                    value={selectedWidget.position.x}
                                    onChange={(e) => updatePosition('x', parseInt(e.target.value) || 0)}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Y</label>
                                <input
                                    type="number"
                                    value={selectedWidget.position.y}
                                    onChange={(e) => updatePosition('y', parseInt(e.target.value) || 0)}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Width</label>
                                <input
                                    type="number"
                                    value={selectedWidget.size.width}
                                    onChange={(e) => updateSize('width', parseInt(e.target.value) || 1)}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Height</label>
                                <input
                                    type="number"
                                    value={selectedWidget.size.height}
                                    onChange={(e) => updateSize('height', parseInt(e.target.value) || 1)}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Layer Order */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Layer Order</h3>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Z-Index</label>
                                <input
                                    type="number"
                                    value={selectedWidget.zIndex || 0}
                                    onChange={(e) => updateZIndex(parseInt(e.target.value) || 0)}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                            <div className="text-xs text-gray-500 mt-4">
                                Higher values appear in front
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Property Groups */}
                    {Object.entries(groupedProperties).map(([groupName, properties]) => (
                        <div key={groupName}>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">{groupName}</h3>
                            <div className="space-y-3">
                                {properties.map((schema) => (
                                    <div key={schema.key}>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            {schema.label}
                                        </label>
                                        {renderPropertyInput(schema)}
                                        {schema.description && (
                                            <p className="text-xs text-gray-500 mt-1">{schema.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};