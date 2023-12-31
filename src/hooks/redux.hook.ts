/* Библиотеки */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

/* Хранилище */
import { AppDispatch, RootState } from "src/store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;