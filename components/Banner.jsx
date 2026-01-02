import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="mt-24">
      <div className="flex items-center justify-between bg-[var(--secondary-color)] rounded-md">
        <div>
          <Image
            src={assets.jbl_soundbox_image}
            className="w-[300px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-[var(--primary-color)] text-center">
            <p className="font-bold text-2xl">
              Level Up Your <br />
              Gaming Experience
            </p>
            <p className="text-sm my-1.5">
              From immersive sound to precise controls—<br/>everything you need to win
            </p>
          </div>
          <button className="px-6 md:px-8 py-3 bg-[var(--background)] rounded-2xl text-2xl text-[var(--primary-color)] cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">Bay Now</button>
        </div>

        <div>
          <Image
            src={assets.md_controller_image}
            className="w-[300px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
