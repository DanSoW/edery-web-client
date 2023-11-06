import { createSlice } from "@reduxjs/toolkit";
import StoreConstants from "src/constants/store";
import { IWeekModel } from "src/models/IWeekModel";

export interface IWeekSlice {
  data: IWeekModel | null;
  isLoading: boolean;
}

// Базовое состояние слайса
const initialState: IWeekSlice = {
  data: null,
  isLoading: false,
};

/**
 * Создание слайса для авторизации пользователя
 */
export const weekSlice = createSlice({
  name: "week_slice",
  initialState,
  reducers: {
    loadingStart(state) {
      state.isLoading = true;
    },

    loadingEnd(state) {
      state.isLoading = false;
    },

    clear(state) {
      state.isLoading = false;
      state.data = null;
    },

    setData(state, action) {
      state.data = action.payload;
    },
  },
});

export default weekSlice.reducer;
