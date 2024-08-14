"use client";
import React, { useEffect, useState } from "react";
import { useNotification } from "../context/notification";
import { updateProfile } from "../actions/profile";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface ProfileFormProps {
  onProfileUpdate: (user: User) => Promise<{
    message: string;
    isError: boolean;
  }>;
  message: string;
  isError: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    isVerified: boolean;
  } | null;
}

export const ProfileForm = ({
  user,
  isError,
  message,
  onProfileUpdate,
}: ProfileFormProps) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const { addNotification } = useNotification();

  useEffect(() => {
    if (isError && !user) {
      addNotification(message, "error");
    }
  }, [addNotification, isError, message, user]);

  const handleSubmitProfile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await onProfileUpdate({
        id: user?.id || "",
        name,
        username,
        email,
      });
      console.log(response);

      addNotification(response.message, response.isError ? "error" : "success");
    } catch (error) {
      addNotification("Failed to update profile", "error");
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  return (
    <form className="flex flex-col " onSubmit={handleSubmitProfile}>
      <div className="flex flex-wrap">
        <div className="flex-1 p-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-black"
          >
            Full Name
          </label>
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            name="name"
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
            value={username}
            onChange={handleUsernameChange}
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
            value={email}
            onChange={handleEmailChange}
            type="email"
            name="email"
            className="border border-black 900 text-sm rounded-lg  block w-full p-2.5 text-black "
            placeholder="Enter your email"
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
