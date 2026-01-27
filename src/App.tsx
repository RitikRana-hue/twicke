import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EnhancedGuiBuilder } from './components/EnhancedGuiBuilder';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="h-screen bg-gray-50">
                <EnhancedGuiBuilder />
            </div>
        </DndProvider>
    );
}

export default App;