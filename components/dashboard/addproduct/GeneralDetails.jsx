import React from 'react'

const GeneralDetails = ({ formdata }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 border-b-2 pb-5">
        <div className="flex flex-col space-y-1 w-full">
          <label
            htmlFor="regularPrice"
            className="text-sm font-semibold text-gray-600"
          >
            Regular Price
          </label>
          <input
            defaultValue={formdata?.regularPrice}
            type="number"
            id="regularPrice"
            name="regularPrice"
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none"
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label
            htmlFor="salePrice"
            className="text-sm font-semibold text-gray-600"
          >
            Sale Price
          </label>
          <input
            defaultValue={formdata?.salePrice}

            type="number"
            id="salePrice"
            required
            name="salePrice"
            className="border border-gray-300 rounded-md p-2 focus:outline-none"
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label
            htmlFor="salesStart"
            className="text-sm font-semibold text-gray-600"
          >
            Sale Start (Optional)
          </label>
          <input
            type="date"
            id="salesStart"
            name="saleStart"
            defaultValue={formdata?.saleStart && new Date(formdata?.saleStart).toISOString().split('T')[0]}
            className="border border-gray-300 rounded-md p-2 focus:outline-none"
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label
            htmlFor="salesEnd"
            className="text-sm font-semibold text-gray-600"
          >
            Sale End (Optional)
          </label>
          <input
            type="date"
            id="salesEnd"
            name="saleEnd"
            defaultValue={formdata?.saleEnd &&  new Date(formdata?.saleEnd)?.toISOString().split('T')[0]}

            className="border border-gray-300 rounded-md p-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default GeneralDetails