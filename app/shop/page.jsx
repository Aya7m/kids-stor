"use client";

import { assets } from "@/assets/assets";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import ProductCart from "@/components/ProductCart";
import Searchbar from "@/components/Searchbar";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const { products,addToCart, search,  showSearch } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);

  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const[loading,setLoading]=useState(false)
 

  

  const toogleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toogleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let copyProduct = products.slice();

    if(showSearch && search){
       copyProduct=copyProduct.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      copyProduct = copyProduct.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subcategory.length > 0) {
      copyProduct = copyProduct.filter((item) =>
        subcategory.includes(item.subcategory)
      );
    }

    setFilterProduct(copyProduct);
  };

  useEffect(() => {
   
    applyFilter();
    
  }, [category, subcategory,search,showSearch]);

  useEffect(() => {
 
    setFilterProduct(products);
    
  }, [products]);
  if(loading) return <Loading/>
  return (
    <>
      <Navbar />
      <Searchbar/>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* left side -filter */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="text-xl flex items-center cursor-pointer gap-3"
          >
            Filter
            <Image
              src={assets.arrow_icon}
              className={`sm:hidden ${showFilter ? "rotate-90" : ""}`}
              alt="image"
            />
          </p>
          {/* category filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="font-medium mb-3">Category</p>
            <div className="flex flex-col gap-3">
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Boys"}
                  onChange={toogleCategory}
                />{" "}
                Boys
              </p>
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Girls"}
                  onChange={toogleCategory}
                />{" "}
                Girls
              </p>
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Babies"}
                  onChange={toogleCategory}
                />{" "}
                Babies
              </p>
            </div>
          </div>

          {/* subcategory filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="font-medium mb-3">SubCategory</p>
            <div className="flex flex-col gap-3">
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Winter Collection"}
                  onChange={toogleSubCategory}
                />{" "}
                Winter Collection
              </p>
              <p className="flex gap-3">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Summer Collection"}
                  onChange={toogleSubCategory}
                />{" "}
                Summer Collection
              </p>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-[var(--primary-color)] font-semibold">
              All Products
            </h2>
            <div>
              <select className="text-sm p-2 border border-[var(--primary-color)]">
                <option value="low-high">Sort By: Relative</option>
                <option value="low-high">Sort By: low-high</option>
                <option value="high-low">Sort By: high-low</option>
              </select>
            </div>
          </div>

    

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
            {filterProduct.map((product, index) => (
              <div
                
                key={index}
                className="cursor-pointer space-y-2"
              >
                <ProductCart product={product} />
              </div>
            ))}:<Loading/>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
