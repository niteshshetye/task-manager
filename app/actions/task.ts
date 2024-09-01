import { getServerSession } from "next-auth";
import { authConfig } from "../config/auth";
import prisma from "../db";
import { TodoStatus } from "@prisma/client";

export interface ICreateTaskPayload {
  title: string;
  description: string;
}
interface ITask {
  id: string;
  title: string;
  description: string | null;
  createDate: Date;
  modifiedDate: Date;
  status: TodoStatus | null;
  userId: string;
}

export interface ICreateTaskResponse {
  data: ITask;
  isError: boolean;
  status: number;
}

export interface IGetMyTasksResponse {
  data: ITask[];
  isError: boolean;
  status: number;
}

export const createTask = async (
  payload: ICreateTaskPayload
): Promise<ICreateTaskResponse> => {
  "use server";

  try {
    const session = await getServerSession(authConfig);
    console.log({ session });
    if (!session) {
      throw new Error("Invalid user");
    }

    const task = await prisma.todos.create({
      data: {
        title: payload.title,
        description: payload.description,
        userId: session.user.id,
        createDate: new Date(),
        modifiedDate: new Date(),
        status: TodoStatus.IN_COMPLETE,
      },
    });

    return { data: task, isError: false, status: 201 };
  } catch (error) {
    console.log("create task error: ", error);
    throw error;
  }
};

export const getMyTask = async (): Promise<IGetMyTasksResponse> => {
  "use server";
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      throw new Error("Invalid User");
    }
    const tasks = await prisma.todos.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return { data: tasks, status: 200, isError: false };
  } catch (error) {
    console.log("getMyTask action error", error);
    throw error;
  }
};
