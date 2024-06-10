import { useState } from "react";

export default function useImgBBUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImageToImgBB = async (file) => {
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

  const handleUpload = async (file) => {
    if (!file) {
      setError("Please select an image to upload");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const url = await uploadImageToImgBB(file);
      return url && setImageUrl(url);
    } catch (error) {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return { uploading, error, imageUrl, handleUpload };
}
