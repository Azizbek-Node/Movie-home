import { request } from "@/api";
import Carousel from "@/components/carousel/Carousel";
import Header from "@/components/header/Header";
import Movies from "@/components/movies/Movies";
import React, { memo, useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";

const Home = () => {
  const [isDark, setIsDark] = useState(true)
  
  const darkModeHandler = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    request("/discover/movie").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <main className="bg-white dark:bg-black">
      <Header fn={darkModeHandler} val={isDark} />
      <Carousel data={data}/>
      <Movies data={data} />
      <Footer/>
    </main>
  );
};

export default memo(Home);
