"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { Toaster } from "../components/Toaster";

export type NotificationType = "error" | "success" | "warn";

export interface INotification {
  type: NotificationType;
  message: string;
  id: string;
}

export interface INotificationValue {
  notifications: INotification[];
  addNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<INotificationValue | null>(null);

export const NOTIFICATION_DELAY = 5000;

export const useNotification = () => {
  const notification = useContext(NotificationContext);

  if (!notification) {
    throw new Error("Notification context is not wrap with provider");
  }

  return notification;
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = useCallback(
    (message: string, type: NotificationType) => {
      setNotifications((prev): INotification[] => {
        const updatedNotificationList = [
          ...prev,
          { message, type, id: `${type}-${Date.now()}` },
        ];

        return updatedNotificationList.slice(-3); // keep only latest 3 notification
      });

      // Remove notification after 3 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, NOTIFICATION_DELAY); // Duration for each notification
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      <Toaster notifications={notifications} />
      {children}
    </NotificationContext.Provider>
  );
};
