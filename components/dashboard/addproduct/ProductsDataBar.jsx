import React from 'react'

const ProductsDataBar = ({
    activeTab,
    setActiveTab
}) => {
  return (
    <>
        <h5 className="text-md font-bold mb-3">Product Data</h5>
              <div className="flex justify-between items-center gap-5 mb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab("general")}
                  className={`${activeTab === "general"
                    ? "border-gray-500 text-black "
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } flex items-center py-2 px-4 border-b-2 text-center font-medium focus:outline-none bg-gray-100 w-full rounded-md`}
                >
                  General
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("inventory")}
                  className={`${activeTab === "inventory"
                    ? "border-gray-500 text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } flex items-center py-2 px-4 border-b-2 text-center font-medium focus:outline-none bg-gray-100 w-full rounded-md`}
                >
                  Inventory
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("shipping")}
                  className={`${activeTab === "shipping"
                    ? "border-gray-500 text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } flex items-center py-2 px-4 border-b-2 text-center font-medium focus:outline-none bg-gray-100 w-full rounded-md`}
                >
                  Shipping
                </button>
              </div>
    </>
  )
}

export default ProductsDataBar