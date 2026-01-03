// "use client";

// import { useAuth, useUser } from "@clerk/nextjs";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// import { createContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
//   const [isSeller, setIsSeller] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const currency = "EGP";
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [userData, setUserData] = useState(false);

//   const { user } = useUser();
//   const { getToken } = useAuth();

//   const fetchUserData = async () => {
//     try {
//       if (user?.publicMetadata?.role === "seller") {
//         setIsSeller(true);
//       }

//       const token = await getToken();

//       const { data } = await axios.get("/api/user/data", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (data.success) {
//         setUserData(data.user);
//         setCartItems(data.user.cartItems);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get("/api/product/list");
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         toast.error(data.error);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error("select product size");
//       return;
//     }
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;

//         if (user) {
//           try {
//             const token = await getToken();
//             await axios.post(
//               "/api/cart/update",
//               { cartData },
//               { headers: { Authorization: `Bearer ${token}` } }
//             );
//             toast.success("Item add to cart");
//           } catch (error) {
//             toast.error(error.message);
//           }
//         }
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }
//     setCartItems(cartData);
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // useEffect(() => {
//   //   console.log(cartItems);
//   // }, [cartItems]);

//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const itemId in cartItems) {
//       for (const size in cartItems[itemId]) {
//         try {
//           if (cartItems[itemId][size] > 0) {
//             totalCount += cartItems[itemId][size];
//           }
//         } catch (error) {
//           toast.error(error);
//         }
//       }
//     }
//     return totalCount;
//   };

//   const updateCartQuantity = async (itemId, size, quantity) => {
//     try {
//       let cartData = structuredClone(cartItems);
//       cartData[itemId][size] = quantity;
//       setCartItems(cartData);
//       if (user) {
//         try {
//           const token = await getToken();
//           await axios.post(
//             "/api/cart/update",
//             { cartData },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           toast.success("Item add to cart");
//         } catch (error) {
//           toast.error(error.message);
//         }
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const getCartAmount = () => {
//     let totalAmount = 0;

//     for (const itemId in cartItems) {
//       const product = products.find((p) => p._id === itemId);

//       if (!product) continue;

//       for (const size in cartItems[itemId]) {
//         const quantity = cartItems[itemId][size];

//         if (quantity > 0) {
//           totalAmount += product.offerPrice * quantity;
//         }
//       }
//     }

//     return Math.round(totalAmount * 100) / 100;
//   };
//   useEffect(() => {
//     if (user) {
//       fetchUserData();
//     }
//   }, [user]);

//   const value = {
//     products,
//     setProducts,
//     currency,
//     cartItems,
//     setCartItems,
//     addToCart,
//     router,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     getCartCount,
//     updateCartQuantity,
//     getCartAmount,
//     isSeller,
//     setIsSeller,
//     user,
//     getToken,
//     userData,
//   };
//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };




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

  const currency = "EGP";
  const router = useRouter();

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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user && !userData) fetchUserData();
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
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
