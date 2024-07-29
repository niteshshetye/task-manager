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
    <div className="fixed z-10 inset-0 overflow-y-auto">
      {/* Background overlay with darker opacity */}
      <div
        className="fixed inset-0 bg-gray-900 opacity-75"
        aria-hidden="true"
      ></div>

      {/* Modal content */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal dialog */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Modal header */}
          <ModalHeader title={"Add Task"} handleCloseModal={handleCloseModal} />

          {/* Modal content */}
          <div className="bg-white px-2 pt-5 pb-2 sm:pt-6">
            {/* Modal body/content */}
            <div className="sm:flex sm:items-start">
              <form className="w-full px-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter title"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-36 resize-none"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Modal footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleCloseModal}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
