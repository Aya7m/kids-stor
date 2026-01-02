"use client";

import React, { useContext } from "react";
import Image from "next/image";

import OrderSummery from "@/components/OrderSummery";
import { AppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CartPage = () => {
  const {
    cartItems,
    products,
    getCartCount,
    addToCart,
    updateCartQuantity,
    currency,
    router
  } = useContext(AppContext);

  return (
    <div className="">
        <Navbar/>
      <div className="flex flex-col md:flex-row gap-5 my-12">

        {/* LEFT SIDE */}
        <div className="flex-1">
          <div className="flex items-center justify-between border-b p-3">
            <p className="text-2xl font-semibold">
              Your <span className="text-[var(--secondary-color)]">Cart</span>
            </p>
            <p className="text-xl">{getCartCount()} Items</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>

              <tbody>
                {Object.keys(cartItems).length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500">
                      Your cart is empty
                    </td>
                  </tr>
                )}

                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find(
                    (p) => p._id === itemId
                  );
                  if (!product) return null;

                  return Object.keys(cartItems[itemId]).map((size) => {
                    const quantity = cartItems[itemId][size];
                    if (quantity <= 0) return null;

                    return (
                      <tr key={`${itemId}-${size}`}>
                        {/* PRODUCT */}
                        <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                          <div>
                            <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                              <Image
                                src={product.image[0]}
                                alt={product.name}
                                width={120}
                                height={120}
                                className="w-16 h-auto object-cover mix-blend-multiply"
                              />
                            </div>

                            <button
                              onClick={() =>
                                updateCartQuantity(itemId, size, 0)
                              }
                              className="md:hidden text-xs text-orange-600 mt-1"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="hidden md:block text-sm">
                            <p className="text-gray-800">{product.name}</p>
                            <p className="text-xs text-gray-500">
                              Size: {size}
                            </p>
                            <button
                              onClick={() =>
                                updateCartQuantity(itemId, size, 0)
                              }
                              className="text-xs text-orange-600 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </td>

                        {/* PRICE */}
                        <td className="py-4 md:px-4 px-1 text-gray-600">
                          {product.offerPrice} {currency}
                        </td>

                        {/* QUANTITY */}
                        <td className="py-4 md:px-4 px-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  itemId,
                                  size,
                                  quantity - 1
                                )
                              }
                            >
                              <Image
                                src={assets.decrease_arrow}
                                alt="decrease"
                                className="w-4 h-4"
                              />
                            </button>

                            <input
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={(e) =>
                                updateCartQuantity(
                                  itemId,
                                  size,
                                  Number(e.target.value)
                                )
                              }
                              className="w-10 border text-center"
                            />

                            <button
                              onClick={() => addToCart(itemId, size)}
                            >
                              <Image
                                src={assets.increase_arrow}
                                alt="increase"
                                className="w-4 h-4"
                              />
                            </button>
                          </div>
                        </td>

                        {/* SUBTOTAL */}
                        <td className="py-4 md:px-4 px-1 text-gray-600">
                          {(product.offerPrice * quantity).toFixed(2)}{" "}
                          {currency}
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
          <button onClick={()=> router.push('/shop')} className="group flex items-center mt-6 gap-2 text-orange-600">
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
            />
            Continue Shopping
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-3 min-w-[300px]">
          <OrderSummery />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CartPage;
