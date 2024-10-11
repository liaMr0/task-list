import React, { ReactNode } from 'react';

interface ButtonProps {
    icon: ReactNode;
    text: string;
    disabled: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ icon, text, disabled, className }) => (
    <button
        disabled={disabled}
        className={`flex transition-all w-10 custom:w-28 items-center justify-center p-2 text-sm rounded ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'
            } ${className}`}
    >
        {icon}
        <span className="ml-1 hidden custom:inline">{text}</span>
    </button>
);

export default Button;