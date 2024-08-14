import bcrypt from "bcrypt";
import prisma from "../db";

export interface SignUpActionPayload {
  username: string;
  password: string;
}

export interface SignUpActionResponse {
  message: string;
  status: number;
  isError: boolean;
}

export type ISignupAction = (
  payload: SignUpActionPayload
) => Promise<SignUpActionResponse>;

export const signUp: ISignupAction = async (payload) => {
  "use server";
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

    // genrate the token and return to the set (for now naviagte to signin page)
    return { message: "User Created...!", status: 201, isError: false };
  } catch (error: any) {
    console.log(error);
    return { message: "Somthing went wrong", status: 404, isError: true };
  }
};
