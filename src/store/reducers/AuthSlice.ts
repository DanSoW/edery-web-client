import { createSlice } from "@reduxjs/toolkit";
import StoreConstants from "src/constants/store";
import { IAuthModel } from "src/models/IAuthModel";

export interface IAuthSlice {
    data: IAuthModel | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

// Базовое состояние слайса
const initialState: IAuthSlice = {
    data: null,
    isLoading: false,
    isAuthenticated: false,
};

/**
 * Создание слайса для авторизации пользователя
 */
export const authSlice = createSlice({
    name: "auth_slice",
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

        getAuthData(state) {
            const mainStore = localStorage.getItem(StoreConstants.MAIN_STORE);
    
            state.data = null;
            
            if (mainStore) {
                state.data =  JSON.parse(mainStore).data;
            }

            state.isAuthenticated = !!state.data?.token;
        },

        setAuthData(state, action) {
            state.data = action.payload;
            state.isAuthenticated = !!state.data?.token;

            localStorage.setItem(
                StoreConstants.MAIN_STORE,
                JSON.stringify({
                    ...state,
                })
            );
        },

        // Функция авторизации пользователя
        signInSuccess(state, action) {
            state.isLoading = false;
            state.data = action.payload;
            state.isAuthenticated = !!state.data?.token;

            localStorage.setItem(
                StoreConstants.MAIN_STORE,
                JSON.stringify({
                    ...state,
                })
            );
        },

        // Функция регистрации нового пользователя
        signUpSuccess(state, action) {
            state.isLoading = false;
            state.data = action.payload;
            state.isAuthenticated = !!state.data?.token;

            localStorage.setItem(
                StoreConstants.MAIN_STORE,
                JSON.stringify({
                    ...state,
                })
            );
        },

        // Функция разлогирования пользователя
        logout(state) {
            state.isLoading = false;
            state.data = null;
            state.isAuthenticated = false;

            localStorage.removeItem(StoreConstants.MAIN_STORE);
        },
    },
});

export default authSlice.reducer;