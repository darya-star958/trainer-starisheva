import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProgressProvider } from "./context/ProgressContext";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HashRouter>
  </StrictMode>
);