'use client'
import React, { useState } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (newTask: string) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default HomePage;