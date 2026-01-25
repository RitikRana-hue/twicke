import { Widget, DeviceConfig, Screen } from '../types';

export function generateEmbeddedCode(screens: Screen[], device: DeviceConfig): string {
    const includes = `
#include <TFT_eSPI.h>
#include <SPI.h>

TFT_eSPI tft = TFT_eSPI();
`;

    const variables = `
// Screen management
int currentScreen = 0;
int totalScreens = ${screens.length};
`;

    const setup = `
void setup() {
    Serial.begin(115200);
    tft.init();
    tft.setRotation(1);
    tft.fillScreen(TFT_BLACK);
    
    // Initialize UI
    drawUI();
}
`;

    const loop = `
void loop() {
    // Handle touch input and screen navigation
    // Add your touch handling code here
    delay(50);
}
`;

    const drawUI = `
void drawUI() {
    drawScreen(currentScreen);
}

void drawScreen(int screenId) {
    switch(screenId) {
${screens.map((screen, index) => `        case ${index}:
            drawScreen${index}();
            break;`).join('\n')}
        default:
            drawScreen0();
            break;
    }
}

${screens.map((screen, index) => `
void drawScreen${index}() {
    // Screen: ${screen.name}
    tft.fillScreen(${hexToRgb565(screen.backgroundColor || '#000000')});
    
${screen.widgets.map(widget => generateWidgetCode(widget)).join('\n')}
}`).join('\n')}

void nextScreen() {
    currentScreen = (currentScreen + 1) % totalScreens;
    drawUI();
}

void previousScreen() {
    currentScreen = (currentScreen - 1 + totalScreens) % totalScreens;
    drawUI();
}
`;

    return includes + variables + setup + loop + drawUI + helperFunctions;
}

