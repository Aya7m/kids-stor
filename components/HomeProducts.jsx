"use client";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import ProductCart from "./ProductCart";
import Link from "next/link";
import Loading from "./Loading";

const HomeProducts = () => {
  const { products } = useContext(AppContext);
  console.log(products);

  return products ?(
    <div className="mt-12">
      <h1 className="text-3xl text-[var(--primary-color)] font-semibold mb-7">
        Popular Products
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 space-y-5">
        {products.map((product) => (
          <div
            key={product._id}
          
            className="cursor-pointer"
          >
            <ProductCart product={product} />
          </div>
        ))}
      </div>
      <Link href={`/shop`} className="flex items-center justify-center mt-6">
        <button className="px-6 py-2 bg-white border border-gray-400 rounded-md hover:bg-[var(--primary-color)] hover:text-white hover:border-[var(--secondary-color)] transition-all duration-300 ease-in-out">
          See More
        </button>
      </Link>
    </div>
  ):<><Loading/></>
};

export default HomeProducts;
