import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";

import HeroSlider from "@/components/HeroSlidder";
import HomeProducts from "@/components/HomeProducts";
import Navbar from "@/components/Navbar";

import NewsLetter from "@/components/NewsLetter";
import Searchbar from "@/components/Searchbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Searchbar/>
      <div>
        {" "}
        <HeroSlider />
        <HomeProducts />
        <Featured />
        <Banner />
        <NewsLetter />
      </div>

      <Footer />
    </div>
  );
};

export default page;
