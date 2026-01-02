"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const HeroSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "All Baby Care",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.girl,
    },
    {
      id: 2,
      title: "All What is Your Baby Need Here",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.boy,
    },
    {
      id: 3,
      title: "All Baby Care In One Place",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.pretty,
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((item, index) => (
          <div
            key={item.id}
            className=" relative flex flex-col-reverse md:flex-row items-center justify-center bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-5 md:mt-0 p-32">
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-[var(--primary-color)] text-2xl font-semibold">
                {item.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-[var(--secondary-color)]   rounded-full text-white font-medium">
                  {item.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                  {item.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Image
                src={item.imgSrc}
                className="w-[350px] h-[350px] rounded-full"
                alt={`item${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
