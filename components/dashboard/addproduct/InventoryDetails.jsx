import React from 'react'
import PriceAndStock from './PriceAndStock'
import { ImgUrl } from '@/constants/urls'

const InventoryDetails = ({ formdata, sizeChartImg, setSizeChartImg, sizeValueArray, handleRemoveSize, sizeInputValue, setsizeInputValue, handleSizeValue, featureImg, image, handleProductImgFileChange }) => {
    return (
        <div >
            <div className=' border-b-2 pb-5'>

                <h5 className="">Size</h5>
                <div className="flex items-center pb-3 -mt-2">

                    <div className="my-3 flex flex-wrap justify-start items-center gap-2 w-1/2">
                        {sizeValueArray.map((tag, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center cursor-pointer "
                            >
                                <span className="text-md text-black">{tag}</span>
                                <div
                                    onClick={() => handleRemoveSize(index)}
                                    className="text-gray-300 font-semibold ml-2"
                                >
                                    X
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-1/2">
                        <div className=" flex gap-2">
                            <input
                                type="text"
                                id="productTag"
                                value={sizeInputValue}
                                onChange={(e) => setsizeInputValue(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                            />
                            <button
                                onClick={handleSizeValue}
                                className="border text-black font-semibold rounded-md px-3 whitespace-nowrap"
                            >
                                Add Size
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p className="pb-3 ">Size Chart</p>
                    <div className="flex flex-col w-1/2">
                        {(formdata?.sizeCharts || sizeChartImg) && (
                            <img
                                src={!sizeChartImg ? (ImgUrl + formdata?.sizeCharts) : URL.createObjectURL(sizeChartImg)}
                                alt="Uploaded"
                                required
                                className="w-full h-full rounded-md"
                            />
                        )}

                        {!image && !sizeChartImg && !formdata?.sizeCharts ? (
                            <div>
                                <input
                                    type="file"
                                    id="featuredImageUpload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => setSizeChartImg(e.target.files[0])}
                                />
                                <label
                                    htmlFor="featuredImageUpload"
                                    className="z-20 flex flex-col-reverse items-center justify-center w-full h-[200px] cursor-pointer border py-20 bg-gray-200 rounded-md"
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
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className=" flex gap-2 items-center justify-between mt-3">
                    <p>Fabric</p>
                    <input
                        type="text"
                        id="productTag"
                        name='fabric'
                        defaultValue={formdata?.fabric}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none w-1/2"
                    />
                </div>
            </div>

            <PriceAndStock items={sizeValueArray} />

        </div>
    )
}

export default InventoryDetails