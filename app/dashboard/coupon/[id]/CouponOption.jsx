"use client";

import { useState, useEffect } from "react";
import CouponTab from "@/components/dashboard/coupon/dynamic/CouponTab";
import TextInput from "@/components/global/input/TextInput";
import { TagPicker } from "rsuite";
import DateInput from "@/components/global/input/DateInput";
import TimeInput from "@/components/global/input/TimeInput";
import { FetchApi } from "@/utils/FetchApi";
import Button from "@/components/global/primaryButton/Button";
import { formatDate, formatEndOfDay } from "@/utils/functions";
import { useRouter } from "next/navigation";
export default function CouponOption({ type, coupon }) {
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsOptions, setAllProductsOptions] = useState([]);
  const [allCtgOptions, setAllCtgOptions] = useState([]);
  const [allUsersOptions, setAllUsersOptions] = useState([]);
  const router = useRouter();
  console.log(coupon);
  const [formData, setFormData] = useState({
    code: coupon?.code || "",
    coupon_amount: coupon?.coupon_amount || "",
    allow_free_shipping: coupon?.allow_free_shipping || false,
    coupon_expiry: new Date(coupon?.coupon_expiry) || "",
    coupon_expiry_time: new Date(coupon?.coupon_expiry_time) || "",
    minimum_spend: coupon?.minimum_spend || "",
    maximum_spend: coupon?.maximum_spend || "",
    individual_use_only: coupon?.individual_use_only || false,
    exclude_sale_items: coupon?.exclude_sale_items || false,
    included_products: coupon?.included_products || [],
    excluded_products: coupon?.excluded_products || [],
    included_categories: coupon?.included_categories || [],
    excluded_categories: coupon?.excluded_categories || [],
    blocked_accounts: coupon?.blocked_accounts || [],
    usage_limit_per_coupon: coupon?.usage_limit_per_coupon || "",
    usage_limit_per_user: coupon?.usage_limit_per_user || "",
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleTagPickerChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({
        url: "/products/api/get-allProducts",
      });
      const { data: ctg } = await FetchApi({
        url: "/category/api/get-CategoryList",
      });
      const { data: users } = await FetchApi({
        url: "/customer/api/get_all_customers/",
      });
      setAllProducts(data?.data);
      setAllProductsOptions(
        data?.data?.map((item) => ({
          label: item.productName,
          value: item?.id,
        }))
      );
      setAllCtgOptions(
        ctg?.data?.map((item) => ({
          label: item.categoryName,
          value: item?.id,
        }))
      );
      setAllUsersOptions(
        users?.data?.map((item) => ({
          label: item?.phone_number,
          value: item?.id,
        }))
      );
    };
    loadData();
  }, []);
  console.log(formData);
  const freeShippingText = "Check this box if the coupon grants free shipping.";
  const handleAddCoupon = async () => {
    const { data } = await FetchApi({
      url: "discount/api/addDiscount",
      method: "post",
      isToast: true,
      body: {
        ...formData,
        coupon_expiry: formatDate(formData?.coupon_expiry),
        coupon_expiry_time: formatEndOfDay(formData?.coupon_expiry_time),
      },
      callback: () => {},
    });
    if (data?.code === 200) {
      router.push("/dashboard/coupon");
    }
  };
  const couponDataTabs = [
    {
      title: "General",
      content: (
        <section className="border bg-white rounded-md shadow-md p-5 my-10">
          <div className="flex justify-between items-center mt-5">
            <h2 className="text-black font-bold text-2xl">General</h2>
          </div>
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Coupon Code</h4>
              <div className="col-span-2">
                <TextInput
                  name={"code"}
                  onChange={handleInputChange}
                  value={formData.code}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Coupon Amount</h4>
              <div className="col-span-2">
                <TextInput
                  name={"coupon_amount"}
                  onChange={handleInputChange}
                  value={formData.coupon_amount}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Allow Free Shipping</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-start gap-2">
                  <input
                    name="allow_free_shipping"
                    type="checkbox"
                    checked={formData.allow_free_shipping}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <span className="font-semibold text-md">
                    {freeShippingText}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-start items-start my-5">
              <h4 className="text-gray-600 text-sm ">Coupon Expiry Date</h4>
              <div className="flex gap-2">
                <DateInput
                  name="coupon_expiry"
                  value={formData.coupon_expiry}
                  onChange={(value) =>
                    handleTagPickerChange("coupon_expiry", value)
                  }
                />
                <TimeInput
                  name="coupon_expiry_time"
                  value={formData.coupon_expiry_time}
                  onChange={(value) =>
                    handleTagPickerChange("coupon_expiry_time", value)
                  }
                />
              </div>
            </div>
          </div>
        </section>
      ),
    },
    {
      title: "Usage Restrictions",
      content: (
        <section className="border bg-white rounded-md shadow-md p-5 my-10">
          <div className="flex justify-between items-center mt-5">
            <h2 className="text-black font-bold text-2xl">
              Usage Restrictions
            </h2>
          </div>
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Minimum Spend</h4>
              <div className="col-span-2">
                <TextInput
                  name={"minimum_spend"}
                  onChange={handleInputChange}
                  value={formData.minimum_spend}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Maximum Spend</h4>
              <div className="col-span-2">
                <TextInput
                  name={"maximum_spend"}
                  onChange={handleInputChange}
                  value={formData.maximum_spend}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Individual Use Only</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-start gap-2">
                  <input
                    name="individual_use_only"
                    type="checkbox"
                    checked={formData.individual_use_only}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <span className="font-semibold text-md">
                    {
                      "Check this box if the coupon cannot be used in conjunction with other coupons."
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Exclude sale items</h4>
              <div className="col-span-2">
                <div className="flex justify-start items-start gap-2">
                  <input
                    name="exclude_sale_items"
                    type="checkbox"
                    checked={formData.exclude_sale_items}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <span className="font-semibold text-md">
                    {
                      "Check this box if the coupon should not apply to items on sale. Per-item coupons will only work if the item is not on sale. Per-cart coupons will only work if there are items in the cart that are not on sale."
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-[2px] bg-gray-100 my-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Products</h4>
              <div className="col-span-2">
                <TagPicker
                  name="included_products"
                  onChange={(e) =>
                    handleTagPickerChange("included_products", e)
                  }
                  data={allProductsOptions}
                  className="w-full !shadow-none hover:!border-[#e5e5ea] "
                  placeholder="Select Products"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Exclude Products</h4>
              <div className="col-span-2">
                <TagPicker
                  name="excluded_products"
                  onChange={(e) =>
                    handleTagPickerChange("excluded_products", e)
                  }
                  data={allProductsOptions}
                  className="w-full !shadow-none hover:!border-[#e5e5ea] "
                  placeholder="Select Exclude Products"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Categories</h4>
              <div className="col-span-2">
                <TagPicker
                  name="included_categories"
                  onChange={(e) =>
                    handleTagPickerChange("included_categories", e)
                  }
                  data={allCtgOptions}
                  className="w-full !shadow-none hover:!border-[#e5e5ea] "
                  placeholder="Select Categories"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Exclude Categories</h4>
              <div className="col-span-2">
                <TagPicker
                  name="excluded_categories"
                  onChange={(e) =>
                    handleTagPickerChange("excluded_categories", e)
                  }
                  data={allCtgOptions}
                  className="w-full !shadow-none hover:!border-[#e5e5ea] "
                  placeholder="Select Exclude Categories"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start my-5">
              <h4 className="text-gray-600 text-sm ">Blocked Accounts</h4>
              <div className="col-span-2">
                <TagPicker
                  name="blocked_accounts"
                  onChange={(e) => handleTagPickerChange("blocked_accounts", e)}
                  data={allUsersOptions}
                  className="w-full !shadow-none hover:!border-[#e5e5ea] "
                  placeholder="Select Blocked Accounts"
                />
              </div>
            </div>
          </div>
        </section>
      ),
    },
    {
      title: "Usage Limits",
      content: (
        <section className="border bg-white rounded-md shadow-md p-5 my-10">
          <div className="flex justify-between items-center mt-5">
            <h2 className="text-black font-bold text-2xl">Usage Limits</h2>
          </div>
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Usage limit per coupon</h4>
              <div className="col-span-2">
                <TextInput
                  name={"usage_limit_per_coupon"}
                  onChange={handleInputChange}
                  value={formData.usage_limit_per_coupon}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Usage limit per user</h4>
              <div className="col-span-2">
                <TextInput
                  name={"usage_limit_per_user"}
                  onChange={handleInputChange}
                  value={formData.usage_limit_per_user}
                />
              </div>
            </div>
          </div>
        </section>
      ),
    },
  ];
  return (
    <div>
      <div>
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAddCoupon}>
            {type === "add" ? "Add Coupon" : "Save Changes"}
          </Button>
        </div>
        <CouponTab tabs={couponDataTabs} />
      </div>
    </div>
  );
}
