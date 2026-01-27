// Base Widget Architecture - Smart Implementation
export interface BaseWidget {
    id: string;
    type: WidgetType;
    position: Position;
    size: Size;
    properties: BaseWidgetProperties;
    events?: WidgetEvent[];
    conditions?: WidgetCondition[];
    dataBinding?: DataBinding;
    category: WidgetCategory;
    zIndex?: number; // Layer order - higher values appear in front
}

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

// Widget Categories for Organization
export type WidgetCategory =
    | 'text-display'
    | 'input-control'
    | 'data-visualization'
    | 'media'
    | 'containers'
    | 'navigation'
    | 'status-feedback'
    | 'iot-system'
    | 'logic-invisible';

// Expanded Widget Types - Phase 1 MVP + Phase 2 Power
export type WidgetType =
    // Phase 1 - Foundation (MUST HAVE)
    | 'label' | 'dynamic-label' | 'heading' | 'rich-text'
    | 'button' | 'icon-button' | 'floating-button'
    | 'switch' | 'checkbox' | 'radio-group'
    | 'slider' | 'vertical-slider' | 'knob'
    | 'text-input' | 'numeric-stepper'
    | 'circular-gauge' | 'linear-gauge' | 'progress-bar'
    | 'image' | 'icon' | 'svg-icon' | 'logo' | 'video'
    | 'container' | 'card' | 'panel'
    | 'line-chart' | 'bar-chart' | 'pie-chart'
    | 'nav-button'

    // Phase 2 - Power Features
    | 'tab-container' | 'accordion' | 'modal'
    | 'dropdown' | 'date-picker' | 'time-picker'
    | 'status-led' | 'battery-indicator' | 'signal-indicator'
    | 'device-info' | 'connection-status' | 'clock'
    | 'notification' | 'alert-box' | 'loading-spinner'

    // Logic Elements (Invisible)
    | 'variable' | 'timer' | 'counter' | 'condition-block';

// Base Properties - All widgets inherit these
export interface BaseWidgetProperties {
    // Visual
    visible?: boolean;
    enabled?: boolean;
    opacity?: number;

    // Styling
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    shadow?: boolean;

    // Layout
    margin?: Spacing;
    padding?: Spacing;

    // Animation
    animationType?: 'none' | 'fade' | 'slide' | 'bounce';
    animationDuration?: number;
}

export interface Spacing {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

// Specialized Widget Properties
export interface TextWidgetProperties extends BaseWidgetProperties {
    text?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    fontFamily?: string;
    color?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    lineHeight?: number;
    letterSpacing?: number;
    textDecoration?: 'none' | 'underline' | 'line-through';
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

export interface InputWidgetProperties extends BaseWidgetProperties {
    value?: any;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
    readonly?: boolean;
    validation?: ValidationRule[];
}

export interface DisplayWidgetProperties extends BaseWidgetProperties {
    value?: number;
    min?: number;
    max?: number;
    units?: string;
    precision?: number;
    format?: string;
    thresholds?: Threshold[];
    colorScheme?: ColorScheme;
}

export interface ContainerWidgetProperties extends BaseWidgetProperties {
    layout?: 'flex' | 'grid' | 'absolute';
    direction?: 'row' | 'column';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    gap?: number;
    scrollable?: boolean;
    maxHeight?: number;
}

export interface MediaWidgetProperties extends BaseWidgetProperties {
    src?: string;
    alt?: string;
    fit?: 'contain' | 'cover' | 'fill' | 'scale-down';
    quality?: 'low' | 'medium' | 'high';
}

// Supporting Types
export interface ValidationRule {
    type: 'required' | 'min' | 'max' | 'pattern' | 'email' | 'url';
    value?: any;
    message?: string;
}

export interface Threshold {
    value: number;
    color: string;
    label?: string;
}

export interface ColorScheme {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
}

// Widget Events and Actions (Enhanced)
export interface WidgetEvent {
    id: string;
    trigger: EventTrigger;
    actions: EventAction[];
    condition?: string; // JavaScript expression
}

export type EventTrigger =
    | 'onClick' | 'onDoubleClick' | 'onLongPress'
    | 'onToggle' | 'onChange' | 'onInput'
    | 'onFocus' | 'onBlur'
    | 'onMouseEnter' | 'onMouseLeave'
    | 'onValueChange' | 'onThresholdCross'
    | 'onTimer' | 'onLoad';

export interface EventAction {
    type: ActionType;
    targetWidgetId?: string;
    targetScreen?: string;
    value?: any;
    property?: string;
    animation?: AnimationConfig;
    delay?: number;
}

export type ActionType =
    | 'navigateToScreen' | 'showModal' | 'closeModal'
    | 'setValue' | 'resetValue' | 'incrementValue' | 'decrementValue'
    | 'showWidget' | 'hideWidget' | 'toggleWidget'
    | 'setProperty' | 'addClass' | 'removeClass'
    | 'playAnimation' | 'stopAnimation'
    | 'sendNotification' | 'playSound'
    | 'callFunction' | 'executeCode';

export interface AnimationConfig {
    type: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';
    duration: number;
    easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    direction?: 'up' | 'down' | 'left' | 'right';
}

// Data Binding (Enhanced)
export interface DataBinding {
    type: 'static' | 'variable' | 'virtualPin' | 'api' | 'mqtt' | 'websocket';
    source?: string;
    virtualPin?: string;
    apiEndpoint?: string;
    mqttTopic?: string;
    units?: string;
    format?: string;
    updateInterval?: number;
    transform?: string; // JavaScript expression
}

// Widget Conditions (Enhanced)
export interface WidgetCondition {
    id: string;
    name?: string;
    condition: Condition;
    actions: EventAction[];
    enabled?: boolean;
}

export interface Condition {
    type: 'value' | 'comparison' | 'state' | 'time' | 'custom';
    operator: '>' | '<' | '==' | '!=' | '>=' | '<=' | 'contains' | 'startsWith' | 'endsWith';
    value: any;
    property?: string;
    expression?: string; // For custom conditions
}