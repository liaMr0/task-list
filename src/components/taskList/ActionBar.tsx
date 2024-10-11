import React from 'react';
import { Maximize2, Calendar, Sun, Disc, LockOpen, Save, Plus, X } from 'lucide-react';
import Button from '../Button';

interface ActionBarProps {
    showElements: boolean;
    newTask: string;
    isNarrowScreen: boolean;
    editingTaskId: number | null;
    hideElements: () => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
    showElements,
    newTask,
    isNarrowScreen,
    editingTaskId,
    hideElements,
    handleSubmit
}) => (
    <div className={`bg-[#FAFBFB] flex items-center shadow-md border-t justify-between rounded-bl rounded-br p-2 rounded-b-lg ${showElements ? '' : 'hidden'}`}>
        <div className={`flex items-center  ${isNarrowScreen ? 'space-x-1' : 'space-x-6'}`}>
            <Button
                icon={<Maximize2 size={20} />}
                text="Open"
                disabled={!newTask.trim()}
                className="bg-[#EAF0F5] mr-2 text-gray-800 disabled:text-gray-400"
            />
            <div className="flex space-x-2">
                <Button
                    icon={<Calendar size={20} />}
                    text="Today"
                    disabled={!newTask.trim()}
                    className={`opacity-50 ${isNarrowScreen ? 'border-none' : 'border border-[#c6cdd1]'}`}
                />
                <Button
                    icon={<LockOpen size={20} />}
                    text="Public"
                    disabled={!newTask.trim()}
                    className={`opacity-50 text-#8A94A6 ${isNarrowScreen ? 'border-none' : 'border border-[#c6cdd1]'}`}
                />
                <Button
                    icon={<Sun size={20} />}
                    text="Highlight"
                    disabled={!newTask.trim()}
                    className={`opacity-50 ${isNarrowScreen ? 'border-none' : 'border border-[#c6cdd1]'}`}
                />
                <Button
                    icon={<Disc size={20} />}
                    text="Estimation"
                    disabled={!newTask.trim()}
                    className={`opacity-50 ${isNarrowScreen ? 'border-none' : 'border border-[#c6cdd1]'}`}
                />
            </div>
        </div>
        <div className="flex space-x-2">
            {!isNarrowScreen && (
                <button
                    onClick={hideElements}
                    className="px-4 py-2 transition-all bg-[#EAF0F5] text-gray-800 rounded hover:bg-gray-200"
                >
                    Cancel
                </button>
            )}
            <button
                onClick={(e) => {
                    if (!newTask.trim()) {
                        hideElements();
                    } else {
                        handleSubmit(e as React.FormEvent);
                    }
                }}
                className={`flex items-center justify-center transition-all text-white rounded hover:bg-blue-800 ${isNarrowScreen ? 'p-0 w-10 h-10 bg-[#0D55CF]' : 'px-4 py-2 bg-[#0D55CF]'}`}
            >
                {isNarrowScreen
                    ? editingTaskId !== null
                        ? <Save className="h-6 w-6 text-white" />
                        : newTask.trim()
                            ? <Plus className="h-6 w-6 text-white" />
                            : <X className="h-6 w-6 text-white" />
                    : editingTaskId !== null
                        ? 'Update'
                        : newTask.trim()
                            ? 'Add'
                            : 'Ok'}
            </button>
        </div>
    </div>
);

export default ActionBar