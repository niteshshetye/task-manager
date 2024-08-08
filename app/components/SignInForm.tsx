"use client";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useReducer,
} from "react";
import Link from "next/link";
import { useNotification } from "../context/notification";
import { signIn } from "next-auth/react";

interface ISigninForm {
  username: string;
  password: string;
}

const intialState: ISigninForm = {
  username: "",
  password: "",
};

const SigninFormReducer = (
  state: ISigninForm,
  action: { type: string; payload: string }
): ISigninForm => {
  switch (action.type) {
    case "username":
      return {
        ...state,
        username: action.payload,
      };

    case "password":
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
};

interface SignInFormProps {
  error?: string;
  callbackUrl?: string;
}

export const SignInForm = ({
  error = "",
  callbackUrl = "",
}: SignInFormProps) => {
  const [state, dispatch] = useReducer(SigninFormReducer, intialState);
  const { addNotification } = useNotification();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;

    dispatch({ type: name, payload: value });
  };

  const handleSubmit: MouseEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // else call signUp action
    await signIn("credentials", {
      username: state.username,
      password: state.password,
      redirect: true,
      callbackUrl: callbackUrl || "http://localhost:3000",
    });
  };

  useEffect(() => {
    if (error) {
      addNotification(error, "error");
    }
  }, [addNotification, error]);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl flex justify-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleInputChange}
            value={state.username}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
            value={state.password}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign in
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link
            href={`/auth/signup`}
            className="font-medium text-white hover:underline dark:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
