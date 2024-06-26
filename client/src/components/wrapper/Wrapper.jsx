import React, { useEffect, useState } from "react";
import "./wrapper.css";
import Navbar from "../navbar/Navbar.jsx";
import Slider from "../slider/Slider.jsx";
import slider1 from "../../assets/image/slide-01.jpg";
import slider2 from "../../assets/image/slide-02.jpg";
import slider3 from "../../assets/image/slide-03.jpg";

const Wrapper = ({change}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const sliderItem = [
    {
      title: "NEW SEASON",
      label: "Women Collection 2024",
      img: slider1,
    },
    {
      title: "JACKETS & COATS",
      label: "Men New-Season",
      img: slider2,
    },
    {
      title: "NEW ARRIVALS",
      label: "Men Collection 2024",
      img: slider3,
    },
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItem.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [sliderItem.length]);

  return (
    <div
      className="wrapperContainer"
      style={{ backgroundImage: `url(${sliderItem[currentIndex].img})` }}
    >
      <Navbar id={1} change={change}/>
      <Slider item={sliderItem[currentIndex]} />
      <div
        className="leftArrow"
        onClick={() => {
          currentIndex === 0
            ? setCurrentIndex(2)
            : setCurrentIndex(currentIndex - 1);
        }}
      ></div>
      <div
        className="rightArrow"
        onClick={() => {
          currentIndex === 2
            ? setCurrentIndex(0)
            : setCurrentIndex(currentIndex + 1);
        }}
      ></div>
    </div>
  );
};

export default Wrapper;
