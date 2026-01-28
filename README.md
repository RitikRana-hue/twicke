# IoT GUI Builder

A Blynk-inspired visual GUI builder for IoT display devices. Design beautiful user interfaces for embedded displays without writing code.

## 🚀 Features

- **Visual Drag & Drop Interface** - Design UIs like Blynk with intuitive drag-and-drop
- **Real-time Preview** - See exactly how your UI will look on the target device
- **12+ Widget Types** - Labels, buttons, switches, gauges, charts, images, and containers
- **Property-Driven Design** - Easily customize colors, sizes, text, and behavior
- **Multi-Screen Support** - Create complex applications with multiple screens
- **Layer Management** - Control widget layering with bring-to-front/send-to-back
- **Image Upload** - Upload local images with base64 encoding for embedded use
- **Code Generation** - One-click generation of Arduino/ESP32 code
- **Project Import/Export** - Share designs via JSON files
- **ESP32-S3 Optimized** - Specifically designed for ESP32-S3 with TFT displays

## 🛠️ Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd iot-gui-builder
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📱 How to Use

### Basic Workflow
1. **Design Interface** - Drag widgets from the left panel onto the 480x320 canvas
2. **Customize Properties** - Select widgets and modify properties in the right panel
3. **Manage Layers** - Use layer controls to arrange widget depth
4. **Preview Design** - Click "Preview" to see your design in a device frame
5. **Generate Code** - Click "Generate Code" to download Arduino code files
6. **Deploy to Device** - Upload the generated code to your ESP32-S3

### Advanced Features
- **Multi-Screen Apps**: Create multiple screens and navigate between them
- **Image Upload**: Upload local images that get embedded as base64 data
- **Project Sharing**: Export your design as JSON and import others' designs
- **Undo/Redo**: Full history management for design changes

## 🎨 Widget Library

### Phase 1 (MVP Widgets)
- **Label** - Static text display
- **Dynamic Label** - Sensor data with units and formatting
- **Button** - Interactive buttons with custom styling
- **Switch** - Toggle switches for on/off controls
- **Checkbox** - Checkbox inputs
- **Slider** - Range input controls

### Phase 2 (Power Widgets)
- **Circular Gauge** - Radial progress indicators with customizable ranges
- **Linear Gauge** - Horizontal/vertical progress bars
- **Status LED** - Colored indicators with blinking support
- **Container** - Group and organize other widgets
- **Image** - Display uploaded images or external URLs

### Widget Properties
Each widget supports extensive customization:
- **Position & Size** - Precise pixel positioning and dimensions
- **Colors** - Background, text, and accent colors
- **Typography** - Font size, weight, and alignment
- **Behavior** - Enabled/disabled states, visibility
- **Data Binding** - Connect to sensor values and variables

## 🔧 Code Generation

The generated Arduino code includes:

### Files Generated
- **`main.ino`** - Complete Arduino sketch with TFT_eSPI integration
- **`README.md`** - Hardware setup and installation guide
- **`platformio.ini`** - PlatformIO configuration for easy building
- **`project.json`** - Complete project metadata and widget definitions

### Features Included
- **TFT_eSPI Integration** - Optimized for ESP32-S3 displays
- **Touch Support** - Touch event handling for interactive widgets
- **Modular Code** - Clean, readable code structure
- **Helper Functions** - Utility functions for common operations
- **Documentation** - Comprehensive comments and setup instructions

## 🔌 Hardware Requirements

### Recommended Setup
- **ESP32-S3** development board (DevKitC-1 or similar)
- **TFT Display** - 480x320 ILI9341 or compatible
- **Touch Controller** - XPT2046 or similar (optional)
- **SD Card** - For storing additional resources (optional)

### Display Configuration
The generated code is optimized for:
- **Resolution**: 480x320 pixels
- **Interface**: SPI
- **Library**: TFT_eSPI (configured in User_Setup.h)

## 🏗️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: react-dnd with HTML5 backend
- **Icons**: Lucide React
- **Build Tool**: Vite with optimized production builds
- **State Management**: React hooks and context

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── EnhancedGuiBuilder.tsx   # Main application
│   ├── Canvas.tsx               # Design canvas
│   ├── WidgetLibrary.tsx        # Widget palette
│   ├── EnhancedWidgetRenderer.tsx # Widget rendering
│   ├── PropertiesPanel.tsx      # Property editor
│   ├── EnhancedHeader.tsx       # Navigation & actions
│   ├── PreviewModal.tsx         # Device preview
│   └── ScreenManager.tsx        # Multi-screen support
├── types/                   # TypeScript definitions
│   ├── index.ts            # Core types
│   └── widgets.ts          # Widget type system
├── utils/                   # Utility functions
│   ├── enhancedCodeGenerator.ts # Arduino code generation
│   ├── helpers.ts          # Helper functions
│   ├── historyManager.ts   # Undo/redo functionality
│   └── templates.ts        # Code templates
├── data/                    # Static data
│   └── widgetDefinitions.ts # Widget schemas
└── index.css               # Global styles
```

## 🚀 Deployment

### Static Hosting
The built application is a static site that can be deployed to:
- **Vercel** - `npm run build && vercel --prod`
- **Netlify** - Drag `dist/` folder to Netlify dashboard
- **GitHub Pages** - Push `dist/` contents to gh-pages branch
- **Any Static Host** - Upload `dist/` folder contents

### Environment Setup
No environment variables required - the app runs entirely client-side.

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Adding New Widgets
1. Define widget type in `src/types/widgets.ts`
2. Add widget definition in `src/data/widgetDefinitions.ts`
3. Implement rendering in `src/components/EnhancedWidgetRenderer.tsx`
4. Add code generation in `src/utils/enhancedCodeGenerator.ts`

## 📄 License

MIT License - feel free to use this project for your IoT applications!

This project is inspired by Blynk's intuitive approach to IoT interface design, bringing that same simplicity to embedded display development while adding modern web technologies and enhanced customization capabilities.
