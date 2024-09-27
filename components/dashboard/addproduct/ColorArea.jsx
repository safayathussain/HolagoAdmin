import React from 'react'

const ColorsArea = ({colorInputValue, setcolorInputValue, colorValueArray, handlecolorValue, handleRemovecolor}) => {
    return (
        <>
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
                <h5 className="text-md font-bold mb-3">Product Colors</h5>
                <div className="grid grid-cols-4 gap-2">
                    <input
                        type="text"
                        id="productcolor"
                        value={colorInputValue}
                        onChange={(e) => setcolorInputValue(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none col-span-3"
                    />
                    <button
                        onClick={handlecolorValue}
                        className="border text-black font-semibold rounded-md"
                    >
                        Add
                    </button>
                </div>
                <div className="my-3 flex flex-wrap justify-start items-center gap-2">
                    {colorValueArray?.map((color, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center "
                        >
                            <span className="text-md text-black">{color}</span>
                            <button
                                onClick={() => handleRemovecolor(index)}
                                className="text-gray-300 font-semibold ml-2"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ColorsArea