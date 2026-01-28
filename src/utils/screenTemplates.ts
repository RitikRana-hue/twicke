import { Screen, BaseWidget } from '../types';
import { generateId } from './helpers';

export interface ScreenTemplate {
    id: string;
    name: string;
    description: string;
    category: 'startup' | 'main' | 'settings' | 'dashboard' | 'custom';
    preview?: string;
    widgets: (Omit<BaseWidget, 'id'> & { properties: any })[];
}

// Welcome Screen Template with Themes
export const WELCOME_SCREEN_TEMPLATE: ScreenTemplate = {
    id: 'welcome-template',
    name: 'Welcome Screen',
    description: 'Professional welcome screen with logo and branding',
    category: 'startup',
    widgets: [
        // Background container
        {
            type: 'container',
            position: { x: 0, y: 0 },
            size: { width: 480, height: 320 },
            properties: {
                backgroundColor: '#0f172a',
                borderRadius: 0,
                borderWidth: 0
            },
            category: 'containers'
        },
        // Welcome Title
        {
            type: 'label',
            position: { x: 40, y: 40 },
            size: { width: 400, height: 50 },
            properties: {
                text: 'Welcome',
                fontSize: 32,
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
                animation: 'fade-in'
            },
            category: 'text-display'
        },
        // Logo/Brand area - Large centered
        {
            type: 'logo',
            position: { x: 140, y: 100 },
            size: { width: 200, height: 100 },
            properties: {
                src: '',
                alt: 'Your Company Logo',
                fit: 'contain',
                backgroundColor: 'transparent',
                animation: 'zoom-in',
                uploadType: 'url'
            },
            category: 'media'
        },
        // Subtitle/Tagline
        {
            type: 'label',
            position: { x: 40, y: 220 },
            size: { width: 400, height: 30 },
            properties: {
                text: 'Your IoT Solution Partner',
                fontSize: 16,
                color: '#94a3b8',
                textAlign: 'center'
            },
            category: 'text-display'
        },
        // Continue Button
        {
            type: 'nav-button',
            position: { x: 190, y: 270 },
            size: { width: 100, height: 40 },
            properties: {
                text: 'Continue',
                icon: 'Home',
                fontSize: 14,
                color: '#ffffff',
                backgroundColor: '#3b82f6',
                borderRadius: 20,
                targetScreen: 'Main Menu',
                iconSize: 20,
                layout: 'horizontal'
            },
            category: 'navigation'
        }
    ]
};

// Theme Variations for Welcome Screen
export const WELCOME_THEMES = {
    dark: {
        name: 'Dark Professional',
        background: '#0f172a',
        titleColor: '#ffffff',
        subtitleColor: '#94a3b8',
        buttonColor: '#3b82f6'
    },
    light: {
        name: 'Light Clean',
        background: '#ffffff',
        titleColor: '#1f2937',
        subtitleColor: '#6b7280',
        buttonColor: '#059669'
    },
    blue: {
        name: 'Ocean Blue',
        background: '#1e3a8a',
        titleColor: '#ffffff',
        subtitleColor: '#bfdbfe',
        buttonColor: '#f59e0b'
    },
    green: {
        name: 'Nature Green',
        background: '#064e3b',
        titleColor: '#ffffff',
        subtitleColor: '#a7f3d0',
        buttonColor: '#3b82f6'
    },
    purple: {
        name: 'Royal Purple',
        background: '#581c87',
        titleColor: '#ffffff',
        subtitleColor: '#e9d5ff',
        buttonColor: '#f59e0b'
    }
};

