import React, { useState, useCallback, useEffect, useRef } from 'react';
import { BaseWidget, DeviceConfig, Screen, Project } from '../types';
import { getWidgetDefinition } from '../data/widgetDefinitions';
import { WidgetLibrary } from './WidgetLibrary';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { EnhancedHeader } from './EnhancedHeader';
import { ScreenManager } from './ScreenManager';
import { generateProjectFiles } from '../utils/enhancedCodeGenerator';
import { generateId } from '../utils/helpers';
import { HistoryManager } from '../utils/historyManager';

const DEFAULT_DEVICE: DeviceConfig = {
    name: 'ESP32-S3 Display',
    width: 480,
    height: 320,
    pixelDensity: 1
};

const DEFAULT_SCREEN: Screen = {
    id: generateId(),
    name: 'Main Screen',
    widgets: [],
    isStartup: true,
    backgroundColor: '#000000'
};

export const EnhancedGuiBuilder: React.FC = () => {
    const [project, setProject] = useState<Project>({
        id: generateId(),
        name: 'New Project',
        device: DEFAULT_DEVICE,
        screens: [DEFAULT_SCREEN],
        currentScreenId: DEFAULT_SCREEN.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
    });

    const [selectedWidget, setSelectedWidget] = useState<BaseWidget | null>(null);
    const historyManager = useRef(new HistoryManager());

    const currentScreen = project.screens.find(s => s.id === project.currentScreenId) || project.screens[0];

    // Save state to history
    const saveToHistory = useCallback((action: string) => {
        historyManager.current.addState(project.screens, project.currentScreenId, action);
    }, [project.screens, project.currentScreenId]);

    // Undo/Redo handlers
    const handleUndo = useCallback(() => {
        const previousState = historyManager.current.undo();
        if (previousState) {
            setProject(prev => ({
                ...prev,
                screens: previousState.screens,
                currentScreenId: previousState.currentScreenId,
                updatedAt: new Date()
            }));
            setSelectedWidget(null);
        }
    }, []);

    const handleRedo = useCallback(() => {
        const nextState = historyManager.current.redo();
        if (nextState) {
            setProject(prev => ({
                ...prev,
                screens: nextState.screens,
                currentScreenId: nextState.currentScreenId,
                updatedAt: new Date()
            }));
            setSelectedWidget(null);
        }
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey)) {
                if (e.key === 'z' && !e.shiftKey) {
                    e.preventDefault();
                    handleUndo();
                } else if (e.key === 'z' && e.shiftKey || e.key === 'y') {
                    e.preventDefault();
                    handleRedo();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleUndo, handleRedo]);

    const addWidget = useCallback((type: BaseWidget['type'], position: { x: number; y: number }) => {
        const definition = getWidgetDefinition(type);
        if (!definition) return;

        // Get the highest zIndex and add 1 for new widgets to appear on top
        const maxZIndex = Math.max(0, ...currentScreen.widgets.map(w => w.zIndex || 0));

        const newWidget: BaseWidget = {
            id: generateId(),
            type,
            position,
            size: definition.defaultSize,
            properties: definition.defaultProperties,
            dataBinding: { type: 'static' },
            category: definition.category,
            zIndex: maxZIndex + 1
        };

        setProject(prev => {
            const updatedScreens = prev.screens.map(screen =>
                screen.id === prev.currentScreenId
                    ? { ...screen, widgets: [...screen.widgets, newWidget] }
                    : screen
            );
            return { ...prev, screens: updatedScreens, updatedAt: new Date() };
        });

        setSelectedWidget(newWidget);
        saveToHistory(`Add ${type} widget`);
    }, [saveToHistory, currentScreen.widgets]);

    const updateWidget = useCallback((id: string, updates: Partial<BaseWidget>) => {
        setProject(prev => {
            const updatedScreens = prev.screens.map(screen =>
                screen.id === prev.currentScreenId
                    ? {
                        ...screen,
                        widgets: screen.widgets.map(widget =>
                            widget.id === id ? { ...widget, ...updates } : widget
                        )
                    }
                    : screen
            );
            return { ...prev, screens: updatedScreens, updatedAt: new Date() };
        });

        if (selectedWidget?.id === id) {
            setSelectedWidget(prev => prev ? { ...prev, ...updates } : null);
        }

        saveToHistory(`Update widget`);
    }, [selectedWidget, saveToHistory]);

    const deleteWidget = useCallback((id: string) => {
        setProject(prev => {
            const updatedScreens = prev.screens.map(screen =>
                screen.id === prev.currentScreenId
                    ? { ...screen, widgets: screen.widgets.filter(widget => widget.id !== id) }
                    : screen
            );
            return { ...prev, screens: updatedScreens, updatedAt: new Date() };
        });

        if (selectedWidget?.id === id) {
            setSelectedWidget(null);
        }

        saveToHistory(`Delete widget`);
    }, [selectedWidget, saveToHistory]);

    const handleLayerChange = useCallback((id: string, action: 'front' | 'back' | 'forward' | 'backward') => {
        const widgets = currentScreen.widgets;
        const targetWidget = widgets.find(w => w.id === id);
        if (!targetWidget) return;

        const sortedWidgets = widgets.slice().sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
        const currentIndex = sortedWidgets.findIndex(w => w.id === id);

        let newZIndex: number;

        switch (action) {
            case 'front':
                // Bring to front - highest zIndex + 1
                newZIndex = Math.max(...widgets.map(w => w.zIndex || 0)) + 1;
                break;
            case 'back':
                // Send to back - lowest zIndex - 1
                newZIndex = Math.min(...widgets.map(w => w.zIndex || 0)) - 1;
                break;
            case 'forward':
                // Bring forward - swap with next higher widget
                if (currentIndex < sortedWidgets.length - 1) {
                    const nextWidget = sortedWidgets[currentIndex + 1];
                    newZIndex = (nextWidget.zIndex || 0) + 0.5;
                } else {
                    newZIndex = (targetWidget.zIndex || 0) + 1;
                }
                break;
            case 'backward':
                // Send backward - swap with next lower widget
                if (currentIndex > 0) {
                    const prevWidget = sortedWidgets[currentIndex - 1];
                    newZIndex = (prevWidget.zIndex || 0) - 0.5;
                } else {
                    newZIndex = (targetWidget.zIndex || 0) - 1;
                }
                break;
            default:
                return;
        }

        updateWidget(id, { zIndex: newZIndex });
        saveToHistory(`${action} widget`);
    }, [currentScreen.widgets, updateWidget, saveToHistory]);

    const addScreen = useCallback((name: string) => {
        const newScreen: Screen = {
            id: generateId(),
            name,
            widgets: [],
            backgroundColor: '#000000'
        };

        setProject(prev => ({
            ...prev,
            screens: [...prev.screens, newScreen],
            currentScreenId: newScreen.id,
            updatedAt: new Date()
        }));

        setSelectedWidget(null);
        saveToHistory(`Add screen: ${name}`);
    }, [saveToHistory]);

    const switchScreen = useCallback((screenId: string) => {
        setProject(prev => ({
            ...prev,
            currentScreenId: screenId,
            updatedAt: new Date()
        }));
        setSelectedWidget(null);
    }, []);

    const duplicateScreen = useCallback((screenId: string) => {
        const screenToDuplicate = project.screens.find(s => s.id === screenId);
        if (!screenToDuplicate) return;

        const duplicatedScreen: Screen = {
            ...JSON.parse(JSON.stringify(screenToDuplicate)),
            id: generateId(),
            name: `${screenToDuplicate.name} Copy`,
            widgets: screenToDuplicate.widgets.map(widget => ({
                ...widget,
                id: generateId()
            }))
        };

        setProject(prev => ({
            ...prev,
            screens: [...prev.screens, duplicatedScreen],
            currentScreenId: duplicatedScreen.id,
            updatedAt: new Date()
        }));

        saveToHistory(`Duplicate screen: ${screenToDuplicate.name}`);
    }, [project.screens, saveToHistory]);

    const deleteScreen = useCallback((screenId: string) => {
        if (project.screens.length <= 1) return; // Don't delete the last screen

        const screenToDelete = project.screens.find(s => s.id === screenId);
        const updatedScreens = project.screens.filter(s => s.id !== screenId);

        setProject(prev => ({
            ...prev,
            screens: updatedScreens,
            currentScreenId: prev.currentScreenId === screenId ? updatedScreens[0].id : prev.currentScreenId,
            updatedAt: new Date()
        }));

        setSelectedWidget(null);
        saveToHistory(`Delete screen: ${screenToDelete?.name}`);
    }, [project.screens, saveToHistory]);

    const handleImportProject = useCallback((importedProject: Project) => {
        // Update the project state with the imported project
        setProject(importedProject);
        setSelectedWidget(null);

        // Clear history and add initial state
        historyManager.current = new HistoryManager();
        historyManager.current.addState(importedProject.screens, importedProject.currentScreenId, 'Project imported');
    }, []);

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <EnhancedHeader
                project={project}
                canUndo={historyManager.current.canUndo()}
                canRedo={historyManager.current.canRedo()}
                onUndo={handleUndo}
                onRedo={handleRedo}
                onImportProject={handleImportProject}
            />

            <div className="flex-1 flex overflow-hidden">
                <WidgetLibrary />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <ScreenManager
                        screens={project.screens}
                        currentScreenId={project.currentScreenId}
                        onSwitchScreen={switchScreen}
                        onAddScreen={addScreen}
                        onDuplicateScreen={duplicateScreen}
                        onDeleteScreen={deleteScreen}
                    />

                    <Canvas
                        widgets={currentScreen.widgets}
                        device={project.device}
                        selectedWidget={selectedWidget}
                        onWidgetSelect={setSelectedWidget}
                        onWidgetAdd={addWidget}
                        onWidgetUpdate={updateWidget}
                        onWidgetDelete={deleteWidget}
                        onLayerChange={handleLayerChange}
                        backgroundColor={currentScreen.backgroundColor}
                    />
                </div>

                <PropertiesPanel
                    selectedWidget={selectedWidget}
                    onWidgetUpdate={updateWidget}
                />
            </div>
        </div>
    );
};