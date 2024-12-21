import { request } from "@/api";
import Carousel from "@/components/carousel/Carousel";
import Header from "@/components/header/Header";
import Movies from "@/components/movies/Movies";
import React, { memo, useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";

const Home = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const darkModeHandler = () => {
    setIsDark((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      document.body.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  const [data, setData] = useState([]);
  useEffect(() => {
    request("/discover/movie").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <main className={`${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Header fn={darkModeHandler} val={isDark} />
      <Carousel data={data} />
      <Movies data={data} />
      <Footer />
    </main>
  );
};

export default memo(Home);
