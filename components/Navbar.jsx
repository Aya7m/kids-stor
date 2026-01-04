"use client";
import { BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import { AppContext } from "@/context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
import { Heart, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

const Navbar = () => {
  const { setShowSearch, getCartCount, isSeller, router, user,wishlistCount } =
    useContext(AppContext);
  const { openSignIn } = useClerk();

  const active =
    "border-b-2 border-[var(--primary-color)] pb-1 font-semibold text-[var(--secondary-color)]";
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center justify-between mt-5 p-4  border-b">
        <Link href={"/"}>
          <h1 className="text-[var(--primary-color)] text-2xl font-bold cursor-pointer">
            Kids <span className="text-[var(--secondary-color)]">Store</span>{" "}
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <Link href={"/"} className={`${pathname === "/" ? active : ""}`}>
            Home
          </Link>
          <Link
            href={"/shop"}
            className={`${pathname === "/shop" ? active : ""}`}
          >
            Shop
          </Link>
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        <div className="flex items-center gap-5">
          <Search
            className="cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
           <Link href="/wishlist" className="relative">
      <Heart className="w-6 h-6" />

      {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {wishlistCount}
        </span>
      )}
    </Link>
          <Link href={"/cart"} className="group relative">
            <p className="absolute -top-5 -right-5 px-2 rounded-full bg-[var(--secondary-color)] text-white">
              {getCartCount()}
            </p>
            <ShoppingBag className="" />
          </Link>
          {user ? (
            <>
              <UserButton>
                 <UserButton.MenuItems>
                  <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={()=>router.push('/')} />
                </UserButton.MenuItems>
                 <UserButton.MenuItems>
                  <UserButton.Action label="shop" labelIcon={<BoxIcon/>} onClick={()=>router.push('/shop')} />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action label="cart" labelIcon={<CartIcon/>} onClick={()=>router.push('/cart')} />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action label="my-orders" labelIcon={<CartIcon/>} onClick={()=>router.push('/my-orders')} />
                </UserButton.MenuItems>
              </UserButton>
            </>
          ) : (
            <>
              <button onClick={openSignIn}>Account</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
