"use client";
import AddProductDynamicHead from "@/components/dashboard/addproduct/DynamicHead";
import AddProductRichText from "@/components/dashboard/addproduct/ProductRichText";
import AddProductShortDesRichText from "@/components/dashboard/addproduct/ProductShortDesRichText";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchApi } from "@/utils/FetchApi";
import useImgBBUpload from "@/utils/useImgBBUpload";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [tagValueArray, setTagValueArray] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [image, setImage] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productGallery, setProductGallery] = useState([]);
  const { error, handleUpload, imageUrl, uploading } = useImgBBUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [categoryTab, setCategoryTab] = useState("all");
  const [categoryId, setCategoryId] = useState("");
  const [productStatus, setProductStatus] = useState("Draft");
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");

  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const router = useRouter();

  const AllCategories = categories?.categories?.categories;

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
    setIsLoading(true);

    try {
      const uploadedImageUrl = await handleUpload(file);
      setProductImage(uploadedImageUrl);
      setIsLoading(false);
      console.log(uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };
  const handleGalleryUpload = async (file) => {
    const apiKey = "7a0f43e157252e0ca3031dea1d8dcccd";
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  const handleGalleryImgFileChange = async (event) => {
    const files = event.target.files;
    const maxImages = 9;

    setIsLoading(true);

    const uploadPromises = [];

    for (let i = 0; i < Math.min(files.length, maxImages); i++) {
      uploadPromises.push(handleGalleryUpload(files[i]));
    }

    try {
      const uploadedImageUrls = await Promise.all(uploadPromises);
      setProductGallery((prevGallery) => [...prevGallery, ...uploadedImageUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleTagValue = (e) => {
    e.preventDefault();
    const newTagValueArray = [...tagValueArray, tagInputValue];
    setTagValueArray(newTagValueArray);
    setTagInputValue(""); // Clear input value after adding
  };
  const handleRemoveTag = (indexToRemove) => {
    const newTagValueArray = tagValueArray.filter(
      (_, index) => index !== indexToRemove
    );
    setTagValueArray(newTagValueArray);
  };
  const toggleProductStatus = () => {
    setProductStatus(productStatus === "Draft" ? "Published" : "Draft");
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productDescription = localStorage.getItem("Description") || "";
    const productShortDescription =
      localStorage.getItem("ShortDescription") || "";

    const productData = {
      productName: e.target.productName.value,
      categoryId: categoryId,
      productImage: imageUrl,
      isTrash: false,
      productGallery: productGallery,
      productVideos: [],
      productDescription: productDescription,
      productShortDescription: productShortDescription,
      productStatus: productStatus,
      seo: {
        productTitle: titleInputValue,
        prodDescription: descriptionInputValue,
        productTags: tagValueArray,
        productNotes: e.target.productNotes.value,
      },
      general: {
        regularPrice: parseFloat(e.target.regularPrice?.value) || 0,
        salePrice: parseFloat(e.target.salePrice?.value) || 0,
        // salesStart: e.target.salesStart?.value || null,
        // salesEnd: e.target.salesEnd?.value || null,
        taxStatus: e.target.taxStatus?.value || "",
        taxClass: e.target.taxClass?.value || "",
      },
      inventory: {
        sku: e.target.productSku?.value || "",
        stockManagement: e.target.stockManagement?.checked || false,
        stockStatus: e.target.stockStatus?.value || "Out of Stock",
        soldIndividually: e.target.soldIndividually?.checked || false,
        inventoryStatus: e.target.inventoryStatus?.value || "Online & Offline",
      },
      shipping: {
        weight: parseFloat(e.target.weight?.value) || 0,
        productDimensions: {
          length: parseFloat(e.target.length?.value) || 0,
          width: parseFloat(e.target.width?.value) || 0,
          height: parseFloat(e.target.height?.value) || 0,
        },
      },
      date: new Date().toISOString(),
    };

    console.log("Product Data:", productData);

    setIsLoading(true);
    try {
      const response = await fetchApi(
        "/product/addProduct",
        "POST",
        productData
      );

      setIsLoading(false);

      if (response) {
        router.push("/dashboard/products");
      } else {
        const errorData = await response.json();
        console.log("Failed to add product:", errorData);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("An error occurred:", err);
    }
  };

  return (
    <main className="">
      {isLoading && <Loading />}

      <form onSubmit={handleAddProduct}>
        <section className="mt-10 flex justify-between items-center">
          <AddProductDynamicHead title={"Add New Product"} />
          <button
            type="submit"
            disabled={categoryId === "" ? true : false}
            className={`text-sm text-white bg-black rounded-md px-3 py-2 ${
              categoryId === "" ? "cursor-not-allowed" : "cursor-pointer"
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
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="w-full h-full rounded-md"
                      />
                    )}

                    {!image && !imageUrl ? (
                      <div>
                        <input
                          type="file"
                          id="featuredImageUpload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleProductImgFileChange}
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
                <div className="flex flex-col justify-between items-start space-y-3">
                  <h5 className="text-md font-bold mb-3">Image Gallery</h5>
                  <div className="grid grid-cols-3 justify-between items-start gap-5 w-full">
                    {productGallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Uploaded"
                        className="object-cover rounded-md w-full h-[90px]"
                      />
                    ))}

                    <div>
                      <input
                        type="file"
                        id="galleryImageUpload"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleGalleryImgFileChange}
                      />
                      <label
                        htmlFor="galleryImageUpload"
                        className="z-20 flex flex-col-reverse items-center justify-center w-full h-[90px] cursor-pointer border py-2 bg-gray-200 rounded-md"
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
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold">Product SEO</h5>
              <div className="mt-5">
                {/* preview */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="p-3 border bg-white rounded-md shadow-md w-full mb-5 md:col-span-2">
                    <div>
                      <div className="flex justify-start items-center gap-3">
                        <img
                          src="https://i.ibb.co/2k6sk2y/cropped-Favicon.png"
                          alt="cropped-Favicon"
                          border="0"
                          className="w-7 h-7 p-1 object-cover rounded-full bg-gray-200"
                        />
                        <div className="flex flex-col">
                          <p>Best Electronics</p>
                          <p className="text-xs">
                            www.bestelectronics.com.bd - Electronics Store
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
                        <img
                          src={
                            imageUrl ||
                            "https://i.ibb.co/bJXhK7w/3256026-200.png"
                          }
                          alt="Deep-Blue-300x300"
                          className="w-full object-cover"
                        />
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
                    value={titleInputValue}
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
                    value={descriptionInputValue}
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

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between items-start">
                <div className="flex flex-col justify-between items-start space-y-3">
                  <h5 className="text-md font-bold mb-3">Featured Video</h5>
                  <div className="flex flex-col w-full">
                    <input
                      type="file"
                      id="featuredVideoUpload"
                      className="hidden"
                    />
                    <label
                      for="featuredVideoUpload"
                      className="z-20 flex flex-col-reverse items-center justify-center h-[430px] cursor-pointer border py-20 bg-gray-200 rounded-md"
                    >
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.16602 5.8335H17.9993"
                          stroke="black"
                          stroke-width="1.25"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.25 1.66675L11.75 5.83341"
                          stroke="black"
                          stroke-width="1.25"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.41602 1.6665L5.91602 5.83317"
                          stroke="black"
                          stroke-width="1.25"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.0827 17.4998C6.35073 17.4998 4.48476 17.4998 3.32538 16.3405C2.16602 15.1811 2.16602 13.3151 2.16602 9.58317C2.16602 5.85122 2.16602 3.98525 3.32538 2.82587C4.48476 1.6665 6.35073 1.6665 10.0827 1.6665C13.8146 1.6665 15.6806 1.6665 16.84 2.82587C17.9994 3.98525 17.9993 5.85122 17.9993 9.58317"
                          stroke="black"
                          stroke-width="1.25"
                          stroke-linecap="round"
                        />
                        <path
                          d="M12.166 14.9998H18.8327M15.4993 18.3332V11.6665"
                          stroke="black"
                          stroke-width="1.25"
                          stroke-linecap="round"
                        />
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start space-y-3">
                  <h5 className="text-md font-bold mb-3">Video Gallery</h5>
                  <div className="grid grid-cols-3 justify-between items-start gap-5 ">
                    {/* <div className="h-[160px] w-full object-cover content-center">
                    <img
                      className="w-full h-full rounded-md"
                      src="https://i.ibb.co/HdPgcbd/Rectangle-2.png"
                      alt=""
                    />
                  </div> */}

                    <div>
                      <input
                        type="file"
                        id="galleryVideoUpload"
                        className="hidden "
                      />
                      <label
                        for="galleryVideoUpload"
                        className="z-20 flex flex-col-reverse items-center justify-center w-[95px] h-[160px] cursor-pointer border py-2 bg-gray-200 rounded-md"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.16602 5.8335H17.9993"
                            stroke="black"
                            stroke-width="1.25"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.25 1.66675L11.75 5.83341"
                            stroke="black"
                            stroke-width="1.25"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.41602 1.6665L5.91602 5.83317"
                            stroke="black"
                            stroke-width="1.25"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.0827 17.4998C6.35073 17.4998 4.48476 17.4998 3.32538 16.3405C2.16602 15.1811 2.16602 13.3151 2.16602 9.58317C2.16602 5.85122 2.16602 3.98525 3.32538 2.82587C4.48476 1.6665 6.35073 1.6665 10.0827 1.6665C13.8146 1.6665 15.6806 1.6665 16.84 2.82587C17.9994 3.98525 17.9993 5.85122 17.9993 9.58317"
                            stroke="black"
                            stroke-width="1.25"
                            stroke-linecap="round"
                          />
                          <path
                            d="M12.166 14.9998H18.8327M15.4993 18.3332V11.6665"
                            stroke="black"
                            stroke-width="1.25"
                            stroke-linecap="round"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">Product Description</h5>
              <AddProductRichText />
            </div>

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">Product Data</h5>
              <div className="flex justify-between items-center gap-5 mb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab("general")}
                  className={`${
                    activeTab === "general"
                      ? "border-gray-500 text-black "
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } flex items-center py-2 px-4 border-b-2 text-center font-medium focus:outline-none bg-gray-100 w-full rounded-md`}
                >
                  General
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("inventory")}
                  className={`${
                    activeTab === "inventory"
                      ? "border-gray-500 text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } flex items-center py-2 px-4 border-b-2 text-center font-medium focus:outline-none bg-gray-100 w-full rounded-md`}
                >
                  Inventory
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("shipping")}
                  className={`${
                    activeTab === "shipping"
                      ? "border-gray-500 text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } flex items-center py-2 px-4 border-b-2 text-center font-medium focus:outline-none bg-gray-100 w-full rounded-md`}
                >
                  Shipping
                </button>
              </div>
              <div>
                <div
                  className={`
                  ${activeTab == "general" ? "block" : "hidden"}
                  `}
                >
                  <div className="grid grid-cols-2 gap-3 border-b-2 pb-5">
                    <div className="flex flex-col space-y-1 w-full">
                      <label
                        htmlFor="regularPrice"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Regular Price
                      </label>
                      <input
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
                        type="number"
                        id="salePrice"
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
                        name="salesStart"
                        defaultValue={new Date().toISOString().split("T")[0]}
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
                        name="salesEnd"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="taxStatus"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Tax Status
                      </label>
                      <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                        <svg
                          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 412 232"
                        >
                          <path
                            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                            fill="#648299"
                            fill-rule="nonzero"
                          />
                        </svg>
                        <select
                          id="taxStatus"
                          name="taxStatus"
                          className="text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                        >
                          <option value="Taxable">Taxable</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="taxClass"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Tax Class
                      </label>
                      <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                        <svg
                          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 412 232"
                        >
                          <path
                            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                            fill="#648299"
                            fill-rule="nonzero"
                          />
                        </svg>
                        <select
                          id="taxClass"
                          name="taxClass"
                          className="text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                        >
                          <option value="Standard">Standard</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="inventoryStatus"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Inventory Status
                      </label>
                      <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                        <svg
                          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 412 232"
                        >
                          <path
                            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                            fill="#648299"
                            fill-rule="nonzero"
                          />
                        </svg>
                        <select
                          id="inventoryStatus"
                          name="inventoryStatus"
                          className="text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                        >
                          <option value="Online & Offline">
                            Online & Offline
                          </option>
                          <option value="Only Online">Only Online</option>
                          <option value="Only Offline">Only Offline</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`
                  ${activeTab == "inventory" ? "block" : "hidden"}
                  `}
                >
                  <div className="grid grid-cols-2 justify-between items-center">
                    <label htmlFor="productSku">SKU</label>
                    <input
                      type="text"
                      id="productSku"
                      name="productSku"
                      className="border border-gray-300 rounded-md p-2 focus:outline-none uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 justify-between items-center my-5">
                    <span>Stock Management</span>
                    <div className="flex justify-start items-center gap-3">
                      <input
                        id="stockManagement"
                        type="checkbox"
                        name="stockManagement"
                        className="w-4 h-4 bg-gray-100 rounded border-gray-300 dark:border-gray-600"
                      />
                      <label
                        htmlFor="stockManagement"
                        className="font-semibold"
                      >
                        Track stock quantity for this product
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 justify-between items-start border-b-2 py-5">
                    <span>Stock Status</span>
                    <div>
                      <div className="flex justify-start items-center gap-3 mb-1">
                        <input
                          id="In Stock"
                          type="radio"
                          name="stockStatus"
                          value="In Stock"
                          className="w-4 h-4 bg-gray-100 rounded border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="In Stock" className="font-semibold">
                          In Stock
                        </label>
                      </div>
                      <div className="flex justify-start items-center gap-3 mb-1">
                        <input
                          id="Out of Stock"
                          type="radio"
                          name="stockStatus"
                          value="Out of Stock"
                          className="w-4 h-4 bg-gray-100 rounded border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="Out Of Stock" className="font-semibold">
                          Out of Stock
                        </label>
                      </div>
                      <div className="flex justify-start items-center gap-3">
                        <input
                          id="On Backorder"
                          type="radio"
                          name="stockStatus"
                          value="On Backorder"
                          className="w-4 h-4 bg-gray-100 rounded border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="On Backorder" className="font-semibold">
                          On Backorder
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 justify-between items-center mt-5">
                    <span>Sold Individually</span>
                    <div className="flex justify-start items-center gap-3">
                      <input
                        id="soldIndividually"
                        type="checkbox"
                        name="soldIndividually"
                        className="w-4 h-4 bg-gray-100 rounded border-gray-300 dark:border-gray-600"
                      />
                      <label
                        htmlFor="soldIndividually"
                        className="font-semibold"
                      >
                        Limit purchase to 1 item per order
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className={`
                  ${activeTab == "shipping" ? "block" : "hidden"}
                  `}
                >
                  <div className="grid grid-cols-2 justify-between items-center">
                    <span>Weight (KG)</span>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      className="border border-gray-300 rounded-md p-2 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 justify-between items-center py-5">
                    <span>Dimension</span>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        id="length"
                        name="length"
                        placeholder="Length"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                      />
                      <input
                        type="number"
                        id="width"
                        name="width"
                        placeholder="Width"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                      />
                      <input
                        type="number"
                        id="height"
                        name="height"
                        placeholder="Height"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">
                Product Short Description
              </h5>
              <AddProductShortDesRichText />
            </div>
          </div>
          {/* main two section */}
          <div className="flex flex-col justify-end items-center w-full space-y-5">
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">{productStatus}</h5>
              <div className="mt-3 font-semibold text-sm">
                <div>
                  <span>Status: {productStatus}</span>
                </div>
                <div className="mt-3">
                  <span>Published on: {new Date().toDateString()} </span>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleProductStatus}
                className="text-white text-sm bg-black px-3 py-2 rounded-md mt-5 w-full uppercase font-semibold hover:bg-gray-800 focus:outline-none"
              >
                Toggle to
                {productStatus === "Published" ? " Draft" : " Published"}
              </button>
            </div>

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">Product Categories</h5>
              <div className="flex justify-between items-center gap-5 mb-5">
                <button
                  type="button"
                  className={`${
                    categoryTab === "all"
                      ? "border-gray-500 text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } flex items-center py-2 px-4 border-b-2 text-center font-medium focus:outline-none bg-gray-100 w-full rounded-md`}
                  onClick={() => setCategoryTab("all")}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`${
                    categoryTab === "popular"
                      ? "border-gray-500 text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } flex items-center py-2 px-4 border-b-2 text-center font-medium focus:outline-none bg-gray-100 w-full rounded-md`}
                  onClick={() => setCategoryTab("popular")}
                >
                  Popular
                </button>
              </div>
              <div
                className={`
                ${categoryTab === "all" ? "block" : "hidden"}
                `}
              >
                {AllCategories?.map((category, index) => (
                  <ul key={index} className="font-semibold">
                    <li className="text-md flex justify-start items-center gap-2 mb-1">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-${index}`}
                          type="checkbox"
                          onClick={() => setCategoryId(category?._id)}
                          className="w-4 h-4 bg-gray-500 rounded"
                        />
                      </div>
                      {category.categoryName}
                    </li>
                    {category?.subCategories?.length > 0 && (
                      <li>
                        <ul className="ml-5">
                          {category?.subCategories?.map(
                            (subcategory, subIndex) => (
                              <li
                                key={subIndex}
                                className="text-md flex justify-start items-center gap-2 mb-1"
                              >
                                <div className="flex items-center">
                                  <input
                                    id={`checkbox-${index}-${subIndex}`}
                                    type="checkbox"
                                    onClick={() =>
                                      setCategoryId(subcategory?._id)
                                    }
                                    className="w-4 h-4 bg-gray-500 rounded"
                                  />
                                </div>
                                {subcategory.categoryName}
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                    )}
                  </ul>
                ))}
              </div>
              <div
                className={`
                ${categoryTab === "popular" ? "block" : "hidden"}
                `}
              >
                Non Found For This Time
              </div>
            </div>

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">Product Tags</h5>
              <div className="grid grid-cols-4 gap-2">
                <input
                  type="text"
                  id="productTag"
                  value={tagInputValue}
                  onChange={(e) => setTagInputValue(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none col-span-3"
                />
                <button
                  onClick={handleTagValue}
                  className="border text-black font-semibold rounded-md"
                >
                  Add
                </button>
              </div>
              <div className="my-3 flex flex-wrap justify-start items-center gap-2">
                {tagValueArray.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-full px-3 py-1 flex justify-between items-center "
                  >
                    <span className="text-md text-black">{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(index)}
                      className="text-gray-300 font-semibold ml-2"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">Product Notes</h5>
              <div className="w-full bg-gray-100 p-3 mb-5 rounded-md">
                <p className="mb-3">
                  Payment to be made upon delivery. Order status changed from
                  Pending payment to Processing.
                </p>
                <p className="text-gray-600">Feb 28, 2024, 17:59</p>
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="productNotes"
                  className="text-sm font-semibold text-gray-600"
                >
                  Note
                </label>
                <textarea
                  id="productNotes"
                  name="productNotes"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
