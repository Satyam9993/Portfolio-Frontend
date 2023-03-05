import React from "react";
import {
  ShimmerTitle,
  ShimmerButton,
  ShimmerThumbnail,
} from "react-shimmer-effects";

const Loader = () => {
  return (
    <div className="items-center">
      <div className="m-auto max-w-6xl p-6 sm:p-0 sm:m-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 max-w-md flex flex-col justify-center">
            <div className="md:text-5xl text-2xl uppercase font-black">
              <ShimmerTitle line={3} gap={20} variant="primary" />
            </div>
            <div className="text-xl mt-4">
              <ShimmerTitle line={1} gap={20} variant="secondary" />
            </div>
            <div className="my-5 h-16">
              <ShimmerButton size="lg" />
            </div>
          </div>
          <div className="flex md:justify-end w-full md:w-1/2 -mt-5">
            <div
              style={{
                backgroundImage:
                  "https://assets-global.website-files.com/5b5a66e9f3166b36708705fa/5dea7a12bb83ab1f13040de5_cx-dots.svg",
                backgroundRepeat: "no-repeat",
              }}
              className="m-0"
            >
              <div
                className="shadow-2xl min-w-lg z-10 rounded-full mt-6"
                style={{ minWidth: "18rem" }}
              >
                <ShimmerThumbnail height={350} rounded />
                <div className="text-2xl p-10 bg-white">
                  <ShimmerTitle line={7} gap={20} variant="primary" />
                  <span className="text-center text-sm bg-white py-3 font-medium">
                    <ShimmerTitle line={1} gap={20} variant="secondary" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
