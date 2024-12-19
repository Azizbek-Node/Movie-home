import { request } from "@/api";
import Carousel from "@/components/carousel/Carousel";
import Header from "@/components/header/Header";
import Movies from "@/components/movies/Movies";
import React, { memo, useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    request("/discover/movie").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div>
      <Header/>
      <Carousel data={data}/>
      <Movies data={data} />
    </div>
  );
};

export default memo(Home);