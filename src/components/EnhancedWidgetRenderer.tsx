import React, { useState, useRef, useCallback } from 'react';
import { Trash2, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown } from 'lucide-react';
import { BaseWidget } from '../types';
import { getWidgetDefinition } from '../data/widgetDefinitions';
import { clamp, snapToGrid } from '../utils/helpers';

interface EnhancedWidgetRendererProps {
    widget: BaseWidget;
    isSelected: boolean;
    onSelect: () => void;
    onUpdate: (updates: Partial<BaseWidget>) => void;
    onDelete: () => void;
    onLayerChange: (id: string, action: 'front' | 'back' | 'forward' | 'backward') => void;
    onNavigate?: (targetScreen: string) => void;
    canvasSize: { width: number; height: number };
}

export const EnhancedWidgetRenderer: React.FC<EnhancedWidgetRendererProps> = ({
    widget,
    isSelected,
    onSelect,
    onUpdate,
    onDelete,
    onLayerChange,
    onNavigate,
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
    }, [isDragging, isResizing, dragStart, widget, onUpdate, canvasSize]);

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
                zIndex: widget.zIndex || 0,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
        >
            <WidgetContent widget={widget} onNavigate={onNavigate} />

            {isSelected && (
                <>
                    {/* Selection Border */}
                    <div className="absolute inset-0 border-2 border-primary-500 pointer-events-none" />

                    {/* Layer Control Buttons */}
                    <div className="absolute -top-8 left-0 flex space-x-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onLayerChange(widget.id, 'front');
                            }}
                            className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center transition-colors"
                            title="Bring to front"
                        >
                            <ChevronsUp size={12} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onLayerChange(widget.id, 'forward');
                            }}
                            className="w-6 h-6 bg-blue-400 hover:bg-blue-500 text-white rounded flex items-center justify-center transition-colors"
                            title="Bring forward"
                        >
                            <ChevronUp size={12} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onLayerChange(widget.id, 'backward');
                            }}
                            className="w-6 h-6 bg-gray-400 hover:bg-gray-500 text-white rounded flex items-center justify-center transition-colors"
                            title="Send backward"
                        >
                            <ChevronDown size={12} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onLayerChange(widget.id, 'back');
                            }}
                            className="w-6 h-6 bg-gray-500 hover:bg-gray-600 text-white rounded flex items-center justify-center transition-colors"
                            title="Send to back"
                        >
                            <ChevronsDown size={12} />
                        </button>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors z-10"
                        title="Delete widget"
                    >
                        <Trash2 size={12} />
                    </button>

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

