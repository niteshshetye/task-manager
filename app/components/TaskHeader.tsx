"use client";
import React from "react";
import { Heading } from "./Heading";
import { useModal } from "../Hooks/useModal";
import { AddTaskForm } from "./AddTaskForm";

export const TaskHeader = () => {
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

      {isModalOpen ? <AddTaskForm handleModalOpen={handleModalOpen} /> : null}
    </React.Fragment>
  );
};