// Function to create welcome screen with theme
export function createWelcomeScreenWithTheme(themeName: keyof typeof WELCOME_THEMES, screenName: string = 'Welcome'): ScreenTemplate {
    const theme = WELCOME_THEMES[themeName];
    
    return {
        id: `welcome-${themeName}`,
        name: `${screenName} (${theme.name})`,
        description: `Welcome screen with ${theme.name} theme`,
        category: 'startup',
        widgets: [
            // Background
            {
                type: 'container',
                position: { x: 0, y: 0 },
                size: { width: 480, height: 320 },
                properties: {
                    backgroundColor: theme.background,
                    borderRadius: 0,
                    borderWidth: 0
                },
                category: 'containers'
            },
            // Welcome Title
            {
                type: 'label',
                position: { x: 40, y: 40 },
                size: { width: 400, height: 50 },
                properties: {
                    text: 'Welcome',
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: theme.titleColor,
                    textAlign: 'center'
                },
                category: 'text-display'
            },
            // Logo area with file upload support
            {
                type: 'logo',
                position: { x: 140, y: 100 },
                size: { width: 200, height: 100 },
                properties: {
                    src: '',
                    alt: 'Your Company Logo',
                    fit: 'contain',
                    backgroundColor: 'transparent',
                    animation: 'zoom-in',
                    uploadType: 'url'
                },
                category: 'media'
            },
            // Subtitle
            {
                type: 'label',
                position: { x: 40, y: 220 },
                size: { width: 400, height: 30 },
                properties: {
                    text: 'Your IoT Solution Partner',
                    fontSize: 16,
                    color: theme.subtitleColor,
                    textAlign: 'center'
                },
                category: 'text-display'
            },
            // Continue Button
            {
                type: 'nav-button',
                position: { x: 190, y: 270 },
                size: { width: 100, height: 40 },
                properties: {
                    text: 'Continue',
                    icon: 'Home',
                    fontSize: 14,
                    color: '#ffffff',
                    backgroundColor: theme.buttonColor,
                    borderRadius: 20,
                    targetScreen: 'Main Menu',
                    iconSize: 20,
                    layout: 'horizontal'
                },
                category: 'navigation'
            }
        ]
    };
}

export const STARTUP_SCREEN_TEMPLATE: ScreenTemplate = {
    id: 'startup-template',
    name: 'Startup Screen',
    description: 'Brand logo with navigation buttons',
    category: 'startup',
    widgets: [
        // Background container
        {
            type: 'container',
            position: { x: 0, y: 0 },
            size: { width: 480, height: 320 },
            properties: {
                backgroundColor: '#1f2937',
                borderRadius: 0,
                borderWidth: 0
            },
            category: 'containers'
        },
        // Logo/Brand area
        {
            type: 'logo',
            position: { x: 140, y: 60 },
            size: { width: 200, height: 80 },
            properties: {
                src: '',
                alt: 'Your Brand Logo',
                fit: 'contain',
                backgroundColor: 'transparent',
                animation: 'fade-in'
            },
            category: 'media'
        },
        // Settings Button
        {
            type: 'nav-button',
            position: { x: 50, y: 200 },
            size: { width: 80, height: 80 },
            properties: {
                text: 'Settings',
                icon: 'Settings',
                fontSize: 12,
                color: '#ffffff',
                backgroundColor: '#374151',
                borderRadius: 12,
                targetScreen: 'setting',
                iconSize: 28,
                layout: 'vertical'
            },
            category: 'navigation'
        },
        // WiFi Button
        {
            type: 'nav-button',
            position: { x: 150, y: 200 },
            size: { width: 80, height: 80 },
            properties: {
                text: 'WiFi',
                icon: 'Wifi',
                fontSize: 12,
                color: '#ffffff',
                backgroundColor: '#1e40af',
                borderRadius: 12,
                targetScreen: 'WiFi',
                iconSize: 28,
                layout: 'vertical'
            },
            category: 'navigation'
        },
        // Bluetooth Button
        {
            type: 'nav-button',
            position: { x: 250, y: 200 },
            size: { width: 80, height: 80 },
            properties: {
                text: 'Bluetooth',
                icon: 'Bluetooth',
                fontSize: 12,
                color: '#ffffff',
                backgroundColor: '#1e3a8a',
                borderRadius: 12,
                targetScreen: 'Bluetooth',
                iconSize: 28,
                layout: 'vertical'
            },
            category: 'navigation'
        },
        // Network Button
        {
            type: 'nav-button',
            position: { x: 350, y: 200 },
            size: { width: 80, height: 80 },
            properties: {
                text: 'Network',
                icon: 'Network',
                fontSize: 12,
                color: '#ffffff',
                backgroundColor: '#059669',
                borderRadius: 12,
                targetScreen: 'Network',
                iconSize: 28,
                layout: 'vertical'
            },
            category: 'navigation'
        }
    ]
};

