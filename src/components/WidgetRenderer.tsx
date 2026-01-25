import React, { useState, useRef, useCallback } from 'react';
import { Widget } from '../types';
import { clamp, snapToGrid } from '../utils/helpers';

interface WidgetRendererProps {
    widget: Widget;
    isSelected: boolean;
    onSelect: () => void;
    onUpdate: (updates: Partial<Widget>) => void;
    canvasSize: { width: number; height: number };
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({
    widget,
    isSelected,
    onSelect,
    onUpdate,
    canvasSize
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const widgetRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isSelected) {
            onSelect();
            return;
        }

        const rect = widgetRef.current?.getBoundingClientRect();
        if (!rect) return;

        const isResizeHandle = (e.target as HTMLElement).classList.contains('resize-handle');

        if (isResizeHandle) {
            setIsResizing(true);
        } else {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - widget.position.x,
                y: e.clientY - widget.position.y
            });
        }
    }, [isSelected, onSelect, widget.position]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            const newX = snapToGrid(clamp(e.clientX - dragStart.x, 0, canvasSize.width - widget.size.width));
            const newY = snapToGrid(clamp(e.clientY - dragStart.y, 0, canvasSize.height - widget.size.height));

            onUpdate({
                position: { x: newX, y: newY }
            });
        } else if (isResizing) {
            const rect = widgetRef.current?.getBoundingClientRect();
            if (!rect) return;

            const newWidth = snapToGrid(clamp(e.clientX - rect.left, 20, canvasSize.width - widget.position.x));
            const newHeight = snapToGrid(clamp(e.clientY - rect.top, 20, canvasSize.height - widget.position.y));

            onUpdate({
                size: { width: newWidth, height: newHeight }
            });
        }
    }, [isDragging, isResizing, dragStart, widget, onUpdate]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(false);
    }, []);

    React.useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={widgetRef}
            className={`widget-container ${isSelected ? 'selected' : ''}`}
            style={{
                left: widget.position.x,
                top: widget.position.y,
                width: widget.size.width,
                height: widget.size.height,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
        >
            <WidgetContent widget={widget} />

            {isSelected && (
                <>
                    {/* Selection Border */}
                    <div className="absolute inset-0 border-2 border-primary-500 pointer-events-none" />

                    {/* Resize Handle */}
                    <div
                        className="resize-handle absolute bottom-0 right-0 w-3 h-3 bg-primary-500 cursor-se-resize"
                        style={{ transform: 'translate(50%, 50%)' }}
                    />
                </>
            )}
        </div>
    );
};

const WidgetContent: React.FC<{ widget: Widget }> = ({ widget }) => {
    const { type, properties } = widget;

    const baseStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        backgroundColor: properties.backgroundColor || 'transparent',
        color: properties.color || '#374151',
        fontSize: properties.fontSize || 14,
        borderRadius: properties.borderRadius || 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        outline: 'none',
        fontFamily: 'Inter, sans-serif'
    };

    switch (type) {
        case 'label':
            return (
                <div style={baseStyle}>
                    {properties.text || 'Label'}
                </div>
            );

        case 'button':
            return (
                <button style={baseStyle}>
                    {properties.text || 'Button'}
                </button>
            );

        case 'switch':
            return (
                <div style={{ ...baseStyle, justifyContent: 'flex-start', padding: '4px' }}>
                    <div
                        style={{
                            width: '24px',
                            height: '16px',
                            backgroundColor: properties.value ? properties.color : properties.backgroundColor,
                            borderRadius: '8px',
                            position: 'relative',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: properties.value ? '10px' : '2px',
                                transition: 'left 0.2s'
                            }}
                        />
                    </div>
                </div>
            );

        case 'gauge':
            const percentage = ((properties.value || 0) / (properties.max || 100)) * 100;
            return (
                <div style={{ ...baseStyle, flexDirection: 'column', padding: '8px' }}>
                    <div
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: `conic-gradient(${properties.color || '#0ea5e9'} ${percentage * 3.6}deg, #e5e7eb 0deg)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}
                        >
                            {properties.value || 0}
                        </div>
                    </div>
                </div>
            );

        case 'image':
            return (
                <div style={baseStyle}>
                    {properties.imageUrl ? (
                        <img
                            src={properties.imageUrl}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{ color: '#9ca3af', fontSize: '12px' }}>Image</div>
                    )}
                </div>
            );

        case 'container':
            return (
                <div
                    style={{
                        ...baseStyle,
                        border: '1px solid #e5e7eb',
                        backgroundColor: properties.backgroundColor || '#ffffff'
                    }}
                />
            );

        default:
            return <div style={baseStyle}>Unknown</div>;
    }
};