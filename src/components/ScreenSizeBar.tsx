import React, { useState, useEffect } from 'react';
import { Monitor, Settings, ChevronDown } from 'lucide-react';
import { DeviceConfig, SizeUnit } from '../types';
import { UnitConverter } from '../utils/unitConverter';

interface ScreenSizeBarProps {
    device: DeviceConfig;
    onDeviceUpdate: (device: DeviceConfig) => void;
}

export const ScreenSizeBar: React.FC<ScreenSizeBarProps> = ({
    device,
    onDeviceUpdate
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentUnit, setCurrentUnit] = useState<SizeUnit>('px');
    const [tempWidth, setTempWidth] = useState(device.width);
    const [tempHeight, setTempHeight] = useState(device.height);
    const [dpi, setDpi] = useState(device.dpi || 96);

    const converter = new UnitConverter(dpi);

    // Update temp values when device changes
    useEffect(() => {
        setTempWidth(converter.fromPixels(device.width, currentUnit));
        setTempHeight(converter.fromPixels(device.height, currentUnit));
    }, [device.width, device.height, currentUnit, dpi]);

    const handleDimensionChange = (field: 'width' | 'height', value: number) => {
        if (field === 'width') {
            setTempWidth(value);
        } else {
            setTempHeight(value);
        }

        // Convert to pixels and update device
        const widthPx = converter.toPixels(field === 'width' ? value : tempWidth, currentUnit);
        const heightPx = converter.toPixels(field === 'height' ? value : tempHeight, currentUnit);

        onDeviceUpdate({
            ...device,
            width: Math.round(widthPx),
            height: Math.round(heightPx),
            dpi
        });
    };

    const presetSizes = [
        { name: 'ESP32-S3', width: 480, height: 320 },
        { name: 'Small LCD', width: 320, height: 240 },
        { name: 'Medium LCD', width: 800, height: 480 },
        { name: 'Large LCD', width: 1024, height: 600 },
        { name: 'HD', width: 1280, height: 720 },
    ];

    const applyPreset = (preset: typeof presetSizes[0]) => {
        onDeviceUpdate({
            ...device,
            name: preset.name,
            width: preset.width,
            height: preset.height
        });
    };

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            {/* Main Bar */}
            <div className="px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* Screen Size Display */}
                    <div className="flex items-center space-x-2">
                        <Monitor size={16} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Screen Size:</span>
                        <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                            {device.width} × {device.height}px
                        </span>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex items-center space-x-1">
                        {presetSizes.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => applyPreset(preset)}
                                className={`px-2 py-1 text-xs rounded transition-colors ${
                                    device.width === preset.width && device.height === preset.height
                                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                                        : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                                }`}
                            >
                                {preset.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Expand Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`flex items-center space-x-1 px-2 py-1 text-sm rounded transition-colors ${
                        isExpanded ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <Settings size={14} />
                    <ChevronDown size={14} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Expanded Controls */}
            {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        {/* Unit Selection */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Unit
                            </label>
                            <select
                                value={currentUnit}
                                onChange={(e) => setCurrentUnit(e.target.value as SizeUnit)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="px">Pixels (px)</option>
                                <option value="mm">Millimeters (mm)</option>
                                <option value="inch">Inches (in)</option>
                            </select>
                        </div>

                        {/* Width Control */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Width ({currentUnit})
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="range"
                                    min={currentUnit === 'px' ? 100 : currentUnit === 'mm' ? 25 : 1}
                                    max={currentUnit === 'px' ? 2000 : currentUnit === 'mm' ? 500 : 20}
                                    step={currentUnit === 'px' ? 10 : 0.1}
                                    value={tempWidth}
                                    onChange={(e) => handleDimensionChange('width', Number(e.target.value))}
                                    className="flex-1"
                                />
                                <input
                                    type="number"
                                    value={tempWidth.toFixed(currentUnit === 'px' ? 0 : 1)}
                                    onChange={(e) => handleDimensionChange('width', Number(e.target.value))}
                                    className="w-16 px-1 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                                />
                            </div>
                        </div>

                        {/* Height Control */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Height ({currentUnit})
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="range"
                                    min={currentUnit === 'px' ? 100 : currentUnit === 'mm' ? 25 : 1}
                                    max={currentUnit === 'px' ? 1500 : currentUnit === 'mm' ? 400 : 15}
                                    step={currentUnit === 'px' ? 10 : 0.1}
                                    value={tempHeight}
                                    onChange={(e) => handleDimensionChange('height', Number(e.target.value))}
                                    className="flex-1"
                                />
                                <input
                                    type="number"
                                    value={tempHeight.toFixed(currentUnit === 'px' ? 0 : 1)}
                                    onChange={(e) => handleDimensionChange('height', Number(e.target.value))}
                                    className="w-16 px-1 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                                />
                            </div>
                        </div>

                        {/* DPI Control */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                DPI
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="range"
                                    min="72"
                                    max="300"
                                    step="1"
                                    value={dpi}
                                    onChange={(e) => setDpi(Number(e.target.value))}
                                    className="flex-1"
                                />
                                <input
                                    type="number"
                                    value={dpi}
                                    onChange={(e) => setDpi(Number(e.target.value))}
                                    className="w-16 px-1 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Conversion Display */}
                    <div className="mt-3 p-2 bg-white rounded border text-xs text-gray-600">
                        <div className="grid grid-cols-3 gap-4">
                            <div><strong>Pixels:</strong> {device.width} × {device.height}px</div>
                            <div><strong>Millimeters:</strong> {converter.format(converter.fromPixels(device.width, 'mm'), 'mm')} × {converter.format(converter.fromPixels(device.height, 'mm'), 'mm')}</div>
                            <div><strong>Inches:</strong> {converter.format(converter.fromPixels(device.width, 'inch'), 'inch')} × {converter.format(converter.fromPixels(device.height, 'inch'), 'inch')}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};