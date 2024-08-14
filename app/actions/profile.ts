"use server";

import { getServerSession } from "next-auth";
import { authConfig } from "../config/auth";
import prisma from "../db";

export const fetchProfile = async () => {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return { message: "Invalid User", isError: true, data: null };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        isVerified: true,
      },
    });

    if (!user) {
      return { message: "Invalid User", isError: true, data: null };
    }

    return {
      message: "Success",
      isError: false,
      data: {
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        username: user.username,
        isVerified: user.isVerified || false,
      },
    };
  } catch (error) {
    return {
      message: "Failed to get profile, please try after some time.",
      isError: true,
      data: null,
    };
  }
};

export const updateProfile = async (user: {
  username: string;
  id: string;
  email: string;
  name: string;
}) => {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return { message: "Invalid User", isError: true };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: user.username,
        email: user.email,
        name: user.name,
      },
    });

    return {
      message: "Updated Succesfully",
      isError: false,
    };
  } catch (error) {
    return {
      message: "Failed to update please try after some time",
      isError: true,
    };
  }
};
