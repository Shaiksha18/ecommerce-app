"use client"

import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const UserInterest: React.FC = () => {
  const interestedThings: string[] = [
    "Shoes",
    "Men T-shirts",
    "Makeup",
    "Jewellery",
    "Women T-shirts",
    "Furniture",
    "Electronics",
    "Books",
    "Bags",
    "Accessories",
    "Sports Equipment",
    "Home Decor",
    "Watches",
    "Perfumes",
    "Gadgets",
    "Sunglasses",
    "Stationery",
    "Fitness Gear",
    "Kitchen Appliances",
    "Toys",
    "Music Instruments",
    "Pet Supplies",
    "Art Supplies",
    "Handbags",
    "Sneakers",
    "Socks",
    "Hats",
    "Gloves",
    "Scarves",
    "Belts",
    "Wallets",
    "Outerwear",
    "Swimwear",
    "Activewear",
    "Underwear",
    "Dresses",
    "Skirts",
    "Pants",
    "Shorts",
    "Blouses",
    "Tops",
    "Hoodies",
    "Sweaters",
    "Jackets",
    "Coats",
    "Vests",
    "Jeans",
    "Leggings",
    "Jumpsuits",
    "Romper",
    "Sleepwear",
    "Robes",
    "Loungewear",
    "Lingerie",
    "Bras",
    "Pajamas",
    "Nightgowns",
    "Slippers",
    "Boots",
    "Sandals",
  ];

  // State to store selected interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const displayLimit = 6;
  const totalDisplayedPages = Math.ceil(interestedThings.length / displayLimit);
  const [displayedUsers, setDisplayedUsers] = useState<string[]>([]);

  // Function to toggle selection of an interest
  const toggleInterest = (interest: string): void => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest),
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * displayLimit;
    const endIndex = Math.min(
      startIndex + displayLimit,
      interestedThings.length,
    );
    setDisplayedUsers(interestedThings.slice(startIndex, endIndex));
  }, [currentPage]);

  return (
    <div
      className="mx-auto mt-10 max-w-md rounded-md border border-gray-300 p-6 shadow-md"
      style={{ borderColor: "#C1C1C1" }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">
        Please mark your interests!
      </h2>
      <p className="mb-4 text-center">We will keep you notified.</p>

      <label htmlFor="code" className="mb-1 block font-semibold text-gray-700">
        My saved interests!
      </label>

      <div>
        {displayedUsers.map((interest: string, index: number) => (
          <div key={index} className="m-2">
            <input
              type="checkbox"
              id={`interest-${index}`}
              name={`interest-${index}`}
              value={interest}
              checked={selectedInterests.includes(interest)}
              onChange={() => toggleInterest(interest)}
              className="checkbox"
            />
            <label htmlFor={`interest-${index}`}>{interest}</label>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalDisplayedPages={totalDisplayedPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default UserInterest;