// Settings Screen Template
export const SETTINGS_SCREEN_TEMPLATE: ScreenTemplate = {
    id: 'settings-template',
    name: 'Settings Screen',
    description: 'Configuration options and controls',
    category: 'settings',
    widgets: [
        // Background
        {
            type: 'container',
            position: { x: 0, y: 0 },
            size: { width: 480, height: 320 },
            properties: {
                backgroundColor: '#f9fafb',
                borderRadius: 0,
                borderWidth: 0
            },
            category: 'containers'
        },
        // Header
        {
            type: 'label',
            position: { x: 20, y: 20 },
            size: { width: 200, height: 40 },
            properties: {
                text: 'Settings',
                fontSize: 24,
                fontWeight: 'bold',
                color: '#1f2937',
                textAlign: 'left'
            },
            category: 'text-display'
        },
        // Back Button
        {
            type: 'nav-button',
            position: { x: 400, y: 20 },
            size: { width: 60, height: 40 },
            properties: {
                text: 'Back',
                icon: 'Back',
                fontSize: 10,
                color: '#374151',
                backgroundColor: '#e5e7eb',
                borderRadius: 8,
                targetScreen: 'Main',
                iconSize: 20,
                layout: 'horizontal'
            },
            category: 'navigation'
        },
        // Brightness Control
        {
            type: 'label',
            position: { x: 40, y: 80 },
            size: { width: 100, height: 30 },
            properties: {
                text: 'Brightness',
                fontSize: 14,
                color: '#374151'
            },
            category: 'text-display'
        },
        {
            type: 'slider',
            position: { x: 160, y: 85 },
            size: { width: 200, height: 20 },
            properties: {
                value: 75,
                min: 0,
                max: 100,
                color: '#0ea5e9',
                backgroundColor: '#e5e7eb'
            },
            category: 'input-control'
        },
        // Volume Control
        {
            type: 'label',
            position: { x: 40, y: 130 },
            size: { width: 100, height: 30 },
            properties: {
                text: 'Volume',
                fontSize: 14,
                color: '#374151'
            },
            category: 'text-display'
        },
        {
            type: 'slider',
            position: { x: 160, y: 135 },
            size: { width: 200, height: 20 },
            properties: {
                value: 50,
                min: 0,
                max: 100,
                color: '#10b981',
                backgroundColor: '#e5e7eb'
            },
            category: 'input-control'
        },
        // Auto Sleep Toggle
        {
            type: 'label',
            position: { x: 40, y: 180 },
            size: { width: 120, height: 30 },
            properties: {
                text: 'Auto Sleep',
                fontSize: 14,
                color: '#374151'
            },
            category: 'text-display'
        },
        {
            type: 'switch',
            position: { x: 180, y: 185 },
            size: { width: 60, height: 30 },
            properties: {
                value: true,
                color: '#0ea5e9',
                backgroundColor: '#e5e7eb'
            },
            category: 'input-control'
        }
    ]
};

// WiFi Settings Screen Template
export const WIFI_SCREEN_TEMPLATE: ScreenTemplate = {
    id: 'wifi-template',
    name: 'WiFi Settings',
    description: 'WiFi connection and network management',
    category: 'settings',
    widgets: [
        // Background
        {
            type: 'container',
            position: { x: 0, y: 0 },
            size: { width: 480, height: 320 },
            properties: {
                backgroundColor: '#f0f9ff',
                borderRadius: 0,
                borderWidth: 0
            },
            category: 'containers'
        },
        // Header
        {
            type: 'label',
            position: { x: 20, y: 20 },
            size: { width: 200, height: 40 },
            properties: {
                text: 'WiFi Settings',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#1e40af',
                textAlign: 'left'
            },
            category: 'text-display'
        },
        // Back Button
        {
            type: 'nav-button',
            position: { x: 400, y: 20 },
            size: { width: 60, height: 40 },
            properties: {
                text: 'Back',
                icon: 'Back',
                fontSize: 10,
                color: '#374151',
                backgroundColor: '#e5e7eb',
                borderRadius: 8,
                targetScreen: 'Main',
                iconSize: 20,
                layout: 'horizontal'
            },
            category: 'navigation'
        },
        // WiFi Status
        {
            type: 'status-led',
            position: { x: 40, y: 80 },
            size: { width: 16, height: 16 },
            properties: {
                status: 'success',
                color: '#10b981'
            },
            category: 'status-feedback'
        },
        {
            type: 'label',
            position: { x: 70, y: 75 },
            size: { width: 200, height: 25 },
            properties: {
                text: 'Connected to: MyNetwork',
                fontSize: 14,
                color: '#374151'
            },
            category: 'text-display'
        },
        // Signal Strength
        {
            type: 'label',
            position: { x: 40, y: 110 },
            size: { width: 100, height: 25 },
            properties: {
                text: 'Signal Strength',
                fontSize: 12,
                color: '#6b7280'
            },
            category: 'text-display'
        },
        {
            type: 'linear-gauge',
            position: { x: 160, y: 110 },
            size: { width: 150, height: 20 },
            properties: {
                value: 85,
                min: 0,
                max: 100,
                color: '#10b981',
                backgroundColor: '#e5e7eb',
                showValue: false,
                borderRadius: 10
            },
            category: 'data-visualization'
        },
        // WiFi Toggle
        {
            type: 'label',
            position: { x: 40, y: 150 },
            size: { width: 100, height: 30 },
            properties: {
                text: 'WiFi Enabled',
                fontSize: 14,
                color: '#374151'
            },
            category: 'text-display'
        },
        {
            type: 'switch',
            position: { x: 160, y: 155 },
            size: { width: 60, height: 30 },
            properties: {
                value: true,
                color: '#1e40af',
                backgroundColor: '#e5e7eb'
            },
            category: 'input-control'
        }
    ]
};

