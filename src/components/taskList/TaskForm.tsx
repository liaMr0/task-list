import React from 'react';
import { SquarePlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CanvasInput from '../CanvasInput';

interface TaskFormProps {
    newTask: string;
    setNewTask: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    setShowElements: (show: boolean) => void;
    tasksExist: boolean;
    showElements: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
    newTask,
    setNewTask,
    handleSubmit,
    setShowElements,
    tasksExist,
}) => (
    <form onSubmit={handleSubmit} className="flex items-center p-2">
        <SquarePlus className="h-6 w-6 text-blue-500 mr-2" />
        <div className="flex-grow px-4 py-2 bg-transparent focus:outline-none">
            <CanvasInput
                value={newTask}
                onChange={setNewTask}
                onFocus={() => setShowElements(true)}
                placeholder="Type to add new task"
            />
        </div>
        {!tasksExist && (
            <Avatar className={`h-8 w-8 transition-opacity duration-300 ${newTask.trim() ? 'opacity-100' : 'opacity-50'}`}>
                <AvatarImage src="/avatar.png" alt="@usuario" className="object-cover" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
        )}
    </form>
);

export default TaskForm;