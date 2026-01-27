import React, { useState } from 'react';
import { Download, Save, Settings, Undo, Redo, Eye, Upload } from 'lucide-react';
import { Project } from '../types';
import { generateProjectFiles } from '../utils/enhancedCodeGenerator';
import { PreviewModal } from './PreviewModal';

interface EnhancedHeaderProps {
    project: Project;
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
    onImportProject?: (project: Project) => void;
}

export const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({
    project,
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    onImportProject
}) => {
    const [showPreview, setShowPreview] = useState(false);
    const currentScreen = project.screens.find(s => s.id === project.currentScreenId);
    const totalWidgets = project.screens.reduce((total, screen) => total + screen.widgets.length, 0);

    const handleImportProject = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonContent = e.target?.result as string;
                const importedProject = JSON.parse(jsonContent);

                // Validate that it's a valid project file
                if (importedProject.screens && importedProject.device && onImportProject) {
                    // Convert dates back to Date objects
                    importedProject.createdAt = new Date(importedProject.createdAt);
                    importedProject.updatedAt = new Date();

                    onImportProject(importedProject);

                    // Show success message with project details
                    const totalImportedWidgets = importedProject.screens.reduce((total: number, screen: any) => total + screen.widgets.length, 0);
                    alert(`✅ Successfully imported "${importedProject.name}"!\n\n📊 Project Details:\n• Screens: ${importedProject.screens.length}\n• Total Widgets: ${totalImportedWidgets}\n• Device: ${importedProject.device.name}\n• Resolution: ${importedProject.device.width}×${importedProject.device.height}px\n\nYou can now view and edit the imported design!`);
                } else {
                    alert('Invalid project file. Please select a valid project.json file.');
                }
            } catch (error) {
                console.error('Error importing project:', error);
                alert('Error reading project file. Please make sure it\'s a valid JSON file.');
            }
        };
        reader.readAsText(file);

        // Reset the input so the same file can be selected again
        event.target.value = '';
    };

    const handleGenerateCode = () => {
        const files = generateProjectFiles(project.screens, project.device, project.name);

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
        alert(`Generated ${Object.keys(files).length} files for ${project.screens.length} screens with ${totalWidgets} widgets!`);
    };

    const handleSave = () => {
        const projectData = {
            ...project,
            savedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}.json`;
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
                        {project.device.name} ({project.device.width}×{project.device.height})
                    </div>
                    <div className="text-sm text-gray-400">
                        {project.screens.length} screen{project.screens.length !== 1 ? 's' : ''} • {totalWidgets} widget{totalWidgets !== 1 ? 's' : ''}
                    </div>
                    {currentScreen && (
                        <div className="text-sm text-primary-600 font-medium">
                            {currentScreen.name}
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-3">
                    {/* Undo/Redo */}
                    <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                            onClick={onUndo}
                            disabled={!canUndo}
                            className="flex items-center space-x-1 px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                            title="Undo (Ctrl+Z)"
                        >
                            <Undo size={14} />
                        </button>
                        <div className="w-px h-6 bg-gray-200" />
                        <button
                            onClick={onRedo}
                            disabled={!canRedo}
                            className="flex items-center space-x-1 px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                            title="Redo (Ctrl+Y)"
                        >
                            <Redo size={14} />
                        </button>
                    </div>

                    <button
                        onClick={() => setShowPreview(true)}
                        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        <Eye size={16} />
                        <span>Preview</span>
                    </button>

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

                    {/* Import Project Button */}
                    <label className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors cursor-pointer">
                        <Upload size={16} />
                        <span>Import Project</span>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImportProject}
                            className="hidden"
                        />
                    </label>

                    <button
                        onClick={handleGenerateCode}
                        disabled={totalWidgets === 0}
                        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        <Download size={16} />
                        <span>Generate Code</span>
                    </button>
                </div>
            </div>

            <PreviewModal
                project={project}
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
            />
        </header>
    );
};