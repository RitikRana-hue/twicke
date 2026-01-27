import React, { useState, useEffect } from 'react';
import { Monitor, Settings } from 'lucide-react';
import { DeviceConfig, SizeUnit, ScreenDimensions } from '../types';
import { UnitConverter } from '../utils/unitConverter';

interface ScreenSizeConfigProps {
    device: DeviceConfig;
    onDeviceUpdate: (device: DeviceConfig) => void;
    isVisible: boolean;
    onToggle: () => void;
}

export const ScreenSizeConfig: React.FC<ScreenSizeConfigProps> = ({
    device,
    onDeviceUpdate,
    isVisible,
    onToggle
}) => {
    const [currentUnit, setCurrentUnit] = useState<SizeUnit>('px');
    const [dimensions, setDimensions] = useState<ScreenDimensions>({
        width: device.width,
        height: device.height,
        unit: 'px'
    });
    const [dpi, setDpi] = useState(device.dpi || 96);

    const converter = new UnitConverter(dpi);

    // Update dimensions when device or unit changes
    useEffect(() => {
        setDimensions({
            width: converter.fromPixels(device.width, currentUnit),
            height: converter.fromPixels(device.height, currentUnit),
            unit: currentUnit
        });
    }, [device.width, device.height, currentUnit, dpi]);

    const handleDimensionChange = (field: 'width' | 'height', value: number) => {
        const newDimensions = { ...dimensions, [field]: value };
        setDimensions(newDimensions);

        // Convert to pixels and update device
        const widthPx = converter.toPixels(newDimensions.width, currentUnit);
        const heightPx = converter.toPixels(newDimensions.height, currentUnit);

        onDeviceUpdate({
            ...device,
            width: Math.round(widthPx),
            height: Math.round(heightPx),
            dpi
        });
    };

    const handleDpiChange = (newDpi: number) => {
        setDpi(newDpi);
        onDeviceUpdate({
            ...device,
            dpi: newDpi
        });
    };

    const presetSizes = [
        { name: 'ESP32-S3 Display', width: 480, height: 320 },
        { name: 'Small LCD', width: 320, height: 240 },
        { name: 'Medium LCD', width: 800, height: 480 },
        { name: 'Large LCD', width: 1024, height: 600 },
        { name: 'HD Display', width: 1280, height: 720 },
        { name: 'Custom', width: device.width, height: device.height }
    ];

    const currentPreset = presetSizes.find(p => p.width === device.width && p.height === device.height);

    return (
        <div className="bg-white border-b border-gray-200">
            {/* Toggle Button */}
            <div className="px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Monitor size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Screen Size:</span>
                    <span className="text-sm text-gray-600">
                        {device.width} × {device.height}px
                        {currentUnit !== 'px' && (
                            <span className="text-gray-400 ml-1">
                                ({converter.format(converter.fromPixels(device.width, currentUnit), currentUnit)} × {converter.format(converter.fromPixels(device.height, currentUnit), currentUnit)})
                            </span>
                        )}
                    </span>
                </div>
                <button
                    onClick={onToggle}
                    className={`p-1.5 rounded-md transition-colors ${
                        isVisible ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                    title="Configure screen size"
                >
                    <Settings size={16} />
                </button>
            </div>

            {/* Configuration Panel */}
            {isVisible && (
                <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {/* Preset Sizes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Preset Sizes
                            </label>
                            <select
                                value={currentPreset?.name || 'Custom'}
                                onChange={(e) => {
                                    const preset = presetSizes.find(p => p.name === e.target.value);
                                    if (preset && preset.name !== 'Custom') {
                                        onDeviceUpdate({
                                            ...device,
                                            name: preset.name,
                                            width: preset.width,
                                            height: preset.height
                                        });
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                            >
                                {presetSizes.map(preset => (
                                    <option key={preset.name} value={preset.name}>
                                        {preset.name} ({preset.width}×{preset.height})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Unit Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Unit
                            </label>
                            <select
                                value={currentUnit}
                                onChange={(e) => setCurrentUnit(e.target.value as SizeUnit)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                            >
                                <option value="px">Pixels (px)</option>
                                <option value="mm">Millimeters (mm)</option>
                                <option value="inch">Inches (in)</option>
                            </select>
                        </div>

                        {/* DPI Setting */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                DPI (for unit conversion)
                            </label>
                            <input
                                type="number"
                                value={dpi}
                                onChange={(e) => handleDpiChange(Number(e.target.value))}
                                min="1"
                                max="500"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                            />
                        </div>
                    </div>

                    {/* Dimension Inputs */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Width ({currentUnit})
                            </label>
                            <input
                                type="number"
                                value={dimensions.width.toFixed(currentUnit === 'px' ? 0 : 1)}
                                onChange={(e) => handleDimensionChange('width', Number(e.target.value))}
                                min="1"
                                step={currentUnit === 'px' ? '1' : '0.1'}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Height ({currentUnit})
                            </label>
                            <input
                                type="number"
                                value={dimensions.height.toFixed(currentUnit === 'px' ? 0 : 1)}
                                onChange={(e) => handleDimensionChange('height', Number(e.target.value))}
                                min="1"
                                step={currentUnit === 'px' ? '1' : '0.1'}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                            />
                        </div>
                    </div>

                    {/* Conversion Display */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-gray-600">
                            <div className="font-medium mb-1">Current Size:</div>
                            <div className="grid grid-cols-3 gap-4 text-xs">
                                <div>Pixels: {device.width} × {device.height}px</div>
                                <div>Millimeters: {converter.format(converter.fromPixels(device.width, 'mm'), 'mm')} × {converter.format(converter.fromPixels(device.height, 'mm'), 'mm')}</div>
                                <div>Inches: {converter.format(converter.fromPixels(device.width, 'inch'), 'inch')} × {converter.format(converter.fromPixels(device.height, 'inch'), 'inch')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};