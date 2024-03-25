"use client";
import React, { useState, useEffect } from "react";
import searchIcon from "../../public/assets/searchIcon.svg";
import cartIcon from "../../public/assets/cartIcon.svg";
import leftArrowIcon from "../../public/assets/leftArrowIcon.svg";
import rightArrowIcon from "../../public/assets/rightArrowIcon.svg";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const [userName, setUserName] = useState("");
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const nameValue: string = searchParams?.get("name") ?? "";
    setUserName(nameValue);
  }, [searchParams]);
  return (
    <>
      <header>
        <div className="user-nav-links flex w-full items-center justify-end space-x-6 px-4 py-2 ">
          <p className="text-gray-700">Help</p>
          <p className="text-gray-700">Orders & Returns</p>
          {userName && <p className="text-gray-700">Hi, {userName}</p>}
        </div>
        <div className="mt-1 flex w-full items-center justify-between ">
          <h1 className="title">ECOMMERCE</h1>
          <ol className="list-Item flex items-center space-x-4 ">
            <li>Categories</li>
            <li>Sale</li>
            <li>Clearance</li>
            <li>New Stock</li>
            <li>Trending</li>
          </ol>
          <div className="flex space-x-4 ">
            <img src={searchIcon.src} alt="Search Icon" className="px-4" />
            <img src={cartIcon.src} alt="Cart Icon" className="px-4" />
          </div>
        </div>
        <div className="bg-custom flex w-full items-center justify-center">
          <img src={leftArrowIcon.src} alt="left arrow" className="mx-4" />
          <p>Get 10% off on business sign up</p>
          <img src={rightArrowIcon.src} alt="right arrow" className="mx-4" />
        </div>
      </header>
    </>
  );
}
