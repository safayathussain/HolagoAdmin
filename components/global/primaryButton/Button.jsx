'use client'
import React from 'react';

const Button = ({ children, variant = 'primary', className, rounded="xl", size = 'md', onClick= () => {},disabled, ...etc }) => {
    let variantClassName = '';
    let sizeClassName = ''
    switch (variant) {
        case 'primary':
            variantClassName = 'bg-black text-white ';
            break;
        case 'outline':
            variantClassName = 'border border-black text-black ';
            break;
    }
    switch (size) {
        case 'sm':
            sizeClassName = 'text-xs px-2 py-1 rounded-md';
            break;
        case 'md':
            sizeClassName = 'text-sm md:text-base px-5 py-2 rounded-xl';
            break;
    }

    return (
        <button className={`px-4 py-2 ${variantClassName} ${sizeClassName} ${className} !rounded-${rounded} ${disabled && 'opacity-60'}`} onClick={onClick} {...etc}>
            {children}
        </button>
    );
};

export default Button;
