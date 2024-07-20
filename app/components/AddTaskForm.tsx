import React from "react";
import { ModalHeader } from "./ModalHeader";

interface IAddTaskFormProps {
  handleModalOpen: (value: boolean) => void;
}

export const AddTaskForm = ({ handleModalOpen }: IAddTaskFormProps) => {
  const handleCloseModal = () => {
    handleModalOpen(false);
  };

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
      {/* HEADER  */}
      <ModalHeader title="Add Task" handleCloseModal={handleCloseModal} />
      {/* CONTENT */}
      <div className="p-4 md:p-5 space-y-4">{/* TODO: Content */}</div>
      hi there
      {/* FOOTER */}
      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          data-modal-hide="default-modal"
          type="button"
          className="flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:outline-none"
          onClick={handleCloseModal}
        >
          Add
        </button>
      </div>
    </div>
  );
};
