/* Контекст */
import { userSlice } from "../reducers/UserSlice";
import { messageQueueSlice } from "../reducers/MessageQueueSlice";
import messageQueueAction from "./MessageQueueAction";

/* Константы */
import apiMainServer from "src/http/http";
import Api from "src/constants/api";

/**
 * Установка авторизационных данных локально в localStorage
 * @param data Данные для установки
 * @returns
 */
export const getUserInfo = (cb?: () => void) => async (dispatch: any) => {
  try {
    dispatch(userSlice.actions.loadingStart());
    const response = await apiMainServer.get(Api.USERS_FETCH, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Обработка ошибок
    if (response.status !== 200 && response.status !== 201) {
      dispatch(messageQueueAction.addMessage(response, "error"));
      return;
    }

    dispatch(userSlice.actions.setData(response.data));
    if (cb) {
      cb();
    }
  } catch (e) {
    // @ts-ignore
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(userSlice.actions.loadingEnd());
};

export const getUserTerm = () => async (dispatch: any) => {
  try {
    dispatch(userSlice.actions.loadingStart());
    const response = await apiMainServer.get(Api.API_TERM, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Обработка ошибок
    if (response.status !== 200 && response.status !== 201) {
      dispatch(messageQueueAction.addMessage(response, "error"));
      return;
    }

    dispatch(userSlice.actions.setTerm(response.data));
  } catch (e) {
    // @ts-ignore
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(userSlice.actions.loadingEnd());
};
