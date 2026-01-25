import React from 'react';
import { X } from 'lucide-react';
import { Project } from '../types';
import { EnhancedWidgetRenderer } from './EnhancedWidgetRenderer';

interface PreviewModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ project, isOpen, onClose }) => {
    if (!isOpen) return null;

    const currentScreen = project.screens.find(s => s.id === project.currentScreenId) || project.screens[0];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Preview Mode</h2>
                        <p className="text-sm text-gray-500">
                            {currentScreen.name} • {project.device.width}×{project.device.height}px
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Preview Content */}
                <div className="p-6">
                    <div className="flex justify-center">
                        <div
                            className="relative border-2 border-gray-300 rounded-lg shadow-lg"
                            style={{
                                width: project.device.width,
                                height: project.device.height,
                                backgroundColor: currentScreen.backgroundColor || '#000000'
                            }}
                        >
                            {/* Device Frame */}
                            <div className="absolute -inset-4 bg-gray-800 rounded-xl"></div>
                            <div className="absolute -inset-2 bg-gray-600 rounded-lg"></div>

                            {/* Screen Content */}
                            <div className="relative w-full h-full overflow-hidden rounded-lg">
                                {currentScreen.widgets.map((widget) => (
                                    <EnhancedWidgetRenderer
                                        key={widget.id}
                                        widget={widget}
                                        isSelected={false}
                                        onSelect={() => { }}
                                        onUpdate={() => { }}
                                        onDelete={() => { }}
                                        onLayerChange={() => { }}
                                        canvasSize={{ width: project.device.width, height: project.device.height }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Screen Navigation */}
                    {project.screens.length > 1 && (
                        <div className="mt-6 flex justify-center">
                            <div className="flex space-x-2">
                                {project.screens.map((screen, index) => (
                                    <button
                                        key={screen.id}
                                        className={`px-3 py-1 text-sm rounded ${screen.id === project.currentScreenId
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        {screen.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">{project.screens.length}</div>
                            <div className="text-sm text-gray-500">Screens</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">{currentScreen.widgets.length}</div>
                            <div className="text-sm text-gray-500">Widgets</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                {project.screens.reduce((total, screen) => total + screen.widgets.length, 0)}
                            </div>
                            <div className="text-sm text-gray-500">Total Widgets</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};