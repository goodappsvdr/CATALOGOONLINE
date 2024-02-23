import { useState } from "react";
import { createContext, useContext, useEffect } from "react";
import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { useSelector } from "react-redux";
import { Global } from "../../helpers/Global";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const SignalRContext = createContext();

const urlSignalR = Global.urlSignalR + "/NotificationHub";

export const useSignalR = () => {
  return useContext(SignalRContext);
};

export const SignalRProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const location = useLocation();
  const [connection, setConnection] = useState(null);
  const [prevPath, setPrevPath] = useState(null);
  const [unreadChat, setUnreadChat] = useState(false);
  const [unreadNotification, setUnreadNotification] = useState(false);

  const chatNotificationToast = ({ data }) => {
    if (
      location.pathname === "/chat/list" ||
      location.pathname === `/chat/${data.idChat}`
    ) {
      if (location.pathname === "/chat/list") {
        queryClient.refetchQueries(["getChatList", user.username]);
      }

      return;
    } else {
      setUnreadChat(true);

      toast.success(
        data.username,

        {
          description: data.message,
          duration: 3000,
        }
      );
    }
  };
  const notificationToast = ({ data }) => {
    if (location.pathname === "/chat/notifications") {
      queryClient.refetchQueries(["getNotificationList", user.username]);
      return;
    } else {
      setUnreadNotification(true);
      toast.success(
        "",

        {
          description: data.description,
          duration: 3000,
        }
      );
    }
  };

  const leaveNotifications = async () => {
    connection.off("Personal");
    connection.off("Buzon");
    connection.off("ReceiveLogoutNotification");
    connection.off("ReceiveNotification");
    // console.log("LEAVENOTIFICATIONS");
    await connection.stop();
  };

  const joinNotifications = async () => {
    // console.log("JOINNOTIFICATIONS");
    try {
      connection.on("Personal", (data) => {
        chatNotificationToast({ data });
        // console.log(data);
      });
      connection.on("Buzon", (data) => {
        notificationToast({ data });
        // console.warn(data);
      });
      // console.log("pase personal");
      connection.on("ReceiveLogoutNotification", (data) => {
        // console.log(data);
      });
      connection.on("ReceiveNotification", (data) => {
        // console.log(data);
      });
      await connection.start();

      // console.log("METI START");
    } catch (error) {
      console.log(error);
    }
  };

  const manageReconnection = async () => {
    if (connection && connection.state === HubConnectionState.Disconnected) {
      // console.log({
      //   desconectado: connection.state === HubConnectionState.Disconnected,
      // });
      // console.warn("EJECUTAMOS CONEXION CON CONEXION SIN CONECTAR");
      joinNotifications();
    } else if (
      (prevPath !== null &&
        (location.pathname.startsWith("/chat/") ||
          location.pathname === "/chat/notifications" ||
          location.pathname.startsWith("/chat/list"))) ||
      (prevPath !== null &&
        prevPath.startsWith("/chat/") &&
        prevPath !== location.pathname)
    ) {
      // console.log(`LEAVE AND JOIN`);
      if (connection && connection.state === HubConnectionState.Connected) {
        // console.warn("ESTABAMOS CONECTADOS PERO AHORA DESCONECTAMOS");
        await leaveNotifications();
      }

      // console.warn("EJECUTAMOS CONEXION");
      await joinNotifications();
    }
  };

  useEffect(() => {
    if (user) {
      setUnreadChat(user.unread);
      const Connect = async () => {
        setConnection(
          new HubConnectionBuilder()
            .withUrl(urlSignalR + "?userId=" + user.iduser)
            .configureLogging(LogLevel.Information)
            .build()
        );
      };
      Connect();
    }

    // if (connection && connection.state === HubConnectionState.Connected) {
    //   joinNotifications();
    // }

    return () => {
      // console.warn("return del use effect");
      if (connection) leaveNotifications();
    };
  }, [user]);
  useEffect(() => {
    manageReconnection();
    setPrevPath(location.pathname);
  }, [location, connection]);

  return (
    <SignalRContext.Provider
      value={{
        connection,
        unreadChat,
        unreadNotification,
        setUnreadChat,
        setUnreadNotification,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export function useSignalRContext() {
  return useContext(SignalRContext);
}
