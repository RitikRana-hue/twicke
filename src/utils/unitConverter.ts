import { SizeUnit } from '../types';

// Standard DPI for conversions (can be overridden by device config)
const DEFAULT_DPI = 96;

export class UnitConverter {
    private dpi: number;

    constructor(dpi: number = DEFAULT_DPI) {
        this.dpi = dpi;
    }

    // Convert from any unit to pixels
    toPixels(value: number, fromUnit: SizeUnit): number {
        switch (fromUnit) {
            case 'px':
                return value;
            case 'inch':
                return value * this.dpi;
            case 'mm':
                return (value / 25.4) * this.dpi;
            default:
                return value;
        }
    }

    // Convert from pixels to any unit
    fromPixels(pixels: number, toUnit: SizeUnit): number {
        switch (toUnit) {
            case 'px':
                return pixels;
            case 'inch':
                return pixels / this.dpi;
            case 'mm':
                return (pixels / this.dpi) * 25.4;
            default:
                return pixels;
        }
    }

    // Convert between any two units
    convert(value: number, fromUnit: SizeUnit, toUnit: SizeUnit): number {
        if (fromUnit === toUnit) return value;
        const pixels = this.toPixels(value, fromUnit);
        return this.fromPixels(pixels, toUnit);
    }

    // Format value with unit
    format(value: number, unit: SizeUnit, precision: number = 1): string {
        return `${value.toFixed(precision)}${unit}`;
    }
}

// Helper function to get unit display name
export function getUnitDisplayName(unit: SizeUnit): string {
    switch (unit) {
        case 'px': return 'Pixels';
        case 'mm': return 'Millimeters';
        case 'inch': return 'Inches';
        default: return unit;
    }
}