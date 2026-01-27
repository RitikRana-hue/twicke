import React from 'react';
import { Download, Save, Settings } from 'lucide-react';
import { Widget, DeviceConfig } from '../types';
import { generateProjectFiles } from '../utils/codeGenerator';

interface HeaderProps {
    widgets: Widget[];
    device: DeviceConfig;
}

export const Header: React.FC<HeaderProps> = ({ widgets, device }) => {
    const handleGenerateCode = () => {
        const projectName = 'IoT_GUI_Project';
        const files = generateProjectFiles(widgets, device, projectName);

        // Create and download zip-like structure as individual files
        Object.entries(files).forEach(([filename, content]) => {
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        // Show success message
        alert(`Generated ${Object.keys(files).length} files for ${widgets.length} widgets!`);
    };

    const handleSave = () => {
        const projectData = {
            widgets,
            device,
            savedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'iot-gui-project.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-semibold text-gray-900">IoT GUI Builder</h1>
                    <div className="text-sm text-gray-500">
                        {device.name} ({device.width}×{device.height})
                    </div>
                    <div className="text-sm text-gray-400">
                        {widgets.length} widget{widgets.length !== 1 ? 's' : ''}
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        <Save size={16} />
                        <span>Save</span>
                    </button>

                    <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                        <Settings size={16} />
                        <span>Settings</span>
                    </button>

                    <button
                        onClick={handleGenerateCode}
                        disabled={widgets.length === 0}
                        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        <Download size={16} />
                        <span>Generate Code</span>
                    </button>
                </div>
            </div>
        </header>
    );
};