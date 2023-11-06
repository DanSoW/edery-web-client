import { createSlice } from "@reduxjs/toolkit";
import StoreConstants from "src/constants/store";
import { ITermItem, ITermModel, IUserModel } from "src/models/IUserModel";

export interface IUserSlice {
  data: IUserModel | null;
  term: ITermModel | null;
  isLoading: boolean;
}

// Базовое состояние слайса
const initialState: IUserSlice = {
  data: null,
  term: null,
  isLoading: false,
};

/**
 * Создание слайса для авторизации пользователя
 */
export const userSlice = createSlice({
  name: "user_slice",
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
      state.term = null;
    },

    getAuthData(state) {
      const mainStore = localStorage.getItem(StoreConstants.MAIN_STORE);

      state.data = null;

      if (mainStore) {
        state.data = JSON.parse(mainStore);
      }
    },

    setTerm(state, action) {
      if (action.payload) {
        state.term = action.payload;
      }
    },

    setData(state, action) {
      state.data = action.payload;
    },
  },
});

export default userSlice.reducer;
