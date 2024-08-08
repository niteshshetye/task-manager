"use server";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import prisma from "../db";

interface SignUpPayload {
  username: string;
  password: string;
}

export const signUp = async (payload: SignUpPayload) => {
  try {
    // check is user already present with the username
    const user = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (user) {
      return { message: "Username already exist", status: 404, isError: true };
    }

    const hashPassword = await bcrypt.hash(payload.password, 10);

    // add the username to the database
    await prisma.user.create({
      data: {
        username: payload.username,
        password: hashPassword,
        modifiedDate: new Date(),
        createDate: new Date(),
      },
    });

    await signIn("credentials", {
      username: payload.username,
      password: payload.password,
      redirect: true,
      callbackUrl: "/",
    });
    // genrate the token and return to the set (for now naviagte to signin page)
    return { message: "User Created...!", status: 201, isError: false };
  } catch (error: any) {
    console.log(error);
    return { message: "Somthing went wrong", status: 404, isError: true };
  }
};
