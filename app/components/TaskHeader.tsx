"use client";
import React from "react";
import { Heading } from "./Heading";
import { useModal } from "../Hooks/useModal";
import { AddTaskForm } from "./AddTaskForm";
import { ICreateTaskResponse, ICreateTaskPayload } from "../actions/task";

interface ITaskHeaderProps {
  onAddTask: (payload: ICreateTaskPayload) => Promise<ICreateTaskResponse>;
}

export const TaskHeader = ({ onAddTask }: ITaskHeaderProps) => {
  const { isModalOpen, handleModalOpen } = useModal();

  const handleAction = () => {
    // console.log("hi there");
    handleModalOpen(true);
  };

  return (
    <React.Fragment>
      <Heading
        title={"My Tasks"}
        handleAction={handleAction}
        isSearchVisible
        isActionShow
      />

      {isModalOpen ? (
        <AddTaskForm onAddTask={onAddTask} handleModalOpen={handleModalOpen} />
      ) : null}
    </React.Fragment>
  );
};
