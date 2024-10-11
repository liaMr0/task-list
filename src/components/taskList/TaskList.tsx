'use client'
import React, { useState } from 'react';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useTaskManager } from '@/hooks/useTaskManager';
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
        return <div className="w-11/12 mx-auto mt-8">Loading tasks...</div>;
    }

    if (error) {
        return <div className="w-11/12 mx-auto mt-8 text-red-500">{error}</div>;
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
                    showElements={showElements}
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