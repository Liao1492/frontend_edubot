import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@mantine/core/styles.css";
import store, { persistor } from "./store";
import { Provider } from "react-redux";
import AuthLayout from "./Components/AuthLayout";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AuthLayout>
            <App />
          </AuthLayout>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
