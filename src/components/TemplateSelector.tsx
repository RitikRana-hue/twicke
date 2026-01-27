import React, { useState } from 'react';
import { Plus, Smartphone, Settings, X } from 'lucide-react';
import { ALL_TEMPLATES, ScreenTemplate } from '../utils/screenTemplates';

interface TemplateSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateScreen: (screenName: string, template?: ScreenTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
    isOpen,
    onClose,
    onCreateScreen
}) => {
    const [selectedTemplate, setSelectedTemplate] = useState<ScreenTemplate | null>(null);
    const [screenName, setScreenName] = useState('');

    // Debug: Log available templates
    React.useEffect(() => {
        if (isOpen) {
            console.log('🎨 Template Selector opened');
            console.log('📋 Available templates:', ALL_TEMPLATES.length);
            ALL_TEMPLATES.forEach((template, index) => {
                console.log(`  ${index + 1}. ${template.name} (${template.widgets.length} widgets)`);
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleCreateScreen = () => {
        if (!screenName.trim()) return;

        console.log('🎨 Creating screen:', screenName);
        console.log('📋 Selected template:', selectedTemplate?.name || 'None (Blank)');

        if (selectedTemplate) {
            // Create from template
            console.log('🏗️ Creating from template with', selectedTemplate.widgets.length, 'widgets');
            onCreateScreen(screenName, selectedTemplate);
        } else {
            // Create blank screen
            console.log('📄 Creating blank screen');
            onCreateScreen(screenName);
        }

        // Reset and close
        setScreenName('');
        setSelectedTemplate(null);
        onClose();
    };

    const getTemplateIcon = (category: string) => {
        switch (category) {
            case 'startup': return <Smartphone size={24} className="text-purple-600" />;
            case 'settings': return <Settings size={24} className="text-blue-600" />;
            default: return <Plus size={24} className="text-gray-600" />;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Screen</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Screen Name Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Screen Name
                        </label>
                        <input
                            type="text"
                            value={screenName}
                            onChange={(e) => setScreenName(e.target.value)}
                            placeholder="Enter screen name..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            autoFocus
                        />
                    </div>

                    {/* Template Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Choose Template (Optional)
                        </label>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Blank Screen Option */}
                            <div
                                onClick={() => setSelectedTemplate(null)}
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                    selectedTemplate === null
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center space-x-3 mb-2">
                                    <Plus size={24} className="text-gray-600" />
                                    <h3 className="font-medium text-gray-900">Blank Screen</h3>
                                </div>
                                <p className="text-sm text-gray-600">Start with an empty canvas</p>
                            </div>

                            {/* Template Options */}
                            {ALL_TEMPLATES.map((template) => (
                                <div
                                    key={template.id}
                                    onClick={() => {
                                        console.log('🎯 Template selected:', template.name);
                                        setSelectedTemplate(template);
                                    }}
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        selectedTemplate?.id === template.id
                                            ? 'border-primary-500 bg-primary-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center space-x-3 mb-2">
                                        {getTemplateIcon(template.category)}
                                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">{template.description}</p>
                                    
                                    {/* Widget Count */}
                                    <div className="mt-2 text-xs text-gray-500">
                                        {template.widgets.length} widgets included
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Template Preview */}
                    {selectedTemplate && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Template Preview</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div><strong>Category:</strong> {selectedTemplate.category}</div>
                                <div><strong>Widgets:</strong> {selectedTemplate.widgets.length}</div>
                                <div><strong>Includes:</strong></div>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    {selectedTemplate.widgets.slice(0, 5).map((widget, index) => (
                                        <li key={index} className="text-xs">
                                            {(widget as any).type} - {(widget.properties as any).text || (widget as any).type}
                                        </li>
                                    ))}
                                    {selectedTemplate.widgets.length > 5 && (
                                        <li className="text-xs text-gray-500">
                                            ...and {selectedTemplate.widgets.length - 5} more
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateScreen}
                        disabled={!screenName.trim()}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {selectedTemplate ? `Create from ${selectedTemplate.name}` : 'Create Blank Screen'}
                    </button>
                </div>
            </div>
        </div>
    );
};