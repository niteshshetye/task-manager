"use client";
import Link from "next/link";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useReducer,
} from "react";
import { useNotification } from "../context/notification";
import { ISignupAction } from "../actions/signup";
import { useRouter } from "next/navigation";

interface SignupFormProps {
  onSignUp: ISignupAction;
}

interface ISignupForm {
  username: string;
  password: string;
  confirmPassword: string;
}

const intialState: ISignupForm = {
  username: "",
  password: "",
  confirmPassword: "",
};

const SignupFormReducer = (
  state: ISignupForm,
  action: { type: string; payload: string }
): ISignupForm => {
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

    case "confirm_password":
      return {
        ...state,
        confirmPassword: action.payload,
      };

    default:
      return state;
  }
};

export const SignUpForm = ({ onSignUp }: SignupFormProps) => {
  const [state, dispatch] = useReducer(SignupFormReducer, intialState);
  const { addNotification } = useNotification();
  const router = useRouter();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;

    dispatch({ type: name, payload: value });
  };

  const handleSubmit: MouseEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // check  password, confirm password is same
    // throw error password does not match with confirm password

    if (state.password.trim() !== state.confirmPassword.trim()) {
      addNotification("Confirm Password does not matched", "error");
      return;
    }

    // else call signUp action
    try {
      const response = await onSignUp({
        username: state.username,
        password: state.password,
      });

      addNotification(response.message, response.isError ? "error" : "success");
      router.push("/auth/signin");
    } catch (error) {
      addNotification("Something went wrong", "error");
    }
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl flex justify-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create new account
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
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleInputChange}
            value={state.username}
            placeholder="name@company.com"
            required
            maxLength={50}
            minLength={4}
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
            placeholder="••••••••"
            onChange={handleInputChange}
            value={state.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            minLength={4}
            maxLength={100}
          />
        </div>
        <div>
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="••••••••"
            onChange={handleInputChange}
            value={state.confirmPassword}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            minLength={4}
            maxLength={100}
          />
        </div>
        <div className="flex items-center justify-between">
          {/* TODO: we will come later this part */}
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
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign up
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href={`/auth/signin`}
            className="font-medium text-white hover:underline dark:text-blue-500"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};
