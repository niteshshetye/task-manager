"use client";
import React from "react";

export const ProfileForm = () => {
  const handleSubmitProfile = (event: React.FormEvent<HTMLFormElement>) => {
    alert("Form is submiteed!");
  };

  return (
    <form className="flex flex-col " onSubmit={handleSubmitProfile}>
      <div className="flex flex-wrap">
        <div className="flex-1 p-4">
          <label
            htmlFor="fullname"
            className="block mb-2 text-sm font-medium text-black"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            className="border border-black 900 text-sm rounded-lg  block w-full p-2.5 text-black "
            placeholder="Enter your Full name"
            autoComplete="off"
            required
          />
        </div>
        <div className="flex-1 p-4">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-black"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            className="border border-black 900 text-sm rounded-lg  block w-full p-2.5 text-black "
            placeholder="Enter your username"
            autoComplete="off"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="flex-1 p-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-black"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="border border-black 900 text-sm rounded-lg  block w-full p-2.5 text-black "
            placeholder="Enter your email"
            autoComplete="off"
            required
          />
        </div>
        <div className="flex-1 p-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border border-black 900 text-sm rounded-lg  block w-full p-2.5 text-black "
            placeholder="Enter your password"
            autoComplete="off"
            required
          />
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="submit"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-off focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
};
