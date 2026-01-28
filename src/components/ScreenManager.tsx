import React, { useState } from 'react';
import { Plus, Copy, Trash2, Monitor, MoreHorizontal } from 'lucide-react';
import { Screen } from '../types';
import { TemplateSelector } from './TemplateSelector';
import { ScreenTemplate } from '../utils/screenTemplates';

interface ScreenManagerProps {
    screens: Screen[];
    currentScreenId: string;
    onSwitchScreen: (screenId: string) => void;
    onAddScreen: (name: string, template?: ScreenTemplate) => void;
    onDuplicateScreen: (screenId: string) => void;
    onDeleteScreen: (screenId: string) => void;
}

export const ScreenManager: React.FC<ScreenManagerProps> = ({
    screens,
    currentScreenId,
    onSwitchScreen,
    onAddScreen,
    onDuplicateScreen,
    onDeleteScreen
}) => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [newScreenName, setNewScreenName] = useState('');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const handleAddScreen = () => {
        if (newScreenName.trim()) {
            onAddScreen(newScreenName.trim());
            setNewScreenName('');
            setShowAddDialog(false);
        }
    };

    const handleCreateFromTemplate = (name: string, template?: ScreenTemplate) => {
        onAddScreen(name, template);
        setShowTemplateSelector(false);
    };
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddScreen();
        } else if (e.key === 'Escape') {
            setShowAddDialog(false);
            setNewScreenName('');
        }
    };

    return (
        <div className="bg-white border-b border-gray-200 px-4 py-2">
            <div className="flex items-center space-x-2">
                <Monitor size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Screens:</span>

                {/* Screen Tabs */}
                <div className="flex items-center space-x-1">
                    {screens.map((screen) => (
                        <div key={screen.id} className="relative">
                            <button
                                onClick={() => onSwitchScreen(screen.id)}
                                className={`
                                    px-3 py-1.5 text-sm rounded-md transition-colors flex items-center space-x-2
                                    ${screen.id === currentScreenId
                                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }
                                `}
                            >
                                <span>{screen.name}</span>
                                {screen.isStartup && (
                                    <div className="w-2 h-2 bg-green-500 rounded-full" title="Startup screen" />
                                )}
                            </button>

                            {/* Screen Actions Dropdown */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveDropdown(activeDropdown === screen.id ? null : screen.id);
                                }}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <MoreHorizontal size={12} />
                            </button>

                            {activeDropdown === screen.id && (
                                <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-32">
                                    <button
                                        onClick={() => {
                                            onDuplicateScreen(screen.id);
                                            setActiveDropdown(null);
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                                    >
                                        <Copy size={14} />
                                        <span>Duplicate</span>
                                    </button>
                                    {screens.length > 1 && (
                                        <button
                                            onClick={() => {
                                                onDeleteScreen(screen.id);
                                                setActiveDropdown(null);
                                            }}
                                            className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center space-x-2"
                                        >
                                            <Trash2 size={14} />
                                            <span>Delete</span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add Screen Button */}
                {!showAddDialog ? (
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => setShowAddDialog(true)}
                            className="flex items-center space-x-1 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <Plus size={14} />
                            <span>Add Screen</span>
                        </button>
                        <button
                            onClick={() => setShowTemplateSelector(true)}
                            className="flex items-center space-x-1 px-2 py-1.5 text-sm text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                            title="Create from template"
                        >
                            <Monitor size={14} />
                            <span>Templates</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={newScreenName}
                            onChange={(e) => setNewScreenName(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Screen name"
                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                            autoFocus
                        />
                        <button
                            onClick={handleAddScreen}
                            disabled={!newScreenName.trim()}
                            className="px-2 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => {
                                setShowAddDialog(false);
                                setNewScreenName('');
                            }}
                            className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Click outside to close dropdown */}
            {activeDropdown && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setActiveDropdown(null)}
                />
            )}
            {/* Template Selector Modal */}
            <TemplateSelector
                isOpen={showTemplateSelector}
                onClose={() => setShowTemplateSelector(false)}
                onCreateScreen={handleCreateFromTemplate}
            />
        </div>
    );
};