"use client";
import React from "react";
import { SearchBar } from "./SearchBar";
import { IoMdAddCircleOutline } from "react-icons/io";

interface HeadingProps {
  title: string;
  isActionShow?: boolean;
  actionTitle?: string;
  isSearchVisible?: boolean;
  handleAction?: () => void;
}

export const Heading = ({
  title,
  isActionShow = false,
  isSearchVisible = false,
  actionTitle = "",
  handleAction = () => {},
}: HeadingProps) => {
  return (
    <div className="p-4 border-none bg-white flex w-full justify-between items-center sticky top-0 z-10">
      <h1 className="text-2xl">{title}</h1>
      {isSearchVisible && <SearchBar />}
      {isActionShow && (
        <button
          type="button"
          onClick={handleAction}
          data-modal-target="add-task-modal"
          data-modal-toggle="add-task-modal"
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {actionTitle || <IoMdAddCircleOutline />}
        </button>
      )}
    </div>
  );
};
