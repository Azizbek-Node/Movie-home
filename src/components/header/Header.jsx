import React from "react";
import logo from "@/assets/logo (6).svg";
import { FiSearch } from "react-icons/fi";
import { IoTabletPortraitSharp } from "react-icons/io5";
import { RiTv2Fill, RiCoupon3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoRu from "@/assets/RU.svg";

const lang = [
  {
    label: "Ру",
    code: "ru",
  },
  {
    label: "Eng",
    code: "en",
  },
  {
    label: "Uz",
    code: "uz",
  },
];

const Header = ({ fn, val, id }) => {
  const { i18n } = useTranslation();

  const darkModeHandler = () => {
    setIsDark((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      document.body.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  const changeLang = (e) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };

  return (
    <header
      id="header"
      className={`container flex flex-wrap items-center justify-between py-4 ${
        val ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-[112px] h-[36px]">
        <Link to={"/"}>
          <img className="w-full h-full" src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="flex w-[280px] flex-wrap justify-between">
        <li className="flex flex-wrap flex-col items-center cursor-pointer">
          <Link to={"/"}>
            <RiTv2Fill className="text-[20px]" />
            <span>Афиша</span>
          </Link>
        </li>
        <li className="flex flex-wrap flex-col items-center cursor-pointer">
          <Link to={`/movie/${1}`}>
            <IoTabletPortraitSharp className="text-[20px]" />
            <span>Сеанс</span>
          </Link>
        </li>
        <li className="flex flex-wrap flex-col items-center cursor-pointer">
          <RiCoupon3Line className="text-[20px]" />
          <span>Билет</span>
        </li>
        <li className="flex flex-wrap flex-col items-center cursor-pointer">
          <FiSearch className="text-[20px]" />
          <span>Поиск</span>
        </li>
      </ul>
      <div className="flex gap-2 items-center">
        <select
          className={`h-full px-2 py-2 rounded-md ${
            val ? "bg-[#0E0E0E] text-white" : " bg-slate-200 text-black"
          }`}
          value={i18n.language}
          onChange={changeLang}
        >
          {lang.map((item) => (
            <option key={item.code} value={item.code}>
              {item.label}
            </option>
          ))}
        </select>
        <button
          onClick={fn}
          className={`w-[130px] py-3 rounded-xl ${
            val ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          {val ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
};

export default Header;
