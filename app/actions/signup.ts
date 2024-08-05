"use server";
import prisma from "../db";

interface SignUpPayload {
  username: string;
  password: string;
}

export const signUp = async (payload: SignUpPayload) => {
  // check is user already present with the username
  const user = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });

  if (user) {
    return { message: "Username already exist", status: 404, isError: true };
  }

  // if not than add the username to the database
  await prisma.user.create({
    data: {
      username: payload.username,
      password: payload.password,
      modifiedDate: new Date(),
      createDate: new Date(),
    },
  });

  // genrate the token and return to the set (for now naviagte to signin page)
  return { message: "User Created...!", status: 201, isError: false };
};
