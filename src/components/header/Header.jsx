import React from 'react'
import logo from '@/assets/logo (6).svg'
import { FiSearch } from "react-icons/fi";
import { IoTabletPortraitSharp } from "react-icons/io5";
import { RiTv2Fill } from "react-icons/ri";
import { RiCoupon3Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

const lang = [
  {
      label: 'Ру',
      value: 'ru',
  },
    {
        label: 'Eng',
        value: 'en',
    },
    {
        label: 'Uz',
        value: 'uz',
    }
]

const Header = () => {
  return (
    <div className='container flex flex-wrap items-center justify-between py-4'>
        <div className='w-[112px] h-[36px]'>
            <Link to={"/"}>
            <img className='w-full h-full' src={logo} alt="" />
            </Link>
        </div>
        <ul className='flex w-[280px] flex-wrap justify-between'>
            <li className='flex flex-wrap flex-col items-center cursor-pointer'>
                <RiTv2Fill className='text-[20px]'/>
                <span>Афиша</span>
            </li>
            <li className='flex flex-wrap flex-col items-center cursor-pointer'>
                <IoTabletPortraitSharp className='text-[20px]'/>
                <span>Сеанс</span>
            </li>
            <li className='flex flex-wrap flex-col items-center cursor-pointer'>
                <RiCoupon3Line className='text-[20px]'/>
                <span>Билет</span>
            </li>
            <li className='flex flex-wrap flex-col items-center cursor-pointer'>
                <FiSearch className='text-[20px]'/>
                <span>Поиск</span>
            </li>
        </ul>
        <div className='flex gap-2 items-center'>
            <select className='h-full bg-slate-900 px-2 py-2 rounded-md text-white'>
                {lang.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                ))}
            </select>
            <button className='w-[130px] bg-red-700 text-white py-3 rounded-xl'>Войти</button>
        </div>
    </div>
  )
}

export default Header
