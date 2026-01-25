import React, { useState, useCallback } from 'react';
import { Widget, DeviceConfig } from '../types';
import { WidgetLibrary } from './WidgetLibrary';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Header } from './Header';
import { generateId } from '../utils/helpers';

const DEFAULT_DEVICE: DeviceConfig = {
    name: 'ESP32-S3 Display',
    width: 480,
    height: 320,
    pixelDensity: 1
};

export const GuiBuilder: React.FC = () => {
    const [widgets, setWidgets] = useState<Widget[]>([]);
    const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
    const [device] = useState<DeviceConfig>(DEFAULT_DEVICE);

    const addWidget = useCallback((type: Widget['type'], position: { x: number; y: number }) => {
        const newWidget: Widget = {
            id: generateId(),
            type,
            position,
            size: getDefaultSize(type),
            properties: getDefaultProperties(type)
        };

        setWidgets(prev => [...prev, newWidget]);
        setSelectedWidget(newWidget);
    }, []);

    const updateWidget = useCallback((id: string, updates: Partial<Widget>) => {
        setWidgets(prev => prev.map(widget =>
            widget.id === id ? { ...widget, ...updates } : widget
        ));

        if (selectedWidget?.id === id) {
            setSelectedWidget(prev => prev ? { ...prev, ...updates } : null);
        }
    }, [selectedWidget]);

    const deleteWidget = useCallback((id: string) => {
        setWidgets(prev => prev.filter(widget => widget.id !== id));
        if (selectedWidget?.id === id) {
            setSelectedWidget(null);
        }
    }, [selectedWidget]);

    return (
        <div className="h-full flex flex-col">
            <Header
                widgets={widgets}
                device={device}
            />

            <div className="flex-1 flex">
                <WidgetLibrary />

                <div className="flex-1 flex flex-col">
                    <Canvas
                        widgets={widgets}
                        device={device}
                        selectedWidget={selectedWidget}
                        onWidgetSelect={setSelectedWidget}
                        onWidgetAdd={addWidget}
                        onWidgetUpdate={updateWidget}
                        onWidgetDelete={deleteWidget}
                    />
                </div>

                <PropertiesPanel
                    selectedWidget={selectedWidget}
                    onWidgetUpdate={updateWidget}
                />
            </div>
        </div>
    );
};

function getDefaultSize(type: Widget['type']): { width: number; height: number } {
    switch (type) {
        case 'label':
            return { width: 100, height: 30 };
        case 'button':
            return { width: 80, height: 40 };
        case 'switch':
            return { width: 60, height: 30 };
        case 'gauge':
            return { width: 100, height: 100 };
        case 'image':
            return { width: 80, height: 80 };
        case 'container':
            return { width: 120, height: 80 };
        default:
            return { width: 100, height: 30 };
    }
}

function getDefaultProperties(type: Widget['type']): Widget['properties'] {
    switch (type) {
        case 'label':
            return {
                text: 'Label',
                fontSize: 14,
                color: '#374151',
                backgroundColor: 'transparent'
            };
        case 'button':
            return {
                text: 'Button',
                fontSize: 14,
                color: '#ffffff',
                backgroundColor: '#0ea5e9',
                borderRadius: 6
            };
        case 'switch':
            return {
                value: 0,
                color: '#0ea5e9',
                backgroundColor: '#e5e7eb'
            };
        case 'gauge':
            return {
                value: 50,
                min: 0,
                max: 100,
                color: '#0ea5e9'
            };
        case 'image':
            return {
                imageUrl: '',
                backgroundColor: '#f3f4f6'
            };
        case 'container':
            return {
                backgroundColor: '#ffffff',
                borderRadius: 8
            };
        default:
            return {};
    }
}