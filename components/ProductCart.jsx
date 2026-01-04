"use client";
import React, { useContext } from "react";
import { Heart } from "lucide-react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import Link from "next/link";
const ProductCart = ({ product }) => {
  const { getToken,fetchWishlist } = useContext(AppContext);
  const toggleWishlist = async (productId) => {
    const token = await getToken();

    const { data } = await axios.post(
      "/api/wishlist/add",
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data.success) {
      toast.success(data.message);
      fetchWishlist();
    }
  };
  return (
    <div className="group relative">
      <div className="flex flex-col items-center  gap-3 border border-[var(--secondary-color)] p-5 md:px-8 lg:px-12 group-hover:hover:scale-105 group-hover:shadow-lg  rounded-lg transition-all duration-300 ease-in-out">
        <div className="bg-white rounded-lg w-full relative">
          <Link href={`/product/${product._id}`}>
            <Image
              src={product.image[0]}
              width={300}
              height={300}
              alt={product.name}
            />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product._id);
            }}
            className="absolute -top-2 -right-2 bg-[var(--primary-color)] p-2 rounded-full"
          >
            <Heart className="h-4 w-4 text-white hover:text-red-500" />
          </button>
        </div>
        <div>
          <p className="text-md font-semibold text-[var(--primary-color)]">
            {product.name.slice(0, 20) + "..."}
          </p>
          <p className="text-sm text-gray-400 ">
            {product.description.slice(0, 20) + "..."}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xs">{4.5}</p>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  className="h-3 w-3"
                  src={
                    index < Math.floor(4)
                      ? assets.star_icon
                      : assets.star_dull_icon
                  }
                  alt="star_icon"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between mt-4">
            <div className="flex items-center gap-1">
              <p className="text-sm">{product.price}</p>
              <p> {"EGP"}</p>
            </div>

            <button className="md:px-6 px-3 py-2 bg-[var(--secondary-color)] text-white rounded-full text-sm font-medium">
              <p className="text-sm">BuyNow</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
