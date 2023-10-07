import React, { useEffect, useState } from "react";

// type Props = {}

const images = ["banner1.jpg", "banner2.jpg", "banner3.jpg", "banner4.jpg"];

const Banner = React.memo(() => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (imageIndex == images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  }, [imageIndex]);
  return (
    <div className="w-full h-[650px] flex bg-red-50">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full flex">
          <img
            src={`/${images[imageIndex]}`}
            className="h-full w-full"
            alt=""
          />
        </div>
        <div className="w-full h-full items-center justify-center px-6 hidden md:flex">
          <h1 className="text-2xl lg:text-4xl font-bold font-serif text-center text-red-600">
            Pizza, Burger, French Friez, Pasta, Milk Tea and Etc.. available her
            to share with your Family.
          </h1>
        </div>
      </div>
    </div>
  );
});

export default Banner;
