import { ImgUrl } from "@/constants/urls";
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const ImagePreview = ({
  imgs,
  className,
  imgClassName,
  removeImg = () => {},
}) => {
  console.log(imgs)
  return (
    <>
      {imgs.map((item, i) => (
        <div key={i} className="relative w-full">
          <IoIosCloseCircle
            size={30}
            className="absolute right-0 top-0 opacity-50 cursor-pointer z-20 hover:opacity-90 duration-300 text-white"
            onClick={() => removeImg(i)}
          />
          <img
            src={
              typeof item === "string"
                ? ImgUrl+  item
                : URL.createObjectURL(item)
            }
            alt="Uploaded"
            className={`w-full h-full rounded-md ${imgClassName}`}
          />
        </div>
      ))}
    </>
  );
};

export default ImagePreview;
