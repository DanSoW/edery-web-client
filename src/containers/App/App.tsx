import { FC, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "src/components/Header/Header";
import useRoutes from "src/routes/routes";
import { ToastContainer } from "react-toastify";

// Стили
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { authUpdate } from "src/store/actions/AuthAction";

const App: FC<any> = () => {
  // Селектор авторизационных данных пользователя
  const authSelector = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authUpdate());
  }, []);

  // Подключение маршрутизации
  // @ts-ignore
  const routes = useRoutes(authSelector.isAuthenticated);

  return (
    <>
      <BrowserRouter>
        {routes}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </>
  );
};

export default App;
