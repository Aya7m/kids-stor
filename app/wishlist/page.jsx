"use client";

import Navbar from "@/components/Navbar";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const { getToken } = useContext(AppContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/wishlist/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setWishlist(data.wishlist);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <>
    <Navbar/>
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No products in wishlist 💔</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow"
            >
              <Image
                src={product.image[0]}
                width={300}
                height={300}
                alt={product.name}
              />
              <p className="mt-2 font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">
                {product.price} EGP
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default WishlistPage;
