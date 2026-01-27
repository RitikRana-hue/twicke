import { WidgetType, WidgetCategory, BaseWidgetProperties, TextWidgetProperties, InputWidgetProperties, DisplayWidgetProperties, ContainerWidgetProperties, MediaWidgetProperties } from '../types/widgets';

export interface WidgetDefinition {
    type: WidgetType;
    name: string;
    description: string;
    category: WidgetCategory;
    icon: string;
    defaultSize: { width: number; height: number };
    defaultProperties: any; // Allow any properties for flexibility
    propertySchema: PropertySchema[];
    codeTemplate: string;
    phase: 1 | 2 | 3; // Implementation phase
}

export interface PropertySchema {
    key: string;
    label: string;
    type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'range' | 'textarea';
    options?: string[] | { value: any; label: string }[];
    min?: number;
    max?: number;
    step?: number;
    default?: any;
    description?: string;
    group?: string;
}

// Phase 1 - Foundation Widgets (MVP)
export const PHASE_1_WIDGETS: WidgetDefinition[] = [
    // Text & Display
    {
        type: 'label',
        name: 'Label',
        description: 'Static text display',
        category: 'text-display',
        icon: 'Type',
        defaultSize: { width: 100, height: 30 },
        defaultProperties: {
            text: 'Label',
            fontSize: 14,
            color: '#374151',
            backgroundColor: 'transparent',
            textAlign: 'left'
        },
        propertySchema: [
            { key: 'text', label: 'Text', type: 'text', default: 'Label', group: 'Content' },
            { key: 'fontSize', label: 'Font Size', type: 'number', min: 8, max: 72, default: 14, group: 'Style' },
            { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['normal', 'bold'], default: 'normal', group: 'Style' },
            { key: 'color', label: 'Text Color', type: 'color', default: '#374151', group: 'Style' },
            { key: 'textAlign', label: 'Alignment', type: 'select', options: ['left', 'center', 'right'], default: 'left', group: 'Style' }
        ],
        codeTemplate: 'tft.setTextColor({color}); tft.setCursor({x}, {y}); tft.print("{text}");',
        phase: 1
    },

    {
        type: 'dynamic-label',
        name: 'Dynamic Label',
        description: 'Text with live data binding',
        category: 'text-display',
        icon: 'Activity',
        defaultSize: { width: 120, height: 30 },
        defaultProperties: {
            text: '${value}',
            fontSize: 14,
            color: '#0EA5E9',
            units: '',
            precision: 1
        },
        propertySchema: [
            { key: 'text', label: 'Format', type: 'text', default: '${value}', description: 'Use ${value} for data', group: 'Content' },
            { key: 'units', label: 'Units', type: 'text', default: '', group: 'Content' },
            { key: 'precision', label: 'Decimal Places', type: 'number', min: 0, max: 5, default: 1, group: 'Content' },
            { key: 'fontSize', label: 'Font Size', type: 'number', min: 8, max: 72, default: 14, group: 'Style' },
            { key: 'color', label: 'Text Color', type: 'color', default: '#0EA5E9', group: 'Style' }
        ],
        codeTemplate: 'tft.setTextColor({color}); tft.setCursor({x}, {y}); tft.print(String({value}, {precision}) + "{units}");',
        phase: 1
    },

    // Buttons
    {
        type: 'button',
        name: 'Button',
        description: 'Interactive button',
        category: 'input-control',
        icon: 'Square',
        defaultSize: { width: 80, height: 40 },
        defaultProperties: {
            text: 'Button',
            fontSize: 14,
            color: '#FFFFFF',
            backgroundColor: '#0EA5E9',
            borderRadius: 6,
            enabled: true
        },
        propertySchema: [
            { key: 'text', label: 'Text', type: 'text', default: 'Button', group: 'Content' },
            { key: 'fontSize', label: 'Font Size', type: 'number', min: 8, max: 24, default: 14, group: 'Style' },
            { key: 'color', label: 'Text Color', type: 'color', default: '#FFFFFF', group: 'Style' },
            { key: 'backgroundColor', label: 'Background', type: 'color', default: '#0EA5E9', group: 'Style' },
            { key: 'borderRadius', label: 'Border Radius', type: 'number', min: 0, max: 20, default: 6, group: 'Style' },
            { key: 'enabled', label: 'Enabled', type: 'boolean', default: true, group: 'Behavior' }
        ],
        codeTemplate: 'tft.fillRoundRect({x}, {y}, {width}, {height}, {borderRadius}, {backgroundColor}); tft.setTextColor({color}); tft.setCursor({x}+10, {y}+{height}/2-8); tft.print("{text}");',
        phase: 1
    },

    // Input Controls
    {
        type: 'switch',
        name: 'Switch',
        description: 'Toggle switch control',
        category: 'input-control',
        icon: 'ToggleLeft',
        defaultSize: { width: 60, height: 30 },
        defaultProperties: {
            value: false,
            color: '#0EA5E9',
            backgroundColor: '#E5E7EB',
            enabled: true
        },
        propertySchema: [
            { key: 'value', label: 'Initial State', type: 'boolean', default: false, group: 'Content' },
            { key: 'color', label: 'Active Color', type: 'color', default: '#0EA5E9', group: 'Style' },
            { key: 'backgroundColor', label: 'Background', type: 'color', default: '#E5E7EB', group: 'Style' },
            { key: 'enabled', label: 'Enabled', type: 'boolean', default: true, group: 'Behavior' }
        ],
        codeTemplate: 'drawSwitch({x}, {y}, {width}, {height}, {value}, {color}, {backgroundColor});',
        phase: 1
    },

    {
        type: 'slider',
        name: 'Slider',
        description: 'Horizontal value slider',
        category: 'input-control',
        icon: 'Minus',
        defaultSize: { width: 120, height: 20 },
        defaultProperties: {
            value: 50,
            min: 0,
            max: 100,
            step: 1,
            color: '#0EA5E9',
            backgroundColor: '#E5E7EB'
        },
        propertySchema: [
            { key: 'value', label: 'Value', type: 'number', default: 50, group: 'Content' },
            { key: 'min', label: 'Minimum', type: 'number', default: 0, group: 'Content' },
            { key: 'max', label: 'Maximum', type: 'number', default: 100, group: 'Content' },
            { key: 'step', label: 'Step', type: 'number', min: 0.1, default: 1, group: 'Content' },
            { key: 'color', label: 'Active Color', type: 'color', default: '#0EA5E9', group: 'Style' },
            { key: 'backgroundColor', label: 'Track Color', type: 'color', default: '#E5E7EB', group: 'Style' }
        ],
        codeTemplate: 'drawSlider({x}, {y}, {width}, {height}, {value}, {min}, {max}, {color});',
        phase: 1
    },

    // Data Visualization
    {
        type: 'circular-gauge',
        name: 'Circular Gauge',
        description: 'Circular progress indicator',
        category: 'data-visualization',
        icon: 'Gauge',
        defaultSize: { width: 100, height: 100 },
        defaultProperties: {
            value: 50,
            min: 0,
            max: 100,
            units: '%',
            color: '#0EA5E9',
            backgroundColor: '#E5E7EB',
            showValue: true,
            thickness: 8
        },
        propertySchema: [
            { key: 'value', label: 'Value', type: 'number', default: 50, group: 'Content' },
            { key: 'min', label: 'Minimum', type: 'number', default: 0, group: 'Content' },
            { key: 'max', label: 'Maximum', type: 'number', default: 100, group: 'Content' },
            { key: 'units', label: 'Units', type: 'text', default: '%', group: 'Content' },
            { key: 'showValue', label: 'Show Value', type: 'boolean', default: true, group: 'Content' },
            { key: 'color', label: 'Gauge Color', type: 'color', default: '#0EA5E9', group: 'Style' },
            { key: 'backgroundColor', label: 'Background', type: 'color', default: '#E5E7EB', group: 'Style' },
            { key: 'thickness', label: 'Thickness', type: 'number', min: 2, max: 20, default: 8, group: 'Style' }
        ],
        codeTemplate: 'drawCircularGauge({x}, {y}, {width}, {value}, {min}, {max}, {color});',
        phase: 1
    },

    {
        type: 'linear-gauge',
        name: 'Linear Gauge',
        description: 'Horizontal progress bar',
        category: 'data-visualization',
        icon: 'BarChart3',
        defaultSize: { width: 120, height: 20 },
        defaultProperties: {
            value: 75,
            min: 0,
            max: 100,
            color: '#10B981',
            backgroundColor: '#E5E7EB',
            showValue: true,
            borderRadius: 10
        },
        propertySchema: [
            { key: 'value', label: 'Value', type: 'number', default: 75, group: 'Content' },
            { key: 'min', label: 'Minimum', type: 'number', default: 0, group: 'Content' },
            { key: 'max', label: 'Maximum', type: 'number', default: 100, group: 'Content' },
            { key: 'showValue', label: 'Show Value', type: 'boolean', default: true, group: 'Content' },
            { key: 'color', label: 'Fill Color', type: 'color', default: '#10B981', group: 'Style' },
            { key: 'backgroundColor', label: 'Background', type: 'color', default: '#E5E7EB', group: 'Style' },
            { key: 'borderRadius', label: 'Border Radius', type: 'number', min: 0, max: 20, default: 10, group: 'Style' }
        ],
        codeTemplate: 'drawLinearGauge({x}, {y}, {width}, {height}, {value}, {min}, {max}, {color});',
        phase: 1
    },

    // Containers
    {
        type: 'container',
        name: 'Container',
        description: 'Group and organize widgets',
        category: 'containers',
        icon: 'Box',
        defaultSize: { width: 120, height: 80 },
        defaultProperties: {
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            shadow: false,
            padding: { top: 8, right: 8, bottom: 8, left: 8 }
        },
        propertySchema: [
            { key: 'backgroundColor', label: 'Background', type: 'color', default: '#FFFFFF', group: 'Style' },
            { key: 'borderRadius', label: 'Border Radius', type: 'number', min: 0, max: 20, default: 8, group: 'Style' },
            { key: 'borderWidth', label: 'Border Width', type: 'number', min: 0, max: 5, default: 1, group: 'Style' },
            { key: 'borderColor', label: 'Border Color', type: 'color', default: '#E5E7EB', group: 'Style' },
            { key: 'shadow', label: 'Drop Shadow', type: 'boolean', default: false, group: 'Style' }
        ],
        codeTemplate: 'tft.fillRoundRect({x}, {y}, {width}, {height}, {borderRadius}, {backgroundColor}); tft.drawRoundRect({x}, {y}, {width}, {height}, {borderRadius}, {borderColor});',
        phase: 1
    },

    // Media
    {
        type: 'image',
        name: 'Image',
        description: 'Display images',
        category: 'media',
        icon: 'Image',
        defaultSize: { width: 80, height: 80 },
        defaultProperties: {
            src: '',
            alt: 'Image',
            fit: 'cover',
            backgroundColor: '#F3F4F6',
            borderRadius: 4
        },
        propertySchema: [
            { key: 'src', label: 'Image URL', type: 'text', default: '', group: 'Content' },
            { key: 'alt', label: 'Alt Text', type: 'text', default: 'Image', group: 'Content' },
            { key: 'fit', label: 'Fit', type: 'select', options: ['contain', 'cover', 'fill'], default: 'cover', group: 'Style' },
            { key: 'backgroundColor', label: 'Background', type: 'color', default: '#F3F4F6', group: 'Style' },
            { key: 'borderRadius', label: 'Border Radius', type: 'number', min: 0, max: 20, default: 4, group: 'Style' }
        ],
        codeTemplate: 'drawImage({x}, {y}, {width}, {height}, "{src}");',
        phase: 1
    },

    // Startup & Branding
    {
        type: 'logo',
        name: 'Logo',
        description: 'Brand logo display',
        category: 'media',
        icon: 'Image',
        defaultSize: { width: 120, height: 60 },
        defaultProperties: {
            src: '',
            alt: 'Logo',
            fit: 'contain',
            backgroundColor: 'transparent',
            borderRadius: 0,
            animation: 'none',
            uploadType: 'url'
        },
        propertySchema: [
            { key: 'uploadType', label: 'Source Type', type: 'select', options: ['url', 'file'], default: 'url', group: 'Content' },
            { key: 'src', label: 'Logo URL', type: 'text', default: '', group: 'Content' },
            { key: 'alt', label: 'Alt Text', type: 'text', default: 'Logo', group: 'Content' },
            { key: 'fit', label: 'Fit', type: 'select', options: ['contain', 'cover', 'fill'], default: 'contain', group: 'Style' },
            { key: 'backgroundColor', label: 'Background', type: 'color', default: 'transparent', group: 'Style' },
            { key: 'animation', label: 'Animation', type: 'select', options: ['none', 'fade-in', 'slide-up', 'zoom-in'], default: 'none', group: 'Animation' }
        ],
        codeTemplate: 'drawLogo({x}, {y}, {width}, {height}, "{src}");',
        phase: 1
    },

    {
        type: 'video',
        name: 'Video',
        description: 'Video player for startup animations',
        category: 'media',
        icon: 'Image',
        defaultSize: { width: 160, height: 90 },
        defaultProperties: {
            src: '',
            autoplay: true,
            loop: false,
            controls: false,
            muted: true,
            fit: 'cover'
        },
        propertySchema: [
            { key: 'src', label: 'Video URL', type: 'text', default: '', group: 'Content' },
            { key: 'autoplay', label: 'Autoplay', type: 'boolean', default: true, group: 'Playback' },
            { key: 'loop', label: 'Loop', type: 'boolean', default: false, group: 'Playback' },
            { key: 'controls', label: 'Show Controls', type: 'boolean', default: false, group: 'Playback' },
            { key: 'muted', label: 'Muted', type: 'boolean', default: true, group: 'Playback' },
            { key: 'fit', label: 'Fit', type: 'select', options: ['contain', 'cover', 'fill'], default: 'cover', group: 'Style' }
        ],
        codeTemplate: 'playVideo({x}, {y}, {width}, {height}, "{src}");',
        phase: 1
    },

    // Navigation Buttons
    {
        type: 'nav-button',
        name: 'Navigation Button',
        description: 'Button that navigates to another screen',
        category: 'navigation',
        icon: 'Square',
        defaultSize: { width: 100, height: 80 },
        defaultProperties: {
            text: 'Settings',
            icon: 'Settings',
            fontSize: 12,
            color: '#374151',
            backgroundColor: '#F9FAFB',
            borderRadius: 8,
            targetScreen: '',
            iconSize: 24,
            layout: 'vertical'
        },
        propertySchema: [
            { key: 'text', label: 'Text', type: 'text', default: 'Settings', group: 'Content' },
            { key: 'icon', label: 'Icon', type: 'select', options: ['Settings', 'Wifi', 'Bluetooth', 'Network', 'Home', 'Back', 'Menu'], default: 'Settings', group: 'Content' },
            { key: 'targetScreen', label: 'Target Screen', type: 'text', default: '', description: 'Screen to navigate to', group: 'Navigation' },
            { key: 'layout', label: 'Layout', type: 'select', options: ['vertical', 'horizontal'], default: 'vertical', group: 'Style' },
            { key: 'iconSize', label: 'Icon Size', type: 'number', min: 16, max: 48, default: 24, group: 'Style' },
            { key: 'fontSize', label: 'Font Size', type: 'number', min: 8, max: 20, default: 12, group: 'Style' },
            { key: 'color', label: 'Text Color', type: 'color', default: '#374151', group: 'Style' },
            { key: 'backgroundColor', label: 'Background', type: 'color', default: '#F9FAFB', group: 'Style' },
            { key: 'borderRadius', label: 'Border Radius', type: 'number', min: 0, max: 20, default: 8, group: 'Style' }
        ],
        codeTemplate: 'drawNavButton({x}, {y}, {width}, {height}, "{text}", "{icon}", "{targetScreen}");',
        phase: 1
    }
];

