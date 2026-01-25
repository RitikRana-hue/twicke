# IoT GUI Builder

A Blynk-inspired visual GUI builder for IoT display devices. Design beautiful user interfaces for embedded displays without writing code.

## Features

- **Visual Drag & Drop Interface** - Design UIs like Blynk with intuitive drag-and-drop
- **Real-time Preview** - See exactly how your UI will look on the target device
- **Multiple Widget Types** - Labels, buttons, switches, gauges, images, and containers
- **Property-Driven Design** - Easily customize colors, sizes, text, and behavior
- **Code Generation** - One-click generation of Arduino/ESP32 code
- **ESP32-S3 Optimized** - Specifically designed for ESP32-S3 with TFT displays

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

## How to Use

1. **Select Device** - Currently supports ESP32-S3 with 480x320 displays
2. **Drag Widgets** - Drag widgets from the left panel onto the canvas
3. **Customize Properties** - Select widgets and modify properties in the right panel
4. **Generate Code** - Click "Generate Code" to download Arduino code files
5. **Deploy to Device** - Upload the generated code to your ESP32-S3

## Widget Types

- **Label** - Display static or dynamic text
- **Button** - Interactive buttons with customizable appearance
- **Switch** - Toggle switches for on/off controls
- **Gauge** - Circular progress indicators and meters
- **Image** - Display images (requires URL)
- **Container** - Group and organize other widgets

## Code Generation

The generated code includes:
- `main.ino` - Arduino sketch with TFT_eSPI library
- `README.md` - Hardware setup and installation instructions
- `platformio.ini` - PlatformIO configuration
- `project.json` - Project metadata and widget definitions

## Hardware Requirements

- ESP32-S3 development board
- TFT display (480x320 recommended)
- TFT_eSPI library configured for your display
- Optional: SD card for storing images

## Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: react-dnd
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # React components
│   ├── GuiBuilder.tsx   # Main application component
│   ├── Canvas.tsx       # Design canvas
│   ├── WidgetLibrary.tsx # Widget palette
│   ├── WidgetRenderer.tsx # Widget rendering logic
│   ├── PropertiesPanel.tsx # Property editor
│   └── Header.tsx       # Top navigation
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── codeGenerator.ts # Arduino code generation
│   └── helpers.ts       # Helper functions
└── index.css           # Global styles
```

## Development

- **Add New Widgets**: Extend the `WidgetType` enum and add rendering logic
- **Customize Code Generation**: Modify `codeGenerator.ts` for different platforms
- **Styling**: Use Tailwind CSS classes for consistent design

## Inspiration

This project is inspired by Blynk's intuitive approach to IoT interface design, bringing that same simplicity to embedded display development.

## License

MIT License - feel free to use this project for your IoT applications!# twicke
# twicke
