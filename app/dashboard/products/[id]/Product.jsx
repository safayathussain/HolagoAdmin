"use client";
import AddProductDynamicHead from "@/components/dashboard/addproduct/DynamicHead";
import AddProductRichText from "@/components/dashboard/addproduct/ProductRichText";
import AddProductShortDesRichText from "@/components/dashboard/addproduct/ProductShortDesRichText";
import { FetchApi } from "@/utils/FetchApi";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GeneralDetails from "@/components/dashboard/addproduct/GeneralDetails";
import InventoryDetails from "@/components/dashboard/addproduct/InventoryDetails";
import ShippingDetails from "@/components/dashboard/addproduct/ShippingDetails";
import ImageInput from "@/components/global/input/ImageInput";
import SeoDetails from "@/components/dashboard/addproduct/SeoDetails";
import ProductsDataBar from "@/components/dashboard/addproduct/ProductsDataBar";
import Category from "@/components/dashboard/addproduct/Category";
import Loading from "../../loading";
import { ImgUrl } from "@/constants/urls";
import ColorsArea from "@/components/dashboard/addproduct/ColorArea";
import ImagePreview from "@/components/global/input/ImagePreview";

export default function Product({ product: existingProduct }) {
  console.log(existingProduct);
  const { id } = useParams();
  const [colorValueArray, setcolorValueArray] = useState(
    existingProduct?.color || []
  );
  const [sizeValueArray, setSizeValueArray] = useState([]);
  const [colorInputValue, setcolorInputValue] = useState("");
  const [sizeInputValue, setsizeInputValue] = useState("");
  const [image, setImage] = useState(null);
  const [photoGalary, setPhotoGalary] = useState(existingProduct?.images || []);
  const [imageUrl, setimageUrl] = useState([]);
  const [featureImg, setfeatureImg] = useState(
    existingProduct?.featureImage || null
  );
  const [sizeChartImg, setSizeChartImg] = useState(
    existingProduct?.sizeCharts || null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
  const [categoryTab, setCategoryTab] = useState("all");
  const [categoryIds, setCategoryIds] = useState([]);
  const [titleInputValue, setTitleInputValue] = useState(
    existingProduct?.seoTitle || ""
  );
  const [descriptionInputValue, setDescriptionInputValue] = useState(
    existingProduct?.seoDescription || ""
  );
  const [description, setDescription] = useState(
    existingProduct?.productDescription || ""
  );
  const [shortDescription, setShortDescription] = useState(
    existingProduct?.productShortDescription || ""
  );
  const [categories, setcategories] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [savedInventory, setSavedInventory] = useState([]);
  const [inventoryToDelete, setinventoryToDelete] = useState([]);
  const initialValues = {
    productName: existingProduct?.productName || "",
    categories: existingProduct?.categories || [],
    featureImage: existingProduct?.featureImage || "",
    productsGallery: existingProduct?.productsGallery || [],
    productDescription: existingProduct?.productDescription || "",
    sizeCharts: existingProduct?.sizeCharts || null,
    productShortDescription: existingProduct?.productShortDescription || "",
    seoTitle: existingProduct?.seoTitle || "",
    seoDescription: existingProduct?.seoDescription || "",
    regularPrice: existingProduct?.regularPrice || "",
    salePrice: existingProduct?.salePrice || "",
    saleStart: existingProduct?.saleStart || "",
    saleEnd: existingProduct?.saleEnd || "",
    fabric: existingProduct?.fabric || "",
    weight: existingProduct?.weight || "",
    dimension_length: existingProduct?.dimension_length || "",
    dimension_width: existingProduct?.dimension_width || "",
    dimension_height: existingProduct?.dimension_height || "",
    color: existingProduct?.color || [],
  };
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({
        url: "/category/api/get-CategoryList",
      });
      const { data: inventoryData } = await FetchApi({
        url: `/products/api/inventory/${id}`,
      });
      setcategories(data.data);
      setInventory(inventoryData.data);
      setSavedInventory(inventoryData.data);
    };
    loadData();
  }, []);
  useEffect(() => {
    if (existingProduct?.id) {
      if (categoryIds?.length === 0) {
        setCategoryIds(existingProduct?.category);
      }
      setfeatureImg(existingProduct?.featureImage);
      setSizeChartImg(existingProduct?.sizeCharts);
      setDescription(existingProduct?.productDescription);
      setShortDescription(existingProduct?.productShortDescription);
      setPhotoGalary(existingProduct.images);
      setIsLoading(false);
    }
  }, [existingProduct]);
  const router = useRouter();
  console.log(categoryIds);
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
    setcolorValueArray(newcolorValueArray);
    setcolorInputValue("");
  };
  const handleSizeValue = (e) => {
    e.preventDefault();
    const newInventory = [
      ...inventory,
      {
        size: sizeInputValue,
        available: true,
        barCode: "",
        product: id,
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
    setcolorValueArray(newcolorValueArray);
  };
  const handleRemoveSize = (indexToRemove) => {
    const selectedInventory = inventory[indexToRemove];
    const newsizeValueArray = sizeValueArray.filter(
      (_, index) => index !== indexToRemove
    );
    const newInventory = inventory.filter((item, i) => i !== indexToRemove);
    if (selectedInventory.id) {
      setinventoryToDelete([...inventoryToDelete, selectedInventory]);
    }
    setInventory(newInventory);
    setSizeValueArray(newsizeValueArray);
  };
  const formData = new FormData();
  const appendIfChanged = (key, value) => {
    if (JSON.stringify(value) !== JSON.stringify(initialValues[key])) {
      formData.append(key, value);
    }
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    formData.append("productName", e.target.productName.value);
    formData.append("category", categoryIds);
    if (typeof featureImg !== "string") {
      formData.append("featureImage", featureImg);
    }
    formData.append("isTrash", "false");

    // formData.append(`productsGallery`, photoGalary);
    photoGalary.forEach((file, index) => {
      typeof file.image !== "string" && formData.append(`images[]`, file);
    });

    formData.append("productDescription", description);
    if (typeof sizeChartImg !== "string") {
    }
    appendIfChanged("sizeCharts", sizeChartImg);
    formData.append("productShortDescription", shortDescription);
    formData.append("seoTitle", e.target.seoTitle.value);
    formData.append("seoDescription", e.target.seoDescription.value);
    formData.append("regularPrice", e.target.regularPrice.value);
    formData.append("salePrice", e.target.salePrice.value);
    formData.append(
      "saleStart",
      e.target.saleStart.value &&
        new Date(e.target.saleStart.value).toISOString().split("T")[0]
    );
    formData.append(
      "saleEnd",
      e.target.saleEnd.value &&
        new Date(e.target.saleEnd.value).toISOString().split("T")[0]
    );

    formData.append("fabric", e.target.fabric.value);
    formData.append("weight", e.target.weight.value);
    formData.append("dimension_length", e.target.dimension_length.value);
    formData.append("dimension_width", e.target.dimension_width.value);
    formData.append("dimension_height", e.target.dimension_height.value);
    formData.append("color", JSON.stringify(colorValueArray));

    // setIsLoading(true);
    try {
      const { data } = await FetchApi({
        url: `/products/api/editProduct/${id}`,
        method: "put",
        isToast: true,
        body: formData,
      });

      if (data.status === 200) {
        inventory.map((item, i) => {
          const quantity = e.target[`inventory_qty_${i}`].value;
          const barCode = e.target[`inventory_barcode_${i}`].value;
          const available = e.target[`inventory_available_${i}`].checked;
          const obj = {
            barCode: barCode,
            available: available,
            quantity: quantity,
            size: item.size,
            product_id: Number(id),
          };
          const isExists = savedInventory.find((inv) => inv.size === item.size);
          if (isExists) {
            FetchApi({
              url: `/products/api/editInventoryByProductId/${item.id}`,
              method: "put",
              body: obj,
            });
          } else {
            FetchApi({
              url: `/products/api/addInventoryByProductId/${id}`,
              method: "post",
              body: obj,
            });
          }
        });
        inventoryToDelete.map((item) => {
          FetchApi({
            url: `/products/api/deleteInventoryByProductId/${item.id}`,
            method: "delete",
          });
        });
        setIsLoading(false);
        // router.push("/dashboard/products");
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
          <AddProductDynamicHead title={initialValues.productName} />
          <button
            type="submit"
            disabled={submitBtnDisabled}
            className={`text-sm text-white bg-black rounded-md px-3 py-2 ${
              submitBtnDisabled && "cursor-not-allowed"
            }`}
          >
            {isLoading ? "Saving Product..." : "Save Product"}
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
                    defaultValue={initialValues?.productName}
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
                        removeImg={() => {
                          setfeatureImg(null);
                        }}
                      />
                    )}

                    {!featureImg ? (
                      <ImageInput
                        value={featureImg}
                        setValue={setfeatureImg}
                        onChange={handleProductImgFileChange}
                        className="!h-[200px]"
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
                      imgs={photoGalary.map((item) =>
                        typeof item.image === "string" ? item.image : item
                      )}
                      removeImg={(index) => {
                        setPhotoGalary(
                          photoGalary.filter((_, i) => i !== index)
                        );
                      }}
                    />
                    <div>
                      <ImageInput onChange={handleGalleryImgFileChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SeoDetails
              formdata={initialValues}
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
              {description && (
                <AddProductRichText
                  preValue={initialValues.productDescription}
                  setDescription={setDescription}
                />
              )}
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
                  <GeneralDetails formdata={initialValues} />
                </div>
                <div
                  className={`
                  ${activeTab == "inventory" ? "block" : "hidden"}
                  `}
                >
                  <InventoryDetails
                    formdata={initialValues}
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
                  <ShippingDetails formdata={initialValues} />
                </div>
              </div>
            </div>
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">
                Product Short Description
              </h5>
              {shortDescription && (
                <AddProductShortDesRichText
                  preValue={initialValues.productShortDescription}
                  setShortDescription={setShortDescription}
                />
              )}
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
              setcolorInputValue={setcolorInputValue}
            />
          </div>
        </section>
      </form>
    </main>
  );
}
