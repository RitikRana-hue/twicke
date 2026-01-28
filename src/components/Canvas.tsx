import React, { useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { BaseWidget, DeviceConfig } from '../types';
import { EnhancedWidgetRenderer } from './EnhancedWidgetRenderer';
import { UnitConverter } from '../utils/unitConverter';

interface CanvasProps {
    widgets: BaseWidget[];
    device: DeviceConfig;
    selectedWidget: BaseWidget | null;
    onWidgetSelect: (widget: BaseWidget | null) => void;
    onWidgetAdd: (type: BaseWidget['type'], position: { x: number; y: number }) => void;
    onWidgetUpdate: (id: string, updates: Partial<BaseWidget>) => void;
    onWidgetDelete: (id: string) => void;
    onLayerChange: (id: string, action: 'front' | 'back' | 'forward' | 'backward') => void;
    backgroundColor?: string;
    showDimensions?: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({
    widgets,
    device,
    selectedWidget,
    onWidgetSelect,
    onWidgetAdd,
    onWidgetUpdate,
    onWidgetDelete,
    onLayerChange,
    backgroundColor = '#000000',
    showDimensions = true
}) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const converter = new UnitConverter(device.dpi || 96);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'widget',
        drop: (item: { type: BaseWidget['type'] }, monitor) => {
            if (!canvasRef.current) return;

            const canvasRect = canvasRef.current.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();

            if (clientOffset) {
                const x = Math.max(0, Math.min(clientOffset.x - canvasRect.left, device.width - 50));
                const y = Math.max(0, Math.min(clientOffset.y - canvasRect.top, device.height - 30));

                onWidgetAdd(item.type, { x, y });
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const handleCanvasClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onWidgetSelect(null);
        }
    }, [onWidgetSelect]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Delete' && selectedWidget) {
            onWidgetDelete(selectedWidget.id);
        } else if (e.key === 'Escape') {
            onWidgetSelect(null);
        }
    }, [selectedWidget, onWidgetDelete, onWidgetSelect]);

    return (
        <div className="flex-1 overflow-hidden bg-gray-100">
            <div className="flex justify-start items-start h-full p-4">
                <div className="relative">
                    {/* Dimension Labels */}
                    {showDimensions && (
                        <>
                            {/* Top dimension label */}
                            <div className="absolute -top-8 left-0 right-0 flex justify-center">
                                <div className="bg-white px-2 py-1 rounded text-xs font-mono text-gray-600 shadow-sm border">
                                    {device.width}px ({converter.format(converter.fromPixels(device.width, 'mm'), 'mm')} / {converter.format(converter.fromPixels(device.width, 'inch'), 'inch')})
                                </div>
                            </div>

                            {/* Left dimension label */}
                            <div className="absolute -left-20 top-0 bottom-0 flex items-center">
                                <div className="bg-white px-2 py-1 rounded text-xs font-mono text-gray-600 shadow-sm border transform -rotate-90 whitespace-nowrap">
                                    {device.height}px ({converter.format(converter.fromPixels(device.height, 'mm'), 'mm')} / {converter.format(converter.fromPixels(device.height, 'inch'), 'inch')})
                                </div>
                            </div>
                        </>
                    )}

                    <div
                        ref={(node) => {
                            if (node) {
                                (canvasRef as any).current = node;
                                drop(node);
                            }
                        }}
                        className={`
                            relative border-2 border-gray-400 rounded-lg shadow-xl canvas-grid
                            ${isOver ? 'border-primary-400 shadow-2xl' : ''}
                        `}
                        style={{
                            width: device.width,
                            height: device.height,
                            minWidth: device.width,
                            minHeight: device.height,
                            maxWidth: device.width,
                            maxHeight: device.height,
                            margin: 0,
                            padding: 0,
                            boxSizing: 'border-box'
                        }}
                        onClick={handleCanvasClick}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {/* Screen Background */}
                        <div
                            className="absolute inset-0 rounded-lg"
                            style={{
                                backgroundColor: backgroundColor || '#000000',
                            }}
                        />

                        {/* Grid Pattern for better visibility */}
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{
                                backgroundImage: `
                                    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                                `,
                                backgroundSize: '20px 20px'
                            }}
                        />

                        {/* Corner size indicators */}
                        {showDimensions && (
                            <>
                                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded font-mono">
                                    0,0
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded font-mono">
                                    {device.width},{device.height}
                                </div>
                            </>
                        )}

                        {/* Help Overlay */}
                        {widgets.length === 0 && !isOver && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center text-gray-500 bg-white bg-opacity-90 p-6 rounded-lg shadow-sm">
                                    <div className="text-lg mb-2 font-medium">Drag widgets from the library</div>
                                    <div className="text-sm space-y-1">
                                        <div>• Select widgets to edit properties</div>
                                        <div>• Press Delete key to remove</div>
                                        <div>• Click red button to delete</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Widgets - sorted by zIndex for proper layering */}
                        {widgets
                            .slice()
                            .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
                            .map((widget) => (
                                <EnhancedWidgetRenderer
                                    key={widget.id}
                                    widget={widget}
                                    isSelected={selectedWidget?.id === widget.id}
                                    onSelect={() => onWidgetSelect(widget)}
                                    onUpdate={(updates) => onWidgetUpdate(widget.id, updates)}
                                    onDelete={() => onWidgetDelete(widget.id)}
                                    onLayerChange={onLayerChange}
                                    canvasSize={{ width: device.width, height: device.height }}
                                />
                            ))}

                        {/* Drop Zone Indicator */}
                        {isOver && (
                            <div className="absolute inset-0 bg-primary-100 bg-opacity-70 border-2 border-dashed border-primary-400 rounded-lg flex items-center justify-center pointer-events-none z-20">
                                <div className="text-primary-600 font-medium bg-white px-4 py-2 rounded-lg shadow-sm">
                                    Drop widget here
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};