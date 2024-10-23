"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { Loader as LoaderC } from "rsuite";
const Loader = () => {
  return (
    <div className="w-full flex justify-center items-center h-[50vh]">
      <RotatingLines
        visible={true}
        height="60"
        width="60"
        color="#000000"
        strokeColor="#000000"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