// Phase 2 - Power Features
export const PHASE_2_WIDGETS: WidgetDefinition[] = [
    // Advanced Input Controls
    {
        type: 'checkbox',
        name: 'Checkbox',
        description: 'Checkbox input',
        category: 'input-control',
        icon: 'CheckSquare',
        defaultSize: { width: 20, height: 20 },
        defaultProperties: {
            checked: false,
            color: '#0EA5E9',
            borderColor: '#D1D5DB'
        },
        propertySchema: [
            { key: 'checked', label: 'Checked', type: 'boolean', default: false, group: 'Content' },
            { key: 'color', label: 'Check Color', type: 'color', default: '#0EA5E9', group: 'Style' },
            { key: 'borderColor', label: 'Border Color', type: 'color', default: '#D1D5DB', group: 'Style' }
        ],
        codeTemplate: 'drawCheckbox({x}, {y}, {checked}, {color});',
        phase: 2
    },

    {
        type: 'text-input',
        name: 'Text Input',
        description: 'Text input field',
        category: 'input-control',
        icon: 'Type',
        defaultSize: { width: 120, height: 32 },
        defaultProperties: {
            value: '',
            placeholder: 'Enter text...',
            fontSize: 14,
            color: '#374151',
            backgroundColor: '#FFFFFF',
            borderColor: '#D1D5DB'
        },
        propertySchema: [
            { key: 'value', label: 'Value', type: 'text', default: '', group: 'Content' },
            { key: 'placeholder', label: 'Placeholder', type: 'text', default: 'Enter text...', group: 'Content' },
            { key: 'fontSize', label: 'Font Size', type: 'number', min: 8, max: 24, default: 14, group: 'Style' },
            { key: 'color', label: 'Text Color', type: 'color', default: '#374151', group: 'Style' },
            { key: 'backgroundColor', label: 'Background', type: 'color', default: '#FFFFFF', group: 'Style' }
        ],
        codeTemplate: 'drawTextInput({x}, {y}, {width}, {height}, "{value}");',
        phase: 2
    },

    // Status & Indicators
    {
        type: 'status-led',
        name: 'Status LED',
        description: 'Colored status indicator',
        category: 'status-feedback',
        icon: 'Circle',
        defaultSize: { width: 16, height: 16 },
        defaultProperties: {
            status: 'success',
            color: '#10B981',
            blinking: false
        },
        propertySchema: [
            { key: 'status', label: 'Status', type: 'select', options: ['success', 'warning', 'error', 'info'], default: 'success', group: 'Content' },
            { key: 'color', label: 'Color', type: 'color', default: '#10B981', group: 'Style' },
            { key: 'blinking', label: 'Blinking', type: 'boolean', default: false, group: 'Behavior' }
        ],
        codeTemplate: 'tft.fillCircle({x}+8, {y}+8, 6, {color});',
        phase: 2
    },

    // Charts
    {
        type: 'line-chart',
        name: 'Line Chart',
        description: 'Time series line chart',
        category: 'data-visualization',
        icon: 'TrendingUp',
        defaultSize: { width: 200, height: 120 },
        defaultProperties: {
            dataPoints: 20,
            color: '#0EA5E9',
            backgroundColor: '#F9FAFB',
            showGrid: true,
            showAxes: true
        },
        propertySchema: [
            { key: 'dataPoints', label: 'Data Points', type: 'number', min: 5, max: 100, default: 20, group: 'Content' },
            { key: 'color', label: 'Line Color', type: 'color', default: '#0EA5E9', group: 'Style' },
            { key: 'backgroundColor', label: 'Background', type: 'color', default: '#F9FAFB', group: 'Style' },
            { key: 'showGrid', label: 'Show Grid', type: 'boolean', default: true, group: 'Style' },
            { key: 'showAxes', label: 'Show Axes', type: 'boolean', default: true, group: 'Style' }
        ],
        codeTemplate: 'drawLineChart({x}, {y}, {width}, {height}, dataArray, {color});',
        phase: 2
    }
];

// All Widgets Combined
export const ALL_WIDGETS = [...PHASE_1_WIDGETS, ...PHASE_2_WIDGETS];

// Helper Functions
export function getWidgetDefinition(type: WidgetType): WidgetDefinition | undefined {
    return ALL_WIDGETS.find(widget => widget.type === type);
}

export function getWidgetsByCategory(category: WidgetCategory): WidgetDefinition[] {
    return ALL_WIDGETS.filter(widget => widget.category === category);
}

export function getWidgetsByPhase(phase: 1 | 2 | 3): WidgetDefinition[] {
    return ALL_WIDGETS.filter(widget => widget.phase === phase);
}