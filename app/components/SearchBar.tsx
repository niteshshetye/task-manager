"use client";
import React from "react";
import { BsFilterLeft } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

export const SearchBar = () => {
  return (
    <div className="flex items-center w-[50%] mx-auto">
      <form className="w-[100%]">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearchOutline color="black" />
          </div>
          <input
            type="text"
            id="search"
            className="border border-black text-black  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:placeholder-gray-400"
            placeholder="Quick Search your task by Title"
          />
          <span className="absolute inset-y-0 end-0 flex items-center pe-3">
            ⌘ K
          </span>
        </div>
      </form>
      <button
        type="submit"
        className="flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:outline-none"
      >
        <BsFilterLeft />
        <span className=" pl-2">Filter</span>
      </button>
    </div>
  );
};