function generateWidgetCode(widget: Widget): string {
    const { type, position, size, properties } = widget;

    switch (type) {
        case 'label':
            return `    // Label Widget - ${widget.id}
    tft.setTextColor(${hexToRgb565(properties.color || '#FFFFFF')});
    tft.setTextSize(${Math.round((properties.fontSize || 14) / 8)});
    tft.setCursor(${position.x}, ${position.y});
    tft.print("${properties.text || 'Label'}");`;

        case 'dynamic-label':
            return `    // Dynamic Label Widget - ${widget.id}
    tft.setTextColor(${hexToRgb565(properties.color || '#0EA5E9')});
    tft.setTextSize(${Math.round((properties.fontSize || 14) / 8)});
    tft.setCursor(${position.x}, ${position.y});
    // Replace with your data source
    float sensorValue = 23.5; // Example: temperature sensor
    tft.print(String(sensorValue, ${properties.precision || 1}) + "${properties.units || ''}");`;

        case 'button':
            return `    // Button Widget - ${widget.id}
    tft.fillRoundRect(${position.x}, ${position.y}, ${size.width}, ${size.height}, ${properties.borderRadius || 0}, ${hexToRgb565(properties.backgroundColor || '#0EA5E9')});
    tft.setTextColor(${hexToRgb565(properties.color || '#FFFFFF')});
    tft.setTextSize(${Math.round((properties.fontSize || 14) / 8)});
    tft.setCursor(${position.x + 10}, ${position.y + size.height / 2 - 8});
    tft.print("${properties.text || 'Button'}");
    // Add touch detection: if (touch.x >= ${position.x} && touch.x <= ${position.x + size.width} && touch.y >= ${position.y} && touch.y <= ${position.y + size.height}) { /* button pressed */ }`;

        case 'switch':
            return `    // Switch Widget - ${widget.id}
    bool switchState = ${properties.value ? 'true' : 'false'}; // Connect to your variable
    drawSwitch(${position.x}, ${position.y}, ${size.width}, ${size.height}, switchState, ${hexToRgb565(properties.color || '#0EA5E9')}, ${hexToRgb565(properties.backgroundColor || '#E5E7EB')});`;

        case 'checkbox':
            return `    // Checkbox Widget - ${widget.id}
    bool checkboxState = ${properties.checked ? 'true' : 'false'}; // Connect to your variable
    drawCheckbox(${position.x}, ${position.y}, 16, checkboxState, ${hexToRgb565(properties.color || '#0EA5E9')});`;

        case 'slider':
            return `    // Slider Widget - ${widget.id}
    int sliderValue = ${properties.value || 50}; // Connect to your variable
    drawSlider(${position.x}, ${position.y}, ${size.width}, ${size.height}, sliderValue, ${properties.min || 0}, ${properties.max || 100}, ${hexToRgb565(properties.color || '#0EA5E9')});`;

        case 'circular-gauge':
        case 'gauge': // Legacy support
            return `    // Circular Gauge Widget - ${widget.id}
    int gaugeValue = ${properties.value || 50}; // Connect to your sensor data
    drawCircularGauge(${position.x}, ${position.y}, ${Math.min(size.width, size.height)}, gaugeValue, ${properties.min || 0}, ${properties.max || 100}, ${hexToRgb565(properties.color || '#0EA5E9')});
    ${properties.showValue ? `
    // Show value text
    tft.setTextColor(${hexToRgb565(properties.color || '#0EA5E9')});
    tft.setTextSize(1);
    tft.setCursor(${position.x + size.width / 2 - 15}, ${position.y + size.height / 2});
    tft.print(String(gaugeValue) + "${properties.units || ''}");` : ''}`;

        case 'linear-gauge':
            return `    // Linear Gauge Widget - ${widget.id}
    int linearValue = ${properties.value || 75}; // Connect to your sensor data
    drawLinearGauge(${position.x}, ${position.y}, ${size.width}, ${size.height}, linearValue, ${properties.min || 0}, ${properties.max || 100}, ${hexToRgb565(properties.color || '#10B981')});`;

        case 'status-led':
            return `    // Status LED Widget - ${widget.id}
    bool ledStatus = true; // Connect to your status variable
    if (ledStatus) {
        tft.fillCircle(${position.x + 8}, ${position.y + 8}, 6, ${hexToRgb565(properties.color || '#10B981')});
    } else {
        tft.drawCircle(${position.x + 8}, ${position.y + 8}, 6, TFT_DARKGREY);
    }`;

        case 'container':
            return `    // Container Widget - ${widget.id}
    tft.fillRoundRect(${position.x}, ${position.y}, ${size.width}, ${size.height}, ${properties.borderRadius || 0}, ${hexToRgb565(properties.backgroundColor || '#FFFFFF')});
    tft.drawRoundRect(${position.x}, ${position.y}, ${size.width}, ${size.height}, ${properties.borderRadius || 0}, ${hexToRgb565(properties.borderColor || '#E5E7EB')});`;

        case 'image':
            return `    // Image Widget - ${widget.id}
    // Note: Image display requires SPIFFS or SD card storage
    // tft.drawBitmap(${position.x}, ${position.y}, imageData, ${size.width}, ${size.height}, TFT_WHITE);
    // For now, draw a placeholder
    tft.drawRect(${position.x}, ${position.y}, ${size.width}, ${size.height}, TFT_LIGHTGREY);
    tft.setCursor(${position.x + 5}, ${position.y + size.height / 2});
    tft.setTextColor(TFT_DARKGREY);
    tft.print("IMG");`;

        default:
            return `    // Unknown widget type: ${type} - ${widget.id}`;
    }
}

