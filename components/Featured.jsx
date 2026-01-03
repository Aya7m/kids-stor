import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const Featured = () => {
  const products = [
    {
      id: 1,
      image: assets.girl_with_headphone_image,
      title: "Unparalleled Sound",
      description: "Experience crystal-clear audio with premium headphones.",
    },
    {
      id: 2,
      image: assets.girl_with_earphone_image,
      title: "Stay Connected",
      description: "Compact and stylish earphones for every occasion.",
    },
    {
      id: 3,
      image: assets.boy_with_laptop_image,
      title: "Power in Every Pixel",
      description: "Shop the latest laptops for work, gaming, and more.",
    },
  ];
  return (
    <div>
      <h2 className="text-3xl text-[var(--primary-color)] font-semibold mb-7 mt-12 ">
        Featured Products
      </h2>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products?.map((product, index) => (
            <div key={index} className="relative group">
              <Image
                src={product.image}
                className="w-full h-auto object-cover group-hover:brightness-75 transition duration-300"
                alt={product.title}
              />
              <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
                <p className="font-medium text-xl lg:text-2xl">{product.title}</p>
                <p className="text-sm lg:text-base leading-5 max-w-60">
                  {product.description}
                </p>
                <button className="flex items-center gap-1.5 bg-[var(--secondary-color)] px-4 py-2 rounded">
                  Buy now{" "}
                  <Image
                    className="h-3 w-3"
                    src={assets.redirect_icon}
                    alt="Redirect Icon"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