// Bluetooth Settings Screen Template
export const BLUETOOTH_SCREEN_TEMPLATE: ScreenTemplate = {
    id: 'bluetooth-template',
    name: 'Bluetooth Settings',
    description: 'Bluetooth device management and pairing',
    category: 'settings',
    widgets: [
        // Background
        {
            type: 'container',
            position: { x: 0, y: 0 },
            size: { width: 480, height: 320 },
            properties: {
                backgroundColor: '#eff6ff',
                borderRadius: 0,
                borderWidth: 0
            },
            category: 'containers'
        },
        // Header
        {
            type: 'label',
            position: { x: 20, y: 20 },
            size: { width: 200, height: 40 },
            properties: {
                text: '🔵 Bluetooth',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#1e3a8a',
                textAlign: 'left'
            },
            category: 'text-display'
        },
        // Back Button
        {
            type: 'nav-button',
            position: { x: 400, y: 20 },
            size: { width: 60, height: 40 },
            properties: {
                text: 'Back',
                icon: 'Back',
                fontSize: 10,
                color: '#374151',
                backgroundColor: '#e5e7eb',
                borderRadius: 8,
                targetScreen: 'Main Screen',
                iconSize: 20,
                layout: 'horizontal'
            },
            category: 'navigation'
        },
        // Bluetooth Status
        {
            type: 'status-led',
            position: { x: 40, y: 80 },
            size: { width: 16, height: 16 },
            properties: {
                status: 'success',
                color: '#3b82f6'
            },
            category: 'status-feedback'
        },
        {
            type: 'label',
            position: { x: 70, y: 75 },
            size: { width: 200, height: 25 },
            properties: {
                text: 'Bluetooth Enabled',
                fontSize: 14,
                color: '#374151'
            },
            category: 'text-display'
        },
        // Bluetooth Toggle
        {
            type: 'label',
            position: { x: 40, y: 110 },
            size: { width: 120, height: 30 },
            properties: {
                text: 'Enable Bluetooth',
                fontSize: 14,
                color: '#374151'
            },
            category: 'text-display'
        },
        {
            type: 'switch',
            position: { x: 180, y: 115 },
            size: { width: 60, height: 30 },
            properties: {
                value: true,
                color: '#3b82f6',
                backgroundColor: '#e5e7eb'
            },
            category: 'input-control'
        },
        // Discoverable Toggle
        {
            type: 'label',
            position: { x: 40, y: 150 },
            size: { width: 120, height: 30 },
            properties: {
                text: 'Discoverable',
                fontSize: 14,
                color: '#374151'
            },
            category: 'text-display'
        },
        {
            type: 'switch',
            position: { x: 180, y: 155 },
            size: { width: 60, height: 30 },
            properties: {
                value: false,
                color: '#3b82f6',
                backgroundColor: '#e5e7eb'
            },
            category: 'input-control'
        },
        // Device List Header
        {
            type: 'label',
            position: { x: 40, y: 190 },
            size: { width: 150, height: 25 },
            properties: {
                text: 'Paired Devices:',
                fontSize: 12,
                fontWeight: 'bold',
                color: '#6b7280'
            },
            category: 'text-display'
        },
        // Device 1
        {
            type: 'container',
            position: { x: 40, y: 220 },
            size: { width: 200, height: 35 },
            properties: {
                backgroundColor: '#ffffff',
                borderRadius: 6,
                borderWidth: 1,
                borderColor: '#d1d5db'
            },
            category: 'containers'
        },
        {
            type: 'label',
            position: { x: 50, y: 230 },
            size: { width: 120, height: 20 },
            properties: {
                text: '📱 iPhone 12',
                fontSize: 12,
                color: '#374151'
            },
            category: 'text-display'
        },
        {
            type: 'status-led',
            position: { x: 210, y: 235 },
            size: { width: 12, height: 12 },
            properties: {
                status: 'success',
                color: '#10b981'
            },
            category: 'status-feedback'
        },
        // Device 2
        {
            type: 'container',
            position: { x: 40, y: 265 },
            size: { width: 200, height: 35 },
            properties: {
                backgroundColor: '#ffffff',
                borderRadius: 6,
                borderWidth: 1,
                borderColor: '#d1d5db'
            },
            category: 'containers'
        },
        {
            type: 'label',
            position: { x: 50, y: 275 },
            size: { width: 120, height: 20 },
            properties: {
                text: '🎧 AirPods Pro',
                fontSize: 12,
                color: '#374151'
            },
            category: 'text-display'
        },
        {
            type: 'status-led',
            position: { x: 210, y: 280 },
            size: { width: 12, height: 12 },
            properties: {
                status: 'error',
                color: '#ef4444'
            },
            category: 'status-feedback'
        },
        // Scan Button
        {
            type: 'button',
            position: { x: 280, y: 220 },
            size: { width: 80, height: 35 },
            properties: {
                text: 'Scan',
                fontSize: 12,
                color: '#ffffff',
                backgroundColor: '#3b82f6',
                borderRadius: 6
            },
            category: 'input-control'
        },
        // Pair New Button
        {
            type: 'button',
            position: { x: 280, y: 265 },
            size: { width: 80, height: 35 },
            properties: {
                text: 'Pair New',
                fontSize: 12,
                color: '#ffffff',
                backgroundColor: '#059669',
                borderRadius: 6
            },
            category: 'input-control'
        }
    ]
};

