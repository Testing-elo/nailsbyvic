import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({
    label,
    error,
    className = '',
    ...props
}: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-2 text-elegantBlack">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-mediumGray'
                    } bg-elegantWhite text-elegantBlack focus:outline-none focus:border-elegantBlack transition-colors duration-200 ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
