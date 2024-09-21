"use client";
import AddProductDynamicHead from "@/components/dashboard/addproduct/DynamicHead";
import AddProductRichText from "@/components/dashboard/addproduct/ProductRichText";
import AddProductShortDesRichText from "@/components/dashboard/addproduct/ProductShortDesRichText";
import { FetchApi, fetchApi } from "@/utils/FetchApi";
import useImgBBUpload from "@/utils/useImgBBUpload";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import PriceAndStock from "@/components/dashboard/addproduct/PriceAndStock";
import GeneralDetails from "@/components/dashboard/addproduct/GeneralDetails";
import InventoryDetails from "@/components/dashboard/addproduct/InventoryDetails";
import ShippingDetails from "@/components/dashboard/addproduct/ShippingDetails";
import ImageInput from "@/components/global/input/ImageInput";
import SeoDetails from "@/components/dashboard/addproduct/SeoDetails";
import DraftArea from "@/components/dashboard/addproduct/DraftArea";
import TagsArea from "@/components/dashboard/addproduct/TagsArea";
import ProductsDataBar from "@/components/dashboard/addproduct/ProductsDataBar";
import Category from "@/components/dashboard/addproduct/Category";

export default function AddProductPage() {
  const [tagValueArray, setTagValueArray] = useState([]);
  const [sizeValueArray, setSizeValueArray] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [sizeInputValue, setsizeInputValue] = useState("");
  const [image, setImage] = useState(null);
  const [photoGalary, setPhotoGalary] = useState([])
  const [imageUrl, setimageUrl] = useState([])
  const [featureImg, setfeatureImg] = useState(null)
  const [sizeChartImg, setSizeChartImg] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [categoryTab, setCategoryTab] = useState("all");
  const [categoryIds, setCategoryIds] = useState([]);
  const [productStatus, setProductStatus] = useState("Draft");
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [description, setDescription] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [categories, setcategories] = useState([])
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: '/category/api/get-CategoryList' })
      setcategories(data.data)
    }
    loadData()
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
    setfeatureImg(file)
  };

  const handleGalleryImgFileChange = async (event) => {
    const file = event.target.files[0];
    setPhotoGalary([...photoGalary, file])

  };
  const handleTagValue = (e) => {
    e.preventDefault();
    const newTagValueArray = [...tagValueArray, tagInputValue];
    setTagValueArray(newTagValueArray);
    setTagInputValue("");
  };
  const handleSizeValue = (e) => {
    e.preventDefault();
    const newTagValueArray = [...sizeValueArray, sizeInputValue];
    setSizeValueArray(newTagValueArray);
    setsizeInputValue("");
  };
  const handleRemoveTag = (indexToRemove) => {
    const newTagValueArray = tagValueArray.filter(
      (_, index) => index !== indexToRemove
    );
    setTagValueArray(newTagValueArray);
  };
  const handleRemoveSize = (indexToRemove) => {
    const newTagValueArray = sizeValueArray.filter(
      (_, index) => index !== indexToRemove
    );
    setSizeValueArray(newTagValueArray);
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", e.target.productName.value);
    formData.append("categories", JSON.stringify(categoryIds));
    formData.append("featureImage", featureImg);
    formData.append("isTrash", "false");

    photoGalary.forEach((file, index) => {
      formData.append(`--productsGallery`, file);
    });
    formData.append("productDescription", description);
    formData.append("sizeCharts", sizeChartImg);
    formData.append("productShortDescription", shortDescription);
    formData.append("seoTitle", e.target.seoTitle.value);
    formData.append("seoDescription", e.target.seoDescription.value);
    formData.append("regularPrice", e.target.regularPrice.value);
    formData.append("salePrice", e.target.salePrice.value);
    formData.append("saleStart", new Date(e.target.saleStart.value).toISOString().split('T')[0]);
    formData.append("saleEnd", new Date(e.target.saleEnd.value).toISOString().split('T')[0]);
    formData.append("fabric", e.target.fabric.value);
    formData.append("weight", e.target.weight.value);
    formData.append("dimension_length", e.target.dimension_length.value);
    formData.append("dimension_width", e.target.dimension_width.value);
    formData.append("dimension_height", e.target.dimension_height.value);
    formData.append("tags", JSON.stringify(tagValueArray));

    console.log("Product Data:", formData);

    setIsLoading(true);
    try {
      const { data } = await FetchApi({ url: '/products/api/addProduct', method: 'post', isToast: true, body: formData })

      if (data.code === 200) {
        sizeValueArray.map((item, i) => {
          const quantity = e.target[`inventory_qty_${i}`].value
          const barCode = e.target[`inventory_barcode_${i}`].value
          const available = e.target[`inventory_available_${i}`].checked
          const obj = {
            barCode,
            available,
            quantity,
            size: item
          }
          FetchApi({ url: `/products/api/addInventoryByProductId/${data.data.id}`, method: 'post', body: obj })
        })
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
  const [submitBtnDisabled, setsubmitBtnDisabled] = useState(true)
  useEffect(() => {
    const requiredFields = formRef.current?.querySelectorAll('input[required]');
    const checkFields = () => {
      let allFilled = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          allFilled = false;
        }
      });
      setsubmitBtnDisabled(!allFilled)
    };
    requiredFields?.forEach(field => {
      field.addEventListener('input', checkFields);
    });
    checkFields();
    return () => {
      requiredFields?.forEach(field => {
        field.removeEventListener('input', checkFields);
      });
    };
  }, [formRef.current?.querySelectorAll('input[required]')]);

  return (
    <main className="">
      {isLoading && <Loading />}

      <form ref={formRef} onSubmit={handleAddProduct}>
        <section className="mt-10 flex justify-between items-center">
          <AddProductDynamicHead title={"Add New Product"} />
          <button
            type="submit"
            disabled={submitBtnDisabled}
            className={`text-sm text-white bg-black rounded-md px-3 py-2 ${submitBtnDisabled && 'cursor-not-allowed'}`}
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
                      <img
                        src={URL.createObjectURL(featureImg)}
                        alt="Uploaded"
                        className="w-full h-full rounded-md"
                      />
                    )}

                    {!image && !featureImg ? (
                      <ImageInput onChange={handleProductImgFileChange} className="!h-[200px]" required />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start space-y-3">
                  <h5 className="text-md font-bold mb-3">Image Gallery</h5>
                  <div className="grid grid-cols-3 justify-between items-start gap-5 w-full">
                    {photoGalary.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt="Uploaded"
                        className="object-cover rounded-md w-full h-[90px]"
                      />
                    ))}

                    <div>
                      <ImageInput onChange={handleGalleryImgFileChange} required />

                    </div>
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
              <ProductsDataBar activeTab={activeTab} setActiveTab={setActiveTab} />
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
              <AddProductShortDesRichText setShortDescription={setShortDescription} />
            </div>
          </div>
          <div className="flex flex-col justify-end items-center w-full space-y-5">
            <Category categoryIds={categoryIds} categoryTab={categoryTab} setCategoryIds={setCategoryIds} allCategories={AllCategories} />
            <TagsArea handleRemoveTag={handleRemoveTag} handleTagValue={handleTagValue} tagInputValue={tagInputValue} tagValueArray={tagValueArray} setTagInputValue={setTagInputValue} />
          </div>
        </section>
      </form>
    </main>
  );
}
