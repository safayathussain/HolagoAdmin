"use client";
import AddProductDynamicHead from "@/components/dashboard/addproduct/DynamicHead";
import { FetchApi } from "@/utils/FetchApi";
import react, { useEffect, useRef, useState } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import GeneralDetails from "@/components/dashboard/addproduct/GeneralDetails";
import InventoryDetails from "@/components/dashboard/addproduct/InventoryDetails";
import ShippingDetails from "@/components/dashboard/addproduct/ShippingDetails";
import ImageInput from "@/components/global/input/ImageInput";
import ProductsDataBar from "@/components/dashboard/addproduct/ProductsDataBar";
import Category from "@/components/dashboard/addproduct/Category";
import ColorsArea from "@/components/dashboard/addproduct/ColorArea";
import ImagePreview from "@/components/global/input/ImagePreview";
import {} from "lodash";
const SeoDetails = react.lazy(() =>
  import("@/components/dashboard/addproduct/SeoDetails")
);
const AddProductRichText = react.lazy(() =>
  import("@/components/dashboard/addproduct/ProductRichText")
);
const AddProductShortDesRichText = react.lazy(() =>
  import("@/components/dashboard/addproduct/ProductShortDesRichText")
);
export default function AddProductPage() {
  const [colorValueArray, setColorValueArray] = useState([]);
  const [sizeValueArray, setSizeValueArray] = useState([]);
  const [colorInputValue, setColorInputValue] = useState("");
  const [sizeInputValue, setsizeInputValue] = useState("");
  const [image, setImage] = useState(null);
  const [photoGalary, setPhotoGalary] = useState([]);
  const [imageUrl, setimageUrl] = useState([]);
  const [featureImg, setfeatureImg] = useState(null);
  const [sizeChartImg, setSizeChartImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [categoryTab, setCategoryTab] = useState("all");
  const [categoryIds, setCategoryIds] = useState([]);
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [categories, setcategories] = useState([]);
  const [inventory, setInventory] = useState([]);
  console.log(sizeValueArray);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({
        url: "/category/api/get-CategoryList",
      });
      setcategories(data.data);
    };
    loadData();
  }, []);

  const router = useRouter();

  const AllCategories = categories;

  const calculateTitleProgress = (value) => {
    let progress = (value.length / 100) * 100;
    progress = Math.min(progress, 100);
    return progress;
  };
  const calculateDescriptionProgress = (value) => {
    let progress = (value.length / 200) * 100;
    progress = Math.min(progress, 100);
    return progress;
  };
  const getTitleProgressBarColor = () => {
    const progress = calculateTitleProgress(titleInputValue);
    if (progress < 30) {
      return "bg-[#F26522]";
    } else if (progress <= 60) {
      return "bg-[#7AD03A]";
    } else {
      return "bg-[#F26522]";
    }
  };
  const getDescriptionProgressBarColor = () => {
    const progress = calculateDescriptionProgress(descriptionInputValue);
    if (progress < 30) {
      return "bg-[#F26522]";
    } else if (progress <= 100) {
      return "bg-[#7AD03A]";
    } else {
      return "bg-[#F26522]";
    }
  };
  const handleTitleInputChange = (event) => {
    setTitleInputValue(event.target.value);
  };
  const handleDescriptionInputChange = (event) => {
    setDescriptionInputValue(event.target.value);
  };
  const handleProductImgFileChange = async (event) => {
    const file = event.target.files[0];
    setfeatureImg(file);
  };

  const handleGalleryImgFileChange = async (event) => {
    const file = event.target.files[0];
    setPhotoGalary([...photoGalary, file]);
  };
  const handleColorValue = (e) => {
    e.preventDefault();
    const newcolorValueArray = [...colorValueArray, colorInputValue];
    setColorValueArray(newcolorValueArray);
    setColorInputValue("");
  };
  const handleSizeValue = (e) => {
    e.preventDefault();
    const newInventory = [
      ...inventory,
      {
        size: sizeInputValue,
        available: true,
        barCode: "",
        quantity: 0,
      },
    ];
    setInventory(newInventory);
    setsizeInputValue("");
  };
  const handleRemoveColor = (indexToRemove) => {
    const newcolorValueArray = colorValueArray.filter(
      (_, index) => index !== indexToRemove
    );
    setColorValueArray(newcolorValueArray);
  };
  const handleRemoveSize = (indexToRemove) => {
    const newsizeValueArray = sizeValueArray.filter(
      (_, index) => index !== indexToRemove
    );
    const newInventory = inventory.filter(
      (_, index) => index !== indexToRemove
    );
    setInventory(newInventory);
    setSizeValueArray(newsizeValueArray);
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", e.target.productName.value);
    formData.append("category", categoryIds);
    formData.append("featureImage", featureImg);
    formData.append("isTrash", "false");
    photoGalary.forEach((file, index) => {
      formData.append(`images`, file);
    });
    formData.append("productDescription", description);
    formData.append("sizeCharts", sizeChartImg);
    formData.append("productShortDescription", shortDescription);
    formData.append("seoTitle", e.target.seoTitle.value);
    formData.append("seoDescription", e.target.seoDescription.value);
    formData.append("regularPrice", e.target.regularPrice.value);
    formData.append("salePrice", e.target.salePrice.value);
    e.target.saleStart.value &&
      formData.append(
        "saleStart",

        new Date(e.target.saleStart.value).toISOString().split("T")[0]
      );
    e.target.saleEnd.value &&
      formData.append(
        "saleEnd",

        new Date(e.target.saleEnd.value).toISOString().split("T")[0]
      );
    formData.append("fabric", e.target.fabric.value);
    formData.append("weight", e.target.weight.value);
    formData.append("dimension_length", e.target.dimension_length.value);
    formData.append("dimension_width", e.target.dimension_width.value);
    formData.append("dimension_height", e.target.dimension_height.value);
    formData.append("color", colorValueArray);

    setIsLoading(true);
    try {
      const { data } = await FetchApi({
        url: "/products/api/create-product/",
        method: "post",
        isToast: true,
        body: formData,
      });
      if (data.product.id) {
        inventory.map((item, i) => {
          const quantity = e.target[`inventory_qty_${i}`].value;
          const barCode = e.target[`inventory_barcode_${i}`].value;
          const available = e.target[`inventory_available_${i}`].checked;
          const obj = {
            barCode,
            available,
            quantity,
            size: item.size,
            product_id: data.product.id,
          };
          FetchApi({
            url: `/products/api/addInventoryByProductId/${data.product.id}`,
            method: "post",
            body: obj,
          });
        });
        setIsLoading(false);
        router.push("/dashboard/products");
      } else {
        setIsLoading(false);
        console.log("Failed to add product:", data);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("An error occurred:", err);
    }
  };
  const formRef = useRef();
  const [submitBtnDisabled, setsubmitBtnDisabled] = useState(true);
  useEffect(() => {
    const requiredFields = formRef.current?.querySelectorAll("input[required]");
    const checkFields = () => {
      let allFilled = true;
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          allFilled = false;
        }
      });
      setsubmitBtnDisabled(!allFilled);
    };
    requiredFields?.forEach((field) => {
      field.addEventListener("input", checkFields);
    });
    checkFields();
    return () => {
      requiredFields?.forEach((field) => {
        field.removeEventListener("input", checkFields);
      });
    };
  }, [formRef.current?.querySelectorAll("input[required]")]);

  return (
    <main className="">
      {isLoading && <Loading />}

      <form ref={formRef} onSubmit={handleAddProduct}>
        <section className="mt-10 flex justify-between items-center">
          <AddProductDynamicHead title={"Add New Product"} />
          <button
            type="submit"
            disabled={submitBtnDisabled}
            className={`text-sm text-white bg-black rounded-md px-3 py-2 ${
              submitBtnDisabled && "cursor-not-allowed"
            }`}
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 justify-between items-start gap-5 w-full my-10">
          {/* main one section */}
          <div className="flex flex-col justify-start items-center w-full md:col-span-2 space-y-5">
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">General</h5>
              <div className="grid grid-cols-1">
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="productName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    required
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
              </div>
            </div>

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between items-start">
                <div className="flex flex-col justify-between items-start space-y-3">
                  <h5 className="text-md font-bold mb-3">Featured Image</h5>
                  <div className="flex flex-col w-full">
                    {featureImg && (
                      <ImagePreview
                        imgs={[featureImg]}
                        removeImg={() => setfeatureImg(null)}
                      />
                    )}

                    {!image && !featureImg ? (
                      <ImageInput
                        onChange={handleProductImgFileChange}
                        setValue={setfeatureImg}
                        value={featureImg}
                        className="!h-[200px]"
                        required
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start space-y-3">
                  <h5 className="text-md font-bold mb-3">Image Gallery</h5>
                  <div className="grid grid-cols-3 justify-between items-start gap-5 w-full">
                    <ImagePreview
                      imgClassName={"max-w-1/3"}
                      imgs={photoGalary}
                      removeImg={(index) => {
                        setPhotoGalary(
                          photoGalary.filter((_, i) => i !== index)
                        );
                      }}
                    />

                    <ImageInput
                      // value={photoGalary}
                      // setValue={setPhotoGalary}
                      onChange={handleGalleryImgFileChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <SeoDetails
              calculateTitleProgress={calculateTitleProgress}
              descriptionInputValue={descriptionInputValue}
              getTitleProgressBarColor={getTitleProgressBarColor}
              handleTitleInputChange={handleTitleInputChange}
              imageUrl={imageUrl}
              titleInputValue={titleInputValue}
              handleDescriptionInputChange={handleDescriptionInputChange}
              getDescriptionProgressBarColor={getDescriptionProgressBarColor}
              calculateDescriptionProgress={calculateDescriptionProgress}
            />

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">Product Description</h5>
              <AddProductRichText setDescription={setDescription} />
            </div>

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <ProductsDataBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <div>
                <div
                  className={`
                  ${activeTab == "general" ? "block" : "hidden"}
                  `}
                >
                  <GeneralDetails />
                </div>
                <div
                  className={`
                  ${activeTab == "inventory" ? "block" : "hidden"}
                  `}
                >
                  <InventoryDetails
                    featureImg={featureImg}
                    handleProductImgFileChange={handleProductImgFileChange}
                    handleRemoveSize={handleRemoveSize}
                    handleSizeValue={handleSizeValue}
                    image={image}
                    sizeInputValue={sizeInputValue}
                    setsizeInputValue={setsizeInputValue}
                    sizeValueArray={sizeValueArray}
                    sizeChartImg={sizeChartImg}
                    setSizeChartImg={setSizeChartImg}
                    inventory={inventory}
                  />
                </div>
                <div
                  className={`
                  ${activeTab == "shipping" ? "block" : "hidden"}
                  `}
                >
                  <ShippingDetails />
                </div>
              </div>
            </div>
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">
                Product Short Description
              </h5>
              <AddProductShortDesRichText
                setShortDescription={setShortDescription}
              />
            </div>
          </div>
          <div className="flex flex-col justify-end items-center w-full space-y-5">
            <Category
              categoryIds={categoryIds}
              categoryTab={categoryTab}
              setCategoryIds={setCategoryIds}
              allCategories={AllCategories}
            />
            <ColorsArea
              handleRemovecolor={handleRemoveColor}
              handlecolorValue={handleColorValue}
              colorInputValue={colorInputValue}
              colorValueArray={colorValueArray}
              setcolorInputValue={setColorInputValue}
            />
          </div>
        </section>
      </form>
    </main>
  );
}
