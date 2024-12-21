import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoDotFill } from "react-icons/go";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./swiper.css";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const Carousel = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleSearch = (title) => {
    const query = encodeURIComponent(title);
    const searchUrl = `https://www.google.com/search?q=${query}`;
    window.open(searchUrl, "_blank");
  };

  return (
    <div className="container my-5">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data.results?.map((item) => (
          <SwiperSlide key={item.id} className="relative">
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${item?.backdrop_path}`}
              alt={item?.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center top-[70%] px-4 sm:px-8 md:px-12">
              <p className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">
                {item?.title}
              </p>
              <p className="text-white text-sm sm:text-base md:text-lg mt-2 flex items-center">
                {item?.release_date}
                <GoDotFill className="mx-2" />
                {item?.original_language?.toUpperCase()}
              </p>
              <button
                className="w-72 mt-4 px-4 sm:px-6 py-2 bg-red-600 text-white font-bold text-sm sm:text-lg rounded hover:bg-red-700"
                onClick={() => handleSearch(item?.title)}
              >
                Смотреть
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        navigation={true}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-5"
      >
        {data.results?.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${item?.backdrop_path}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