const helperFunctions = `

// Helper Functions for Widgets
void drawSwitch(int x, int y, int w, int h, bool state, uint16_t activeColor, uint16_t bgColor) {
    tft.fillRoundRect(x, y, w, h, h/2, bgColor);
    int circleX = state ? (x + w - h/2) : (x + h/2);
    tft.fillCircle(circleX, y + h/2, h/2 - 2, state ? activeColor : TFT_WHITE);
}

void drawCheckbox(int x, int y, int size, bool checked, uint16_t color) {
    tft.drawRect(x, y, size, size, TFT_DARKGREY);
    if (checked) {
        tft.fillRect(x + 2, y + 2, size - 4, size - 4, color);
    }
}

void drawSlider(int x, int y, int w, int h, int value, int minVal, int maxVal, uint16_t color) {
    // Draw track
    tft.fillRect(x, y + h/2 - 2, w, 4, TFT_LIGHTGREY);
    
    // Calculate position
    int pos = map(value, minVal, maxVal, 0, w - 10);
    
    // Draw fill
    tft.fillRect(x, y + h/2 - 2, pos, 4, color);
    
    // Draw handle
    tft.fillCircle(x + pos + 5, y + h/2, 8, color);
}

void drawCircularGauge(int x, int y, int diameter, int value, int minVal, int maxVal, uint16_t color) {
    int centerX = x + diameter/2;
    int centerY = y + diameter/2;
    int radius = diameter/2 - 10;
    
    // Draw background circle
    tft.drawCircle(centerX, centerY, radius, TFT_DARKGREY);
    
    // Calculate angle (270 degrees total, starting from -135 degrees)
    int angle = map(value, minVal, maxVal, -135, 135);
    
    // Draw arc (simplified - draw lines from center)
    for (int i = -135; i <= angle; i += 5) {
        float radian = i * PI / 180;
        int x1 = centerX + (radius - 5) * cos(radian);
        int y1 = centerY + (radius - 5) * sin(radian);
        int x2 = centerX + radius * cos(radian);
        int y2 = centerY + radius * sin(radian);
        tft.drawLine(x1, y1, x2, y2, color);
    }
}

void drawLinearGauge(int x, int y, int w, int h, int value, int minVal, int maxVal, uint16_t color) {
    // Draw background
    tft.fillRect(x, y, w, h, TFT_DARKGREY);
    
    // Calculate fill width
    int fillWidth = map(value, minVal, maxVal, 0, w);
    
    // Draw fill
    tft.fillRect(x, y, fillWidth, h, color);
    
    // Draw border
    tft.drawRect(x, y, w, h, TFT_WHITE);
}
`;

function hexToRgb565(hex: string): string {
    // Convert hex color to RGB565 format for TFT displays
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const rgb565 = ((r & 0xF8) << 8) | ((g & 0xFC) << 3) | (b >> 3);
    return `0x${rgb565.toString(16).toUpperCase().padStart(4, '0')}`;
}

