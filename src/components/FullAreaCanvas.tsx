import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { BaseWidget, DeviceConfig } from '../types';
import { EnhancedWidgetRenderer } from './EnhancedWidgetRenderer';
import { UnitConverter } from '../utils/unitConverter';
import { ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';

interface FullAreaCanvasProps {
    widgets: BaseWidget[];
    device: DeviceConfig;
    selectedWidget: BaseWidget | null;
    onWidgetSelect: (widget: BaseWidget | null) => void;
    onWidgetAdd: (type: BaseWidget['type'], position: { x: number; y: number }) => void;
    onWidgetUpdate: (id: string, updates: Partial<BaseWidget>) => void;
    onWidgetDelete: (id: string) => void;
    onLayerChange: (id: string, action: 'front' | 'back' | 'forward' | 'backward') => void;
    onNavigate?: (targetScreen: string) => void;
    backgroundColor?: string;
}

export const FullAreaCanvas: React.FC<FullAreaCanvasProps> = ({
    widgets,
    device,
    selectedWidget,
    onWidgetSelect,
    onWidgetAdd,
    onWidgetUpdate,
    onWidgetDelete,
    onLayerChange,
    onNavigate,
    backgroundColor = '#000000'
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const converter = new UnitConverter(device.dpi || 96);

    // Auto-fit zoom when device size changes
    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const containerWidth = container.clientWidth - 40; // padding
            const containerHeight = container.clientHeight - 40; // padding

            const scaleX = containerWidth / device.width;
            const scaleY = containerHeight / device.height;
            const autoFitZoom = Math.min(scaleX, scaleY, 1); // Don't zoom in beyond 100%

            setZoom(autoFitZoom);
            setPan({ x: 0, y: 0 }); // Reset pan when auto-fitting
        }
    }, [device.width, device.height]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'widget',
        drop: (item: { type: BaseWidget['type'] }, monitor) => {
            console.log('Drop triggered:', item.type);
            const clientOffset = monitor.getClientOffset();

            if (clientOffset) {
                // Use a simple approach - find the canvas element by class
                const canvasElement = document.querySelector('.canvas-drop-target') as HTMLElement;

                if (canvasElement) {
                    const canvasRect = canvasElement.getBoundingClientRect();

                    // Calculate position relative to the canvas element
                    const x = Math.max(0, Math.min(clientOffset.x - canvasRect.left, device.width - 50));
                    const y = Math.max(0, Math.min(clientOffset.y - canvasRect.top, device.height - 30));

                    console.log('Adding widget at:', { x, y });
                    onWidgetAdd(item.type, { x, y });
                } else {
                    console.log('Canvas element not found');
                }
            } else {
                console.log('No client offset');
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [device.width, device.height, onWidgetAdd]);

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

    const handleZoomChange = (newZoom: number) => {
        setZoom(Math.max(0.1, Math.min(3, newZoom)));
    };

    const handleFitToScreen = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            const containerWidth = container.clientWidth - 40;
            const containerHeight = container.clientHeight - 40;

            const scaleX = containerWidth / device.width;
            const scaleY = containerHeight / device.height;
            const fitZoom = Math.min(scaleX, scaleY);

            setZoom(fitZoom);
            setPan({ x: 0, y: 0 });
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 1 || (e.button === 0 && e.altKey)) { // Middle mouse or Alt+Left
            setIsPanning(true);
            setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning) {
            setPan({
                x: e.clientX - panStart.x,
                y: e.clientY - panStart.y
            });
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (isPanning) {
            setIsPanning(false);
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            handleZoomChange(zoom + delta);
        }
    };

    return (
        <div
            ref={containerRef}
            className="flex-1 relative overflow-hidden bg-gray-100"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Zoom and Pan Controls */}
            <div className="absolute top-4 right-4 z-30 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                <div className="flex items-center space-x-2 mb-2">
                    <button
                        onClick={() => handleZoomChange(zoom - 0.1)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Zoom Out"
                    >
                        <ZoomOut size={16} />
                    </button>
                    <span className="text-xs font-mono min-w-12 text-center">
                        {Math.round(zoom * 100)}%
                    </span>
                    <button
                        onClick={() => handleZoomChange(zoom + 0.1)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Zoom In"
                    >
                        <ZoomIn size={16} />
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleFitToScreen}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Fit to Screen"
                    >
                        <Maximize2 size={16} />
                    </button>
                    <button
                        onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
                        className="p-1 hover:bg-gray-100 rounded text-xs"
                        title="Reset View"
                    >
                        1:1
                    </button>
                </div>
            </div>

            {/* Screen Size Info */}
            <div className="absolute top-4 left-4 z-30 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                <div className="text-sm font-medium text-gray-700 mb-1">Screen Size</div>
                <div className="text-xs text-gray-600 space-y-1">
                    <div>{device.width} × {device.height}px</div>
                    <div>{converter.format(converter.fromPixels(device.width, 'mm'), 'mm')} × {converter.format(converter.fromPixels(device.height, 'mm'), 'mm')}</div>
                    <div>{converter.format(converter.fromPixels(device.width, 'inch'), 'inch')} × {converter.format(converter.fromPixels(device.height, 'inch'), 'inch')}</div>
                </div>
            </div>

            {/* Pan Instructions */}
            <div className="absolute bottom-4 left-4 z-30 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                <div className="flex items-center space-x-1">
                    <Move size={12} />
                    <span>Alt+Drag or Middle-click to pan • Ctrl+Scroll to zoom</span>
                </div>
            </div>

            {/* Canvas Container */}
            <div
                className="w-full h-full flex items-center justify-center"
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
                style={{
                    cursor: isPanning ? 'grabbing' : 'default',
                    userSelect: 'none'
                }}
            >
                <div
                    style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: 'center center'
                    }}
                >
                    <div
                        ref={drop}
                        className={`
                            canvas-drop-target
                            relative border-2 border-gray-400 rounded-lg shadow-xl bg-white
                            ${isOver ? 'border-primary-400 shadow-2xl' : ''}
                        `}
                        style={{
                            width: device.width,
                            height: device.height,
                            cursor: 'default',
                            pointerEvents: isPanning ? 'none' : 'auto'
                        }}
                        onClick={handleCanvasClick}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {/* Screen Background */}
                        <div
                            className="absolute inset-0 rounded-lg"
                            style={{
                                ...(backgroundColor?.startsWith('http') || backgroundColor?.startsWith('data:') || backgroundColor?.startsWith('/'))
                                    ? {
                                        backgroundImage: `url(${backgroundColor})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }
                                    : {
                                        backgroundColor: backgroundColor || '#000000'
                                    }
                            }}
                        />

                        {/* Grid Pattern */}
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

                        {/* Corner coordinates */}
                        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded font-mono">
                            0,0
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded font-mono">
                            {device.width},{device.height}
                        </div>

                        {/* Help Overlay */}
                        {widgets.length === 0 && !isOver && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center text-gray-500 bg-white bg-opacity-90 p-6 rounded-lg shadow-sm">
                                    <div className="text-lg mb-2 font-medium">Drag widgets from the library</div>
                                    <div className="text-sm space-y-1">
                                        <div>• Select widgets to edit properties</div>
                                        <div>• Press Delete key to remove</div>
                                        <div>• Alt+Drag to pan the view</div>
                                        <div>• Ctrl+Scroll to zoom</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Widgets */}
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
                                    onNavigate={onNavigate}
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