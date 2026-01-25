import React, { useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { BaseWidget, DeviceConfig } from '../types';
import { EnhancedWidgetRenderer } from './EnhancedWidgetRenderer';

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
    backgroundColor = '#000000'
}) => {
    const canvasRef = useRef<HTMLDivElement>(null);

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
        <div className="flex-1 p-6 overflow-auto">
            <div className="flex justify-center">
                <div
                    ref={(node) => {
                        if (node) {
                            canvasRef.current = node;
                            drop(node);
                        }
                    }}
                    className={`
            relative border-2 border-gray-300 rounded-lg shadow-lg canvas-grid
            ${isOver ? 'border-primary-400' : ''}
          `}
                    style={{
                        width: device.width,
                        height: device.height,
                        minWidth: device.width,
                        minHeight: device.height
                    }}
                    onClick={handleCanvasClick}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Screen Background Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundColor: backgroundColor,
                            opacity: 0.3,
                            mixBlendMode: 'multiply'
                        }}
                    />

                    {/* Help Overlay */}
                    {widgets.length === 0 && !isOver && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center text-gray-400">
                                <div className="text-lg mb-2">Drag widgets from the library</div>
                                <div className="text-sm">
                                    • Select widgets to edit properties<br />
                                    • Press Delete key to remove<br />
                                    • Click red button to delete
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
    );
};