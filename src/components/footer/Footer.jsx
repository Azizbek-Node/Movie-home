import React from "react";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { RiFileList2Line, RiShiningLine, RiQuestionLine, RiContactsLine, RiMovieLine,RiClapperboardLine,RiMovie2Line } from "react-icons/ri";
import { IoBasketballOutline } from "react-icons/io5";
import appstore from "@/assets/appstore.png";
import googleplay from "@/assets/googleplay.png";
import footerlogo from "@/assets/footer-logo.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const handleGooglePlayClick = () => {
    window.location.href = 'https://play.google.com/store'
  }
  const navigate = useNavigate()
  const handleAppStoreClick = () => {
    window.location.href = 'https://www.apple.com/app-store/'
  }
  const handleYoutubeClick = () => {
    window.location.href = 'https://youtube.com/@azizbekdota1?si=U23T0G69zMcxGIuk'
  }
  const handleInstagramClick = () => {
    window.location.href = 'https://www.instagram.com/azizbek_turaxonov/'
  }
  const handleFacebookClick = () => {
    window.location.href = 'https://www.facebook.com/'
  }
  return (
    <footer className="container bg-[#111111] text-white py-3 mt-10 rounded-md">
      <div className="container mx-auto flex flex-wrap justify-between gap-8 px-4">
        <div className="flex-1">
          <div className="text-2xl font-bold text-red-600 mb-4">
            <img src={footerlogo} alt="footerlogo" className="w-20 h-20" />
          </div>
          <div className="space-y-3">
            <button onClick={handleGooglePlayClick} className="block w-full md:w-auto py-2 px-4 rounded">
              <img src={googleplay} alt="googleplay" className="w-full h-full" />
            </button>
            <button onClick={handleAppStoreClick} className="block w-full md:w-auto py-2 px-4 rounded">
              <img src={appstore} alt="appstore" className="w-full h-full" />
            </button>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">О нас</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><RiFileList2Line className="text-red-600"/> Публичная оферта</li>
            <li className="flex items-center gap-2"><RiShiningLine className="text-red-600"/> Реклама</li>
            <li className="flex items-center gap-2"><RiQuestionLine className="text-red-600"/> F.A.Q</li>
            <li className="flex items-center gap-2"><FiPhoneCall className="text-red-600"/> Контакты</li>
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Категории</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><RiMovieLine className="text-red-600"/> Кино</li>
            <li className="flex items-center gap-2"><RiClapperboardLine className="text-red-600"/> Театр</li>
            <li className="flex items-center gap-2"><RiMovie2Line className="text-red-600"/> Концерты</li>
            <li className="flex items-center gap-2"><IoBasketballOutline className="text-red-600"/> Спорт</li>
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Связаться с нами</h3>
          <p className="text-red-600 text-xl flex items-center mb-3">
            <FiPhoneCall className="mr-2" /> +998 (95) 897-33-38
          </p>
          <h3 className="text-lg font-semibold mb-3">Социальные сети</h3>
          <div className="flex space-x-4 text-2xl">
            <FaInstagram onClick={handleInstagramClick} className="cursor-pointer" />
            <FaFacebook onClick={handleFacebookClick} className="cursor-pointer" />
            <FaYoutube onClick={handleYoutubeClick} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
