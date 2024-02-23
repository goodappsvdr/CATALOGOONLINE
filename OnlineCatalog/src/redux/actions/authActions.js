import {
  loadUserSuccess,
  loginFailed,
  loginFinished,
  loginStarted,
  loginSuccess,
} from "./authSlice";
import { Global } from "../../helpers/Global";

export const loginUser = (form) => {
  return async (dispatch) => {
    try {
      dispatch(loginStarted());

      //Guardar usuario en el backend
      const response = await fetch(Global.url + "/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Obtener los detalles del error
        dispatch(loginFailed(errorResponse.message)); // Despachar la acción de error con el mensaje
        dispatch(loginFinished()); // Finalizar el estado de carga
        return; // Salir de la función para evitar continuar con el flujo
      }

      const { token } = await response.json();

      const user = await fetchUserData(token, Global.url + "/Auth/GetUserInfo");

      dispatch(loginSuccess({ token, user }));
    } catch (error) {
      dispatch(loginFailed(error.message));
    } finally {
      dispatch(loginFinished());
    }
  };
};
export const loadUser = (token) => {
  return async (dispatch) => {
    try {
      dispatch(loginStarted());

      //Guardar usuario en el backend

      const user = await fetchUserData(
        token,
        Global.url + "/Users/GetUserAccount"
      );

      dispatch(loadUserSuccess({ token, user }));
    } catch (error) {
      dispatch(loginFailed(error.message));
    } finally {
      dispatch(loginFinished());
    }
  };
};

export const fetchUserData = async (token, url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    localStorage.removeItem("auth");
  }
};
