import { Square } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Task } from '@/types/task';
import { getStyledText } from '@/helpers/getStyledText';

interface TaskItemProps {
    task: Task;
    isFirst: boolean;
    onEdit: () => void;
    showElements: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isFirst, onEdit, showElements }) => (
    <div className="bg-white border-t border-gray-200 p-2 relative">
        <div className="flex items-start justify-between">
            <div className="flex items-start flex-grow" onClick={onEdit}>
                <Square className="h-4 w-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <div className="flex-grow break-words overflow-wrap-anywhere">
                    {getStyledText(task.description || '', !showElements)}
                </div>
            </div>
            {isFirst && (
                <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
                    <AvatarImage src="/avatar.png" alt="@usuario" className="object-cover" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            )}
        </div>
    </div>
);

export default TaskItem;

