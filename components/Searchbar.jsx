"use client";
import { assets } from "@/assets/assets";
import { AppContext } from "@/context/AppContext";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(AppContext);
  const [visable, setVisable] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("shop")) {
      setVisable(true);
    } else {
      setVisable(false);
    }
  }, [pathname]);

  return showSearch && visable ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="flex-1 outline-none bg-inherit text-sm"
          placeholder="Search"
        />
        <img src={assets.search_icon} alt="" className="w-4" />
      </div>
      <XIcon
        className="w-4 inline cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};

export default Searchbar;
