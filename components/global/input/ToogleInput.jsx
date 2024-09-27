import React from 'react'

const ToogleInput = ({ label, id, name, type = 'text', className, placeholder, rounded = 'xl', ...etc }) => {
    return (
        <div>
            <div>
                <label className="relative flex justify-between items-center group  text-xl">
                    {label}
                    <input name={name} id={id} {...etc} type="checkbox" className={`absolute hidden ${className} left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md`} />
                    <span className="w-[72px] h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-[#78788029] rounded-full duration-300 ease-in-out peer-checked:bg-[#34C759] after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8 cursor-pointer"></span>
                </label>
            </div>
        </div>
    )
}

export default ToogleInput