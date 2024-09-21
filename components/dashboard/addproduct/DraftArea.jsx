import React from 'react'

const DraftArea = ({
    productStatus,
    toggleProductStatus
}) => {
    return (
        <>
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
                <h5 className="text-md font-bold mb-3">{productStatus}</h5>
                <div className="mt-3 font-semibold text-sm">
                    <div>
                        <span>Status: {productStatus}</span>
                    </div>
                    <div className="mt-3">
                        <span>Published on: {new Date().toDateString()} </span>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={toggleProductStatus}
                    className="text-white text-sm bg-black px-3 py-2 rounded-md mt-5 w-full uppercase font-semibold hover:bg-gray-800 focus:outline-none"
                >
                    Toggle to
                    {productStatus === "Published" ? " Draft" : " Published"}
                </button>
            </div>
        </>
    )
}

export default DraftArea