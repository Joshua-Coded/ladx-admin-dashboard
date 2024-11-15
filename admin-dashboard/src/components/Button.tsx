import React from "react";

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button', variant = 'primary' }) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-semibold';
    const variantStyles = variant === 'primary'
        ? 'bg-blue-500 text-white hover:bg-blue-600'
        : 'bg-gray-500 text-white hover:bg-gray-600';

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles}`}
        >
            {label}
        </button>
    );
};

export default Button;
