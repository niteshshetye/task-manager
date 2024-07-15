"use client";
import { useSession } from "next-auth/react";
import React from "react";

export const Appbar = () => {
  const session = useSession();
  console.log({ session });
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* TODO: Put logo here */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Task Manager
          </span>
        </div>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {session.data ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </div>
    </nav>
  );
};
