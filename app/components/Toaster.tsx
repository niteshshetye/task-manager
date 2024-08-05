import { memo } from "react";
import { CiWarning } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { INotification, NOTIFICATION_DELAY } from "../context/notification";
import "../toaster.css";

export const Toaster = memo(function MemoizedToaster({
  notifications,
}: {
  notifications: INotification[];
}) {
  return (
    <TransitionGroup className="fixed top-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <CSSTransition
          key={notification.id}
          timeout={NOTIFICATION_DELAY}
          classNames={{
            enter: "toastEnter",
            enterActive: "toastEnterActive",
            exit: "toastExit",
            exitActive: "toastExitActive",
          }}
        >
          {notification.type === "success" ? (
            <div className="bg-green-500 text-white p-4 flex items-center rounded-lg shadow-lg">
              <CiCircleCheck />
              <span className="ml-1">{notification.message}</span>
            </div>
          ) : notification.type === "error" ? (
            <div className="bg-red-500 text-white flex items-center p-4 rounded-lg shadow-lg">
              <MdErrorOutline />
              <span className="ml-1">{notification.message}</span>
            </div>
          ) : (
            <div className="bg-yellow-500 text-white flex items-center p-4 rounded-lg shadow-lg">
              <CiWarning />
              <span className="ml-1">{notification.message}</span>
            </div>
          )}
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
});
