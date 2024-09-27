import React from 'react'

const ImageInput = ({onChange, id = Math.random().toString(), className="", value = null, setValue = () => {}, ...etc}) => {
    return (
        <div>
            <div>
                <input
                {...etc}
                    type="file"
                    id={id}
                    className="hidden"
                    accept="image/*"
                    onChange={onChange}
                />
                <label
                    htmlFor={id}
                    onDoubleClick={() => setValue(null)}
                    className={`z-20 flex flex-col-reverse items-center justify-center w-full h-[90px] cursor-pointer border  bg-gray-200 rounded-md ${className}`}
                >
                    <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.0925 2.4917C6.35684 2.4917 4.48901 2.4917 3.32849 3.65177C2.16797 4.81185 2.16797 6.67896 2.16797 10.4132C2.16797 14.1473 2.16797 16.0145 3.32849 17.1746C4.48901 18.3347 6.35684 18.3347 10.0925 18.3347C13.8281 18.3347 15.6959 18.3347 16.8565 17.1746C18.017 16.0145 18.017 14.1473 18.017 10.4132V9.99626"
                            stroke="black"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                        />
                        <path
                            d="M4.66602 17.4913C8.17433 13.5319 12.117 8.28093 17.9993 12.2192"
                            stroke="black"
                            strokeWidth="1.25"
                        />
                        <path
                            d="M15.4982 1.66504V8.33847M18.8362 4.98087L12.1602 4.99327"
                            stroke="black"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
            </div>
        </div>
    )
}

export default ImageInput