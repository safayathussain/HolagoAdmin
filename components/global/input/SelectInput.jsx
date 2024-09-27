import React from 'react'

const SelectInput = ({ label, id, name, type = 'text', className, placeholder, options, value= '', ...etc }) => {
    return (
        <div>
            <div>
                <label htmlFor={id} className="block text-gray-800 font-medium text-sm">{label}</label>
                <div className="mt-0.5">
                    <select
                        placeholder={placeholder}
                        id={id}
                        type={type}
                        name={name}
                        spellCheck='false'
                        value={value}
                        className={`block w-full  p-2 border-[1.5px] rounded-xl border-gray-300 focus:border-primary focus:border-[1.5px] focus:ring-0 ${className}`}
                        {...etc}
                    >
                        {
                            options.map((item, i) => <option key={i} value={item.value} className='!p-2'>{item.name}</option>)
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SelectInput