// Network Settings Screen Template
export const NETWORK_SCREEN_TEMPLATE: ScreenTemplate = {
    id: 'network-template',
    name: 'Network Settings',
    description: 'Network configuration and status',
    category: 'settings',
    widgets: [
        // Background
        {
            type: 'container',
            position: { x: 0, y: 0 },
            size: { width: 480, height: 320 },
            properties: {
                backgroundColor: '#f0fdf4',
                borderRadius: 0,
                borderWidth: 0
            },
            category: 'containers'
        },
        // Header
        {
            type: 'label',
            position: { x: 20, y: 20 },
            size: { width: 200, height: 40 },
            properties: {
                text: '🌐 Network',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#059669',
                textAlign: 'left'
            },
            category: 'text-display'
        },
        // Back Button
        {
            type: 'nav-button',
            position: { x: 400, y: 20 },
            size: { width: 60, height: 40 },
            properties: {
                text: 'Back',
                icon: 'Back',
                fontSize: 10,
                color: '#374151',
                backgroundColor: '#e5e7eb',
                borderRadius: 8,
                targetScreen: 'Main Screen',
                iconSize: 20,
                layout: 'horizontal'
            },
            category: 'navigation'
        },
        // Connection Status
        {
            type: 'status-led',
            position: { x: 40, y: 80 },
            size: { width: 16, height: 16 },
            properties: {
                status: 'success',
                color: '#10b981'
            },
            category: 'status-feedback'
        },
        {
            type: 'label',
            position: { x: 70, y: 75 },
            size: { width: 200, height: 25 },
            properties: {
                text: 'Connected to Internet',
                fontSize: 14,
                color: '#374151'
            },
            category: 'text-display'
        },
        // IP Address
        {
            type: 'label',
            position: { x: 40, y: 110 },
            size: { width: 80, height: 25 },
            properties: {
                text: 'IP Address:',
                fontSize: 12,
                color: '#6b7280'
            },
            category: 'text-display'
        },
        {
            type: 'label',
            position: { x: 130, y: 110 },
            size: { width: 120, height: 25 },
            properties: {
                text: '192.168.1.100',
                fontSize: 12,
                fontWeight: 'bold',
                color: '#374151'
            },
            category: 'text-display'
        },
        // MAC Address
        {
            type: 'label',
            position: { x: 40, y: 135 },
            size: { width: 80, height: 25 },
            properties: {
                text: 'MAC Address:',
                fontSize: 12,
                color: '#6b7280'
            },
            category: 'text-display'
        },
        {
            type: 'label',
            position: { x: 130, y: 135 },
            size: { width: 150, height: 25 },
            properties: {
                text: 'AA:BB:CC:DD:EE:FF',
                fontSize: 12,
                fontWeight: 'bold',
                color: '#374151'
            },
            category: 'text-display'
        },
        // Gateway
        {
            type: 'label',
            position: { x: 40, y: 160 },
            size: { width: 80, height: 25 },
            properties: {
                text: 'Gateway:',
                fontSize: 12,
                color: '#6b7280'
            },
            category: 'text-display'
        },
        {
            type: 'label',
            position: { x: 130, y: 160 },
            size: { width: 120, height: 25 },
            properties: {
                text: '192.168.1.1',
                fontSize: 12,
                fontWeight: 'bold',
                color: '#374151'
            },
            category: 'text-display'
        },
        // DNS
        {
            type: 'label',
            position: { x: 40, y: 185 },
            size: { width: 80, height: 25 },
            properties: {
                text: 'DNS Server:',
                fontSize: 12,
                color: '#6b7280'
            },
            category: 'text-display'
        },
        {
            type: 'label',
            position: { x: 130, y: 185 },
            size: { width: 120, height: 25 },
            properties: {
                text: '8.8.8.8',
                fontSize: 12,
                fontWeight: 'bold',
                color: '#374151'
            },
            category: 'text-display'
        },
        // Network Speed Test
        {
            type: 'label',
            position: { x: 40, y: 220 },
            size: { width: 100, height: 25 },
            properties: {
                text: 'Connection Speed:',
                fontSize: 12,
                color: '#6b7280'
            },
            category: 'text-display'
        },
        {
            type: 'linear-gauge',
            position: { x: 150, y: 220 },
            size: { width: 120, height: 20 },
            properties: {
                value: 75,
                min: 0,
                max: 100,
                color: '#10b981',
                backgroundColor: '#e5e7eb',
                showValue: false,
                borderRadius: 10
            },
            category: 'data-visualization'
        },
        {
            type: 'label',
            position: { x: 280, y: 220 },
            size: { width: 60, height: 25 },
            properties: {
                text: '75 Mbps',
                fontSize: 11,
                color: '#374151'
            },
            category: 'text-display'
        },
        // Action Buttons
        {
            type: 'button',
            position: { x: 40, y: 260 },
            size: { width: 80, height: 35 },
            properties: {
                text: 'Reconnect',
                fontSize: 11,
                color: '#ffffff',
                backgroundColor: '#059669',
                borderRadius: 6
            },
            category: 'input-control'
        },
        {
            type: 'button',
            position: { x: 130, y: 260 },
            size: { width: 80, height: 35 },
            properties: {
                text: 'Speed Test',
                fontSize: 11,
                color: '#ffffff',
                backgroundColor: '#0ea5e9',
                borderRadius: 6
            },
            category: 'input-control'
        },
        {
            type: 'button',
            position: { x: 220, y: 260 },
            size: { width: 80, height: 35 },
            properties: {
                text: 'Reset',
                fontSize: 11,
                color: '#ffffff',
                backgroundColor: '#ef4444',
                borderRadius: 6
            },
            category: 'input-control'
        }
    ]
};

