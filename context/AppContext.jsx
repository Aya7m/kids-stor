"use client";
import { productsDummyData } from "@/assets/assets";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [isSeller, setIsSeller] = useState(true)
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const currency = "EGP";
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const{user}=useUser()
  const fetchProducts = async () => {
    setProducts(productsDummyData);
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("select product size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalCount += cartItems[itemId][size];
          }
        } catch (error) {
          toast.error(error);
        }
      }
    }
    return totalCount;
  };

  const updateCartQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);

      if (!product) continue;

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];

        if (quantity > 0) {
          totalAmount += product.offerPrice * quantity;
        }
      }
    }

    return Math.round(totalAmount * 100) / 100;
  };

  const value = {
    products,
    setProducts,
    currency,
    cartItems,
    setCartItems,
    addToCart,
    router,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    getCartCount,
    updateCartQuantity,
    getCartAmount,
    isSeller, setIsSeller,user
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
