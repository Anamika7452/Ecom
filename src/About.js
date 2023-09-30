import React from "react";
import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productcontext";

const About = () => {
  const { test } = useProductContext();

  return (
    <>
      {test}
      <HeroSection
        title="WE ARE"
        message="Our journey began with a simple idea to create an online shopping 
      platform that prioritizes quality, convenience, and customer satisfaction above all else. 
      CLICK IT has evolved into a digital marketplace 
      that's designed with you in mind.
      CLICK IT is more than just a place to shop; it's a 
      reflection of our values. We're committed to sustainable practices 
      and ethical sourcing, ensuring that the products you purchase align with your values. 
      Our dedicated customer support team is always here to assist you, and we take pride in 
      our secure and user-friendly platform. for any further queries click on CONTACT US."
        ButtonData="CONTACT US"
        navigateTo="/contact"
      ></HeroSection>
    </>
  );
};

export default About;
