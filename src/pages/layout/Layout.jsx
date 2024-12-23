import { request } from "@/api";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
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

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   request("/discover/movie").then((res) => {
  //     setData(res.data);
  //   });
  // }, []);
  return (
    <main className={`${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Header fn={darkModeHandler} val={isDark} />
        <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
