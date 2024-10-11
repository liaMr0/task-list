import { useState, useEffect } from 'react';
import { Task } from '@/types/task';

export const useTaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/tasks');
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();
            setTasks(Array.isArray(data.tasks) ? data.tasks : []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to load tasks. Please try again later.');
            setTasks([]);
        } finally {
            setIsLoading(false);
        }
    };

    const addTask = async (description: string) => {
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description }),
            });
            if (!response.ok) throw new Error('Failed to add task');
            const newTask = await response.json();
            setTasks(prevTasks => [newTask, ...prevTasks]);
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Failed to add task. Please try again.');
        }
    };

    const editTask = async (id: number, description: string) => {
        try {
            const response = await fetch('/api/tasks', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, description }),
            });
            if (!response.ok) throw new Error('Failed to update task');
            const updatedTask = await response.json();
            setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Failed to update task. Please try again.');
        }
    };

    return { tasks, addTask, editTask, isLoading, error };
};