// Helper function to create a screen from template
export function createScreenFromTemplate(template: ScreenTemplate, screenName?: string): Screen {
    console.log('🏗️ Creating screen from template:', template.name);
    console.log('📋 Template has', template.widgets.length, 'widgets');
    
    const newScreen = {
        id: generateId(),
        name: screenName || template.name,
        widgets: template.widgets.map(widget => {
            const newWidget = {
                ...widget,
                id: generateId()
            };
            console.log('🔧 Created widget:', newWidget.type, 'at', newWidget.position);
            return newWidget;
        }),
        backgroundColor: '#000000'
    };
    
    console.log('✅ Screen created:', newScreen.name, 'with', newScreen.widgets.length, 'widgets');
    return newScreen;
}
export const ALL_TEMPLATES = [
    WELCOME_SCREEN_TEMPLATE,
    createWelcomeScreenWithTheme('dark', 'Welcome'),
    createWelcomeScreenWithTheme('light', 'Welcome'),
    createWelcomeScreenWithTheme('blue', 'Welcome'),
    createWelcomeScreenWithTheme('green', 'Welcome'),
    createWelcomeScreenWithTheme('purple', 'Welcome'),
    STARTUP_SCREEN_TEMPLATE,
    SETTINGS_SCREEN_TEMPLATE,
    WIFI_SCREEN_TEMPLATE
];