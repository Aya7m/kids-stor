"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [isSeller, setIsSeller] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [wishList, setWishList] = useState([]);
  const currency = "EGP";
  const router = useRouter();
const wishlistCount = wishList.length;

  const { user } = useUser();
  const { getToken } = useAuth();

  // Fetch user data
  const fetchUserData = async () => {
    try {
      if (user?.publicMetadata?.role === "seller") setIsSeller(true);

      const token = await getToken();
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
        setCartItems(data.user.cartItems || {});
        setWishList(data.user.wishList ||[])
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else toast.error(data.error);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    // Copy cartItems safely
    let cartData = JSON.parse(JSON.stringify(cartItems));

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = cartData[itemId][size]
      ? cartData[itemId][size] + 1
      : 1;

    setCartItems(cartData);

    if (user) {
      try {
        const token = await getToken();
        await axios.post(
          "/api/cart/update",
          { cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Item added to cart");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Update quantity in cart
  const updateCartQuantity = async (itemId, size, quantity) => {
    let cartData = JSON.parse(JSON.stringify(cartItems));
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (user) {
      try {
        const token = await getToken();
        await axios.post(
          "/api/cart/update",
          { cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Cart updated");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Get total cart count
  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size] || 0;
      }
    }
    return total;
  };

  // Get total cart amount
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id.toString() === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];
        if (qty > 0) total += product.offerPrice * qty;
      }
    }
    return Math.round(total * 100) / 100;
  };


  const fetchWishlist = async () => {
  try {
    const token = await getToken();
    const { data } = await axios.get("/api/wishlist/list", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setWishList(data.wishlist);
    }
  } catch (error) {
    console.log(error.message);
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user && !userData) fetchUserData();
  }, [user]);


  useEffect(() => {
  if (user) {
    fetchWishlist();
  } else {
    setWishList([]);
  }
}, [user]);


  const value = {
    products,
    setProducts,
    currency,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    isSeller,
    setIsSeller,
    user,
    getToken,
    userData,
    router,
    wishList, setWishList,wishlistCount
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
