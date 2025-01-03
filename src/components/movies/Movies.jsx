import React from "react";
import MovieItem from "./MovieItem";
import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./swiper.css";

const Movies = ({ data }) => {
  console.log(data);

  return (
    <div className="flex gap-2 flex-wrap container justify-center">
      <Swiper
        loop={true}
        navigation={true}
        spaceBetween={20}
        slidesPerView={4}
        modules={[Navigation]}
        className="MoviesSwiper"
      >
        {data?.results?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="w-full flex justify-center h-full">
              <MovieItem {...movie} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(Movies);