const WidgetContent: React.FC<{ widget: BaseWidget; onNavigate?: (targetScreen: string) => void }> = ({ widget, onNavigate }) => {
    const { type, properties } = widget;
    const definition = getWidgetDefinition(type);

    // Cast properties to any to access widget-specific properties
    const props = properties as any;

    // Debug logging for image widgets
    if (type === 'image') {
        console.log('🖼️ Image widget rendering:');
        console.log('- Widget ID:', widget.id);
        console.log('- Raw properties:', properties);
        console.log('- Props (cast):', props);
        console.log('- props.src exists:', !!props.src);
        console.log('- props.src value:', props.src);
        console.log('- props.alt value:', props.alt);
    }

    const baseStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        backgroundColor: props.backgroundColor || 'transparent',
        color: props.color || '#374151',
        fontSize: props.fontSize || 14,
        borderRadius: props.borderRadius || 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        outline: 'none',
        fontFamily: 'Inter, sans-serif',
        opacity: props.visible === false ? 0.5 : 1
    };

    switch (type) {
        case 'label':
            return (
                <div style={{
                    ...baseStyle,
                    justifyContent: props.textAlign === 'center' ? 'center' :
                        props.textAlign === 'right' ? 'flex-end' : 'flex-start',
                    fontWeight: props.fontWeight || 'normal'
                }}>
                    {props.text || 'Label'}
                </div>
            );

        case 'dynamic-label':
            // Generate random value for preview if no value is set
            const randomSensorValue = (Math.random() * 50 + 10).toFixed(props.precision || 1);
            const displayValue = props.value !== undefined ?
                `${Number(props.value).toFixed(props.precision || 1)}${props.units || ''}` :
                `${randomSensorValue}${props.units || ''}`;

            return (
                <div style={baseStyle}>
                    {props.text ? props.text.replace('${value}', displayValue) : displayValue}
                </div>
            );

        case 'button':
            return (
                <button
                    style={baseStyle}
                    disabled={props.enabled === false}
                    className={props.enabled === false ? 'opacity-50 cursor-not-allowed' : ''}
                >
                    {props.text || 'Button'}
                </button>
            );

        case 'switch':
            return (
                <div style={{ ...baseStyle, justifyContent: 'flex-start', padding: '4px' }}>
                    <div
                        style={{
                            width: '32px',
                            height: '18px',
                            backgroundColor: props.value ? props.color : props.backgroundColor,
                            borderRadius: '9px',
                            position: 'relative',
                            transition: 'background-color 0.2s',
                            cursor: 'pointer'
                        }}
                    >
                        <div
                            style={{
                                width: '14px',
                                height: '14px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: props.value ? '16px' : '2px',
                                transition: 'left 0.2s',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                            }}
                        />
                    </div>
                </div>
            );

        case 'checkbox':
            return (
                <div style={{ ...baseStyle, padding: '2px' }}>
                    <div
                        style={{
                            width: '16px',
                            height: '16px',
                            border: `2px solid ${props.borderColor || '#D1D5DB'}`,
                            borderRadius: '3px',
                            backgroundColor: props.checked ? props.color : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        {props.checked && (
                            <div style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: 'white',
                                borderRadius: '1px'
                            }} />
                        )}
                    </div>
                </div>
            );

        case 'slider':
            const sliderValue = props.value || 0;
            const sliderMin = props.min || 0;
            const sliderMax = props.max || 100;
            const sliderPercent = ((sliderValue - sliderMin) / (sliderMax - sliderMin)) * 100;

            return (
                <div style={{ ...baseStyle, padding: '8px' }}>
                    <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: props.backgroundColor || '#E5E7EB',
                        borderRadius: '2px',
                        position: 'relative'
                    }}>
                        <div style={{
                            width: `${sliderPercent}%`,
                            height: '100%',
                            backgroundColor: props.color || '#0EA5E9',
                            borderRadius: '2px'
                        }} />
                        <div style={{
                            position: 'absolute',
                            left: `${sliderPercent}%`,
                            top: '-6px',
                            width: '16px',
                            height: '16px',
                            backgroundColor: props.color || '#0EA5E9',
                            borderRadius: '50%',
                            transform: 'translateX(-50%)',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }} />
                    </div>
                </div>
            );

        case 'circular-gauge':
            // Generate random value for preview if no value is set
            const randomGaugeValue = Math.floor(Math.random() * ((props.max || 100) - (props.min || 0))) + (props.min || 0);
            const displayGaugeValue = props.value !== undefined ? props.value : randomGaugeValue;

            const gaugeMin = props.min || 0;
            const gaugeMax = props.max || 100;
            const gaugePercent = ((displayGaugeValue - gaugeMin) / (gaugeMax - gaugeMin)) * 100;
            const strokeWidth = props.thickness || 8;
            const radius = Math.min(widget.size.width, widget.size.height) / 2 - strokeWidth;
            const circumference = 2 * Math.PI * radius;
            const strokeDasharray = circumference;
            const strokeDashoffset = circumference - (gaugePercent / 100) * circumference;

            return (
                <div style={{
                    ...baseStyle,
                    flexDirection: 'column',
                    backgroundColor: 'transparent' // Override to remove white background
                }}>
                    <svg width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
                        {/* Background circle */}
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            fill="none"
                            stroke={props.backgroundColor || '#E5E7EB'}
                            strokeWidth={strokeWidth}
                        />
                        {/* Progress circle */}
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            fill="none"
                            stroke={props.color || '#0EA5E9'}
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                        />
                    </svg>
                    {props.showValue && (
                        <div style={{
                            position: 'absolute',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: props.color || '#0EA5E9'
                        }}>
                            {displayGaugeValue}{props.units || ''}
                        </div>
                    )}
                </div>
            );

        case 'linear-gauge':
            // Generate random value for preview if no value is set
            const randomLinearValue = Math.floor(Math.random() * ((props.max || 100) - (props.min || 0))) + (props.min || 0);
            const displayLinearValue = props.value !== undefined ? props.value : randomLinearValue;

            const linearMin = props.min || 0;
            const linearMax = props.max || 100;
            const linearPercent = ((displayLinearValue - linearMin) / (linearMax - linearMin)) * 100;

            return (
                <div style={{ ...baseStyle, padding: '4px' }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: props.backgroundColor || '#E5E7EB',
                        borderRadius: props.borderRadius || 0,
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${linearPercent}%`,
                            height: '100%',
                            backgroundColor: props.color || '#10B981',
                            borderRadius: props.borderRadius || 0,
                            transition: 'width 0.3s ease'
                        }} />
                        {props.showValue && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: linearPercent > 50 ? 'white' : props.color || '#10B981'
                            }}>
                                {displayLinearValue}%
                            </div>
                        )}
                    </div>
                </div>
            );

        case 'status-led':
            const statusColors = {
                success: '#10B981',
                warning: '#F59E0B',
                error: '#EF4444',
                info: '#3B82F6'
            };
            const ledColor = statusColors[props.status as keyof typeof statusColors] || props.color || '#10B981';

            return (
                <div style={baseStyle}>
                    <div
                        style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: ledColor,
                            borderRadius: '50%',
                            boxShadow: `0 0 8px ${ledColor}`,
                            animation: props.blinking ? 'blink 1s infinite' : 'none'
                        }}
                    />
                </div>
            );

        case 'container':
            return (
                <div
                    style={{
                        ...baseStyle,
                        border: `${props.borderWidth || 1}px solid ${props.borderColor || '#E5E7EB'}`,
                        boxShadow: props.shadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                    }}
                />
            );

        case 'image':
            // Direct property access
            const imageSrc = (properties as any).src || '';
            const imageAlt = (properties as any).alt || 'Image';

            console.log('🖼️ Image widget check:');
            console.log('- imageSrc length:', imageSrc?.length);
            console.log('- imageSrc exists:', !!imageSrc);
            console.log('- imageAlt:', imageAlt);

            return (
                <div style={baseStyle}>
                    {imageSrc && imageSrc.length > 0 ? (
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: props.fit || 'cover',
                                borderRadius: props.borderRadius || 0
                            }}
                            onLoad={() => console.log('✅ Image loaded!')}
                            onError={() => console.error('❌ Image failed to load')}
                        />
                    ) : (
                        <div style={{
                            color: '#9ca3af',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '100%',
                            height: '100%'
                        }}>
                            {imageAlt}
                        </div>
                    )}
                </div>
            );

        case 'logo':
            const logoSrc = (properties as any).src || '';
            const logoAlt = (properties as any).alt || 'Logo';
            const logoAnimation = (properties as any).animation || 'none';

            return (
                <div style={{
                    ...baseStyle,
                    animation: logoAnimation === 'fade-in' ? 'fadeIn 1s ease-in' :
                              logoAnimation === 'slide-up' ? 'slideUp 0.8s ease-out' :
                              logoAnimation === 'zoom-in' ? 'zoomIn 0.6s ease-out' : 'none'
                }}>
                    {logoSrc && logoSrc.length > 0 ? (
                        <img
                            src={logoSrc}
                            alt={logoAlt}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: props.fit || 'contain',
                                borderRadius: props.borderRadius || 0
                            }}
                        />
                    ) : (
                        <div style={{
                            color: '#6b7280',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '100%',
                            height: '100%',
                            border: '2px dashed #d1d5db',
                            borderRadius: props.borderRadius || 0
                        }}>
                            📷 {logoAlt}
                        </div>
                    )}
                </div>
            );

        case 'video':
            const videoSrc = (properties as any).src || '';
            const videoAutoplay = (properties as any).autoplay || true;
            const videoLoop = (properties as any).loop || false;
            const videoControls = (properties as any).controls || false;
            const videoMuted = (properties as any).muted || true;

            return (
                <div style={baseStyle}>
                    {videoSrc && videoSrc.length > 0 ? (
                        <video
                            src={videoSrc}
                            autoPlay={videoAutoplay}
                            loop={videoLoop}
                            controls={videoControls}
                            muted={videoMuted}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: props.fit || 'cover',
                                borderRadius: props.borderRadius || 0
                            }}
                        />
                    ) : (
                        <div style={{
                            color: '#6b7280',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '100%',
                            height: '100%',
                            border: '2px dashed #d1d5db',
                            borderRadius: props.borderRadius || 0,
                            backgroundColor: '#f3f4f6'
                        }}>
                            🎬 Video Player
                        </div>
                    )}
                </div>
            );

        case 'nav-button':
            const navText = props.text || 'Settings';
            const navIcon = props.icon || 'Settings';
            const navLayout = props.layout || 'vertical';
            const navIconSize = props.iconSize || 24;
            const navTargetScreen = props.targetScreen || '';

            // Icon mapping
            const iconMap: { [key: string]: string } = {
                'Settings': '⚙️',
                'Wifi': '📶',
                'Bluetooth': '🔵',
                'Network': '🌐',
                'Home': '🏠',
                'Back': '⬅️',
                'Menu': '☰'
            };

            const iconDisplay = iconMap[navIcon] || '⚙️';

            return (
                <button
                    style={{
                        ...baseStyle,
                        flexDirection: navLayout === 'horizontal' ? 'row' : 'column',
                        gap: '4px',
                        cursor: 'pointer',
                        border: `1px solid ${props.borderColor || '#e5e7eb'}`,
                        transition: 'all 0.2s ease',
                        fontWeight: '500'
                    }}
                    title={navTargetScreen ? `Navigate to ${navTargetScreen}` : navText}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (navTargetScreen && onNavigate) {
                            console.log('🧭 Navigation clicked:', navTargetScreen);
                            
                            // Visual feedback
                            e.currentTarget.style.transform = 'scale(0.95)';
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                            
                            setTimeout(() => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.backgroundColor = props.backgroundColor || '#F9FAFB';
                            }, 150);
                            
                            onNavigate(navTargetScreen);
                        } else if (!navTargetScreen) {
                            alert('No target screen specified for this button. Please set the "Target Screen" property.');
                        }
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = props.backgroundColor || '#F9FAFB';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <div style={{ fontSize: `${navIconSize}px` }}>
                        {iconDisplay}
                    </div>
                    <div style={{ fontSize: `${props.fontSize || 12}px` }}>
                        {navText}
                    </div>
                    {navTargetScreen && (
                        <div style={{ 
                            fontSize: '8px', 
                            color: '#9ca3af',
                            marginTop: '2px'
                        }}>
                            → {navTargetScreen}
                        </div>
                    )}
                </button>
            );

        default:
            return (
                <div style={baseStyle}>
                    <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                        {definition?.name || 'Unknown'}
                    </div>
                </div>
            );
    }
};