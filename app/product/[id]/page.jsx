"use client";
import { assets } from "@/assets/assets";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import ProductCart from "@/components/ProductCart";
import Searchbar from "@/components/Searchbar";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(AppContext);
  const navigate = useRouter();
  // const [productData, setProductData] = useState(null);
  const [minImg, setMinImg] = useState(null);
  const [selectSize, setSelectSize] = useState("");

  // const fetchProductData = async () => {
  //   const product = products.find((product) => product._id === id);
  //   setProductData(product);
  // };
  // useEffect(() => {
  //   if (products.length > 0) {
  //     const product = products.find((p) => p._id === id);
  //     setProductData(product);
  //     setMinImg(null); // reset الصورة لما البرودكت يتغير
  //     setSelectSize("");
  //   }
  // }, [id, products]);

  // console.log(productData);

 const [productData, setProductData] = useState(null);

useEffect(() => {
  if (products.length > 0) {
    const product = products.find((p) => p._id.toString() === id);
    setProductData(product);
    setMinImg(null);
    setSelectSize("");
  }
}, [id, products]);


  if (!productData) return <Loading />;

  return productData ? (
    <div key={id}>
      <Navbar />
      <Searchbar/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
        {/* images */}
        <div className="flex-1">
          <div>
            <Image
              src={minImg || productData.image[0]}
              alt={productData.name}
              width={1280}
              height={720}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {productData.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setMinImg(image)}
                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
              >
                <Image
                  src={image}
                  alt="alt"
                  className="w-full h-auto object-cover mix-blend-multiply"
                  width={1280}
                  height={720}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex-col">
          <h1 className="text-3xl font-medium mb-4">{productData.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Image
                className="h-4 w-4"
                src={assets.star_icon}
                alt="star_icon"
              />
              <Image
                className="h-4 w-4"
                src={assets.star_icon}
                alt="star_icon"
              />
              <Image
                className="h-4 w-4"
                src={assets.star_icon}
                alt="star_icon"
              />
              <Image
                className="h-4 w-4"
                src={assets.star_icon}
                alt="star_icon"
              />
              <Image
                className="h-4 w-4"
                src={assets.star_dull_icon}
                alt="star_dull_icon"
              />
            </div>
            <p>(4.5)</p>
          </div>

          <p className="text-gray-600 mt-3">{productData.description}</p>
          <p className="text-3xl font-medium mt-6">
            {productData.offerPrice} {"EGP"}
            <span className="text-base font-normal line-through ml-2">
              {productData.price} {"EGP"}
            </span>
          </p>

          <hr className="bg-gray-600 my-6" />
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                <tr>
                  <td className="text-gray-600 font-medium">Color</td>
                  <td className="text-gray-800/50 ">Multi</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Category</td>
                  <td className="text-gray-800/50">{productData.category}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex-col">
            <p className="mb-2">Select Size</p>
            <div className="space-x-4">
              {productData.size.map((item, index) => (
                <button
                  onClick={() => setSelectSize(item)}
                  className={`border px-4 py-2 cursor-pointer space-x-3 bg-gray-100 ${
                    item === selectSize ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center mt-10 gap-4">
            <button
              onClick={() => {
                addToCart(productData._id, selectSize);
             
              }}
              className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(productData._id, selectSize);
                 navigate.push('/cart')
              }}
              className="w-full py-3.5 bg-[var(--secondary-color)] text-white hover:bg-orange-600 transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 mt-16">
          <p className="text-3xl font-medium">
            Featured{" "}
            <span className="font-medium text-[var(--secondary-color)]">
              Products
            </span>
          </p>
          <div className="w-28 h-0.5 bg-[var(--secondary-color)] mt-2"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
          {products.slice(0, 5).map((product, index) => (
            <ProductCart key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default page;
