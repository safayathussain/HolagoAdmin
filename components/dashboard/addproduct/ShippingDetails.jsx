import TextInput from '@/components/global/input/TextInput'
import React from 'react'

const ShippingDetails = ({formdata}) => {
  return (
    <div>
         <div className="grid grid-cols-2 justify-between items-center">
                    <span>Weight (KG)</span>
                    <TextInput
                      type="text"
                      id="weight"
                      name="weight"
                      defaultValue={formdata?.weight}
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 justify-between items-center py-5">
                    <span>Dimension</span>
                    <div className="grid grid-cols-3 gap-3">
                      <TextInput
                      defaultValue={formdata?.dimension_length}

                        type="number"
                        id="length"
                        name="dimension_length"
                        placeholder="Length"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                        required
                      />
                      <TextInput
                      defaultValue={formdata?.dimension_width}

                        type="number"
                        id="width"
                        name="dimension_width"
                        placeholder="Width"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                        required
                      />
                      <TextInput
                      defaultValue={formdata?.dimension_height}

                        type="number"
                        id="height"
                        name="dimension_height"
                        placeholder="Height"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
    </div>
  )
}

export default ShippingDetails