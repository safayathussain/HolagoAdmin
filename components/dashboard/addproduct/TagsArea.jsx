import React from 'react'

const TagsArea = ({tagInputValue, setTagInputValue, tagValueArray, handleTagValue, handleRemoveTag}) => {
    return (
        <>
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
                <h5 className="text-md font-bold mb-3">Product Tags</h5>
                <div className="grid grid-cols-4 gap-2">
                    <input
                        type="text"
                        id="productTag"
                        value={tagInputValue}
                        onChange={(e) => setTagInputValue(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none col-span-3"
                    />
                    <button
                        onClick={handleTagValue}
                        className="border text-black font-semibold rounded-md"
                    >
                        Add
                    </button>
                </div>
                <div className="my-3 flex flex-wrap justify-start items-center gap-2">
                    {tagValueArray.map((tag, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center "
                        >
                            <span className="text-md text-black">{tag}</span>
                            <button
                                onClick={() => handleRemoveTag(index)}
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

export default TagsArea