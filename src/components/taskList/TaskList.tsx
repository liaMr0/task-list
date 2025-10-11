'use client'
import React, { useState } from 'react';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useTaskManager } from '@/hooks/useTaskManager';
import { SkeletonTaskList } from '@/components/Skeleton';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import ActionBar from './ActionBar';

const TaskList: React.FC = () => {
    const { tasks, addTask, editTask, isLoading, error } = useTaskManager();
    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [showElements, setShowElements] = useState(false);
    const isNarrowScreen = useMobileDetection();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim()) {
            if (editingTaskId !== null) {
                editTask(editingTaskId, newTask.trim());
                setEditingTaskId(null);
            } else {
                addTask(newTask.trim());
            }
            setNewTask('');
        }
    };

    const hideElements = () => {
        setShowElements(false);
        setNewTask('');
        setEditingTaskId(null);
    };

    if (isLoading) {
        return <SkeletonTaskList count={5} />;
    }

    if (error) {
        return (
            <div className="w-11/12 mx-auto mt-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 text-lg font-medium mb-2">⚠️ Error</p>
                    <p className="text-red-500">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto mt-8 ">
            <div className="bg-white rounded-lg">
                <TaskForm
                    newTask={newTask}
                    setNewTask={setNewTask}
                    handleSubmit={handleSubmit}
                    setShowElements={setShowElements}
                    tasksExist={tasks.length > 0}
                />
            </div>
            <div className={`mt-2 ${tasks.length > 0 ? 'max-h-[60vh] overflow-y-auto' : ''}`}>
                {tasks.map((task, index) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        isFirst={index === 0}
                        onEdit={() => {
                            setEditingTaskId(task.id);
                            setNewTask(task.description);
                            setShowElements(true);
                        }}
                        showElements={showElements}
                    />
                ))}
            </div>
            <ActionBar
                showElements={showElements}
                newTask={newTask}
                isNarrowScreen={isNarrowScreen}
                editingTaskId={editingTaskId}
                hideElements={hideElements}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export { TaskList };