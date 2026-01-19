// src/main.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx"
import { CartProvider } from "./contexts/CartContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </BrowserRouter>
  </StrictMode>
);
