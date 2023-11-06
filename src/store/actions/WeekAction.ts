/* Контекст */
import { weekSlice } from "../reducers/WeekSlice";
import { messageQueueSlice } from "../reducers/MessageQueueSlice";
import messageQueueAction from "./MessageQueueAction";

/* Константы */
import apiMainServer from "src/http/http";
import Api from "src/constants/api";

/**
 * Получение информации о домашних задания на неделе
 * @param date Дата
 * @returns
 */
export const apiWeekDate = (date: string, cb?: () => void) => async (dispatch: any) => {
  dispatch(weekSlice.actions.loadingStart());

  try {
    const response = await apiMainServer.get(`${Api.API_WEEK}${date}`, {
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

    dispatch(weekSlice.actions.setData(response.data));

    cb && cb();
  } catch (e) {
    // @ts-ignore
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(weekSlice.actions.loadingEnd());
};
