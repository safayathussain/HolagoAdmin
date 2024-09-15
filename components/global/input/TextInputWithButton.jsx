import React from 'react'

const TextInputWithButton = ({ label, id, name, type = 'text', className, placeholder, buttonText = '', buttonclassName='', rounded='xl', ...etc }) => {
    return (
        <div>
            <div>
                <label htmlFor={id} className="block text-gray-800 font-medium text-sm">{label}</label>
                <div className="mt-0.5 flex items-center">
                    <input
                        placeholder={placeholder}
                        id={id}
                        type={type}
                        name={name}
                        spellCheck='false'
                        className={`block w-full bg-white placeholder:text-sm md:placeholder:text-base rounded-${rounded} p-2 border-r-0 !rounded-r-none border-[1.5px] border-gray-200 focus:border-gray-300 focus:outline-none focus:border-[1.5px] focus:ring-0 ${className}`}
                        {...etc}
                    />
                    <button className={`border border-l-0 rounded-${rounded} p-2.5 rounded-l-none text-sm ${buttonClass}`}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TextInputWithButton