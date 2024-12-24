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
    <main>
      <Carousel data={data} />
      <Movies data={data} />
    </main>
  );
};

export default memo(Home);
