"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { dataUrl, debounce, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

const TransformedImage = ({
  image,
  type,
  title,
  isTransforming,
  setTransformStatus,
  transformationConfig,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = () => {};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">Transformed</h3>

        {hasDownload && (
          <Button
            className="download-btn bg-transparent hover:bg-slate-200"
            onClick={downloadHandler}
          >
            <Image
              src={"/assets/icons/download.svg"}
              alt="download"
              width={24}
              height={24}
              className="pb-[6px]"
            />
          </Button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => {
              setTransformStatus && setTransformStatus("loaded");
            }}
            onError={() => {
              debounce(() => {
                setTransformStatus && setTransformStatus("error");
              }, 8000);
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src={"/assets/icons/spinner.svg"}
                alt={"transforming"}
                width={50}
                height={50}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">
          <p>Transformed Image</p>
        </div>
      )}
    </div>
  );
};

export default TransformedImage;
