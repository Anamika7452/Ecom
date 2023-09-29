import React from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";

const Home = () => {
  return (
    <>
      <HeroSection
        title="WELCOME TO"
        message="Your one-stop destination for all 
    things online shopping! At CLICK IT, we understand 
    the importance of convenience and choice, and that's 
    exactly what we bring to your fingertips. Explore a world 
    of possibilities as you browse through our extensive collection 
    of products, carefully curated to cater to your every need and 
    desire. Click on SHOP NOW to start exploring"
        ButtonData="SHOP NOW"
        navigateTo="/"
      />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
