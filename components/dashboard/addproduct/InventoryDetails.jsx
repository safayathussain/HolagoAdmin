import React from "react";
import PriceAndStock from "./PriceAndStock";
import { ImgUrl } from "@/constants/urls";
import ImagePreview from "@/components/global/input/ImagePreview";
import ImageInput from "@/components/global/input/ImageInput";
import TextInput from "@/components/global/input/TextInput";

const InventoryDetails = ({
  inventory,
  formdata,
  sizeChartImg,
  setSizeChartImg,
  sizeValueArray,
  handleRemoveSize,
  sizeInputValue,
  setsizeInputValue,
  handleSizeValue,
}) => {
  console.log(inventory);
  return (
    <div>
      <div className=" border-b-2 pb-5">
        <h5 className="">Size</h5>
        <div className="flex items-center pb-3 -mt-2">
          <div className="my-3 flex flex-wrap justify-start items-center gap-2 w-1/2">
            {(inventory?.length > 0 ? inventory : sizeValueArray).map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center cursor-pointer "
                >
                  <span className="text-md text-black">{item?.size}</span>
                  <div
                    onClick={() => handleRemoveSize(index)}
                    className="text-gray-300 font-semibold ml-2"
                  >
                    X
                  </div>
                </div>
              )
            )}
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
            {sizeChartImg && (
              <ImagePreview
                imgs={[sizeChartImg]}
                removeImg={() => setSizeChartImg(null)}
              />
            )}

            {!sizeChartImg && (
              <ImageInput
                onChange={(e) => setSizeChartImg(e.target.files[0])}
              />
            )}
          </div>
        </div>
        <div className=" flex gap-2 items-center justify-between mt-3">
          <p>Fabric</p>
          <TextInput
            type="text"
            id="productTag"
            name="fabric"
            defaultValue={formdata?.fabric}
            className="border border-gray-300 rounded-md p-2 focus:outline-none w-1/2"
          />
        </div>
      </div>

      <PriceAndStock items={sizeValueArray} inventory={inventory} />
    </div>
  );
};

export default InventoryDetails;