export function generateProjectFiles(screens: Screen[], device: DeviceConfig, projectName: string) {
    const mainCode = generateEmbeddedCode(screens, device);

    const totalWidgets = screens.reduce((total, screen) => total + screen.widgets.length, 0);

    const readme = `# ${projectName}

Generated IoT GUI for ${device.name}

## 🚀 Quick Start Guide

### Hardware Requirements
- **ESP32-S3** development board
- **TFT Display** (${device.width}x${device.height}px) - ILI9341 or similar
- **Touch Controller** (optional) - XPT2046 or FT6236
- **MicroSD Card** (optional for images)

### Software Requirements
- **Arduino IDE** 1.8.19 or newer
- **TFT_eSPI Library** v2.5.0 or newer

## 📋 Installation Steps

### 1. Install TFT_eSPI Library
\`\`\`
Arduino IDE → Tools → Manage Libraries → Search "TFT_eSPI" → Install
\`\`\`

### 2. Configure Display (IMPORTANT!)
Edit the TFT_eSPI library configuration:
\`\`\`
Arduino/libraries/TFT_eSPI/User_Setup.h
\`\`\`

Add these lines for ESP32-S3:
\`\`\`cpp
#define ILI9341_DRIVER
#define TFT_MISO 19
#define TFT_MOSI 23
#define TFT_SCLK 18
#define TFT_CS   15
#define TFT_DC    2
#define TFT_RST   4
\`\`\`

### 3. Upload Code
1. Open \`main.ino\` in Arduino IDE
2. Select **ESP32S3 Dev Module** as board
3. Connect your ESP32-S3 via USB
4. Click Upload

### 4. Connect Your Data Sources
Replace the example sensor values in the code with your actual data:
\`\`\`cpp
// Replace this:
float sensorValue = 23.5;

// With your sensor reading:
float sensorValue = dht.readTemperature();
\`\`\`

## 📊 Project Structure
- **Screens**: ${screens.length}
- **Total Widgets**: ${totalWidgets}
- **Display Resolution**: ${device.width}x${device.height}px

## 📱 Screens Overview
${screens.map((screen, index) => `### Screen ${index + 1}: ${screen.name}
- Widgets: ${screen.widgets.length}
- Background: ${screen.backgroundColor || '#000000'}
- Widget Types: ${[...new Set(screen.widgets.map(w => w.type))].join(', ')}`).join('\n\n')}

## 🔧 Customization

### Adding Touch Support
To make buttons interactive, add touch detection in the main loop:
\`\`\`cpp
#include <XPT2046_Touchscreen.h>
XPT2046_Touchscreen ts(CS_PIN);

void loop() {
    if (ts.touched()) {
        TS_Point p = ts.getPoint();
        // Check if touch is within button bounds
        // See button comments in generated code
    }
}
\`\`\`

### Connecting Sensors
Replace static values with sensor readings:
\`\`\`cpp
#include <DHT.h>
DHT dht(DHT_PIN, DHT22);

void setup() {
    dht.begin();
    // ... existing setup code
}

// In your draw functions, replace static values:
float temperature = dht.readTemperature();
float humidity = dht.readHumidity();
\`\`\`

## 🌐 IoT Integration

### WiFi Connection
\`\`\`cpp
#include <WiFi.h>

void setup() {
    WiFi.begin("your_ssid", "your_password");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
    }
}
\`\`\`

### MQTT Integration
\`\`\`cpp
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
    // Update widget values based on MQTT messages
}
\`\`\`

## 🎨 Widget Types Used
${[...new Set(screens.flatMap(s => s.widgets.map(w => w.type)))].map(type => `- **${type}**: Interactive ${type} widget`).join('\n')}

## 📞 Support
- Check TFT_eSPI library documentation for display issues
- Verify pin connections match your hardware
- Use Serial Monitor for debugging

---
**Generated by IoT GUI Builder** - ${new Date().toLocaleDateString()}
*Deploy this UI to your ESP32-S3 and start monitoring your IoT data!*
`;

    const platformio = `; PlatformIO Project Configuration File
; Generated by IoT GUI Builder

[env:esp32-s3-devkitc-1]
platform = espressif32
board = esp32-s3-devkitc-1
framework = arduino

; Library dependencies
lib_deps = 
    bodmer/TFT_eSPI@^2.5.0
    adafruit/DHT sensor library@^1.4.4
    knolleary/PubSubClient@^2.8
    paulstoffregen/XPT2046_Touchscreen@^1.4

; Serial monitor settings
monitor_speed = 115200
monitor_filters = esp32_exception_decoder

; Build settings
build_flags = 
    -DCORE_DEBUG_LEVEL=3
    -DBOARD_HAS_PSRAM

; Upload settings
upload_speed = 921600
`;

    const touchExample = `// Touch Integration Example
// Add this to your main.ino for touch support

#include <XPT2046_Touchscreen.h>

#define CS_PIN  21
XPT2046_Touchscreen ts(CS_PIN);

void setup() {
    // ... existing setup code ...
    ts.begin();
    ts.setRotation(1);
}

void loop() {
    if (ts.touched()) {
        TS_Point p = ts.getPoint();
        
        // Convert touch coordinates to screen coordinates
        int touchX = map(p.x, 200, 3700, 0, ${device.width});
        int touchY = map(p.y, 240, 3800, 0, ${device.height});
        
        // Check button touches (example)
        ${screens.flatMap(screen =>
        screen.widgets
            .filter(w => w.type === 'button')
            .map(w => `
        // Button: ${w.properties.text || 'Button'}
        if (touchX >= ${w.position.x} && touchX <= ${w.position.x + w.size.width} && 
            touchY >= ${w.position.y} && touchY <= ${w.position.y + w.size.height}) {
            // Button pressed - add your action here
            Serial.println("Button pressed: ${w.properties.text || 'Button'}");
        }`)
    ).join('')}
        
        delay(200); // Debounce
    }
    
    delay(50);
}`;

    return {
        'main.ino': mainCode,
        'README.md': readme,
        'platformio.ini': platformio,
        'touch_example.ino': touchExample,
        'project.json': JSON.stringify({
            name: projectName,
            device,
            screens: screens.map(screen => ({
                id: screen.id,
                name: screen.name,
                widgetCount: screen.widgets.length,
                backgroundColor: screen.backgroundColor,
                widgets: screen.widgets.map(w => ({
                    id: w.id,
                    type: w.type,
                    position: w.position,
                    size: w.size,
                    properties: w.properties
                }))
            })),
            totalWidgets,
            generatedAt: new Date().toISOString(),
            version: '1.0.0'
        }, null, 2)
    };
}