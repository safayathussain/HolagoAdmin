import Image from 'next/image'
import React from 'react'

const SeoDetails = ({
    titleInputValue,
    descriptionInputValue,
    imageUrl,
    handleTitleInputChange,
    getTitleProgressBarColor,
    calculateTitleProgress,
    handleDescriptionInputChange,
    getDescriptionProgressBarColor,
    calculateDescriptionProgress,
    formdata
}) => {
    return (
        <>
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
                <h5 className="text-md font-bold">Product SEO</h5>
                <div className="mt-5">
                    {/* preview */}
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="p-3 border bg-white rounded-md shadow-md w-full mb-5 md:col-span-2">
                            <div>
                                <div className="flex justify-start items-center gap-3">
                                    {/* <img
                          src="https://i.ibb.co/2k6sk2y/cropped-Favicon.png"
                          alt="cropped-Favicon"
                          border="0"
                          className="w-7 h-7 p-1 object-cover rounded-full bg-gray-200"
                        /> */}
                                    <div className="flex flex-col">
                                        <p>holago</p>
                                        <p className="text-xs">
                                            www.holago.com.bd -  Store
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[#3764D7] text-lg font-semibold mt-3">
                                        {titleInputValue}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-3 justify-between items-start gap-3 mt-3 text-md">
                                    <div className="col-span-2">
                                        <span>{descriptionInputValue}</span>
                                    </div>
                                    {/* <Image
                                    width={300}
                                    height={300}
                                        src={
                                            imageUrl ||
                                            "https://i.ibb.co/bJXhK7w/3256026-200.png"
                                        }
                                        alt="Deep-Blue-300x300"
                                        className="w-full object-cover"
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>

                    {/* SEO Title */}
                    <div className="flex flex-col space-y-1 w-full">
                        <label
                            htmlFor="seoTitle"
                            className="text-sm font-semibold text-gray-600"
                        >
                            SEO Title
                        </label>
                        <input
                            type="text"
                            id="seoTitle"
                            name="seoTitle"
                            required
                            value={titleInputValue || formdata?.seoTitle}
                            onChange={handleTitleInputChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none"
                        />
                        <div className="w-full h-2 bg-gray-300 rounded-full">
                            <div
                                className={`h-full ${getTitleProgressBarColor()} rounded-lg`}
                                style={{
                                    width: `${calculateTitleProgress(titleInputValue)}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                    {/* SEO Description */}
                    <div className="flex flex-col space-y-1 w-full mt-5">
                        <label
                            htmlFor="seoDescription"
                            className="text-sm font-semibold text-gray-600"
                        >
                            SEO Description
                        </label>
                        <textarea
                            id="seoDescription"
                            required
                            name="seoDescription"
                            value={descriptionInputValue|| formdata?.seoDescription}
                            onChange={handleDescriptionInputChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none"
                        />
                        <div className="w-full h-2 bg-gray-300 rounded-full">
                            <div
                                className={`h-full ${getDescriptionProgressBarColor()} rounded-lg`}
                                style={{
                                    width: `${calculateDescriptionProgress(
                                        descriptionInputValue
                                    )}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeoDetails