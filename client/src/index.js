import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext.js";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <App />
        <Toaster/>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);
