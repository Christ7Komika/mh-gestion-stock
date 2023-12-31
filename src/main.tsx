import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ResetCss } from "./components/styled/ResetCss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ResetCss />
    </Provider>
  </React.StrictMode>
);
