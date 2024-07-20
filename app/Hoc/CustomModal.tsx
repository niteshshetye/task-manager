import React from "react";

interface ICustomModalProps {
  children: React.ReactNode;
}

export const CustomModal = ({ children }: ICustomModalProps) => {
  return (
    <div
      id="default-modal"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">{children}</div>
    </div>
  );
};
