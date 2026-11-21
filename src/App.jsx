import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import StatsPage from "./pages/StatsPage";
import AboutPage from "./pages/AboutPage";
import { useThemeContext } from "./context/ThemeContext";

export default function App() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="layout">
      <header>
        <h1>Тренажёр по теме «Логические выражения»</h1>
        <button type="button" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      <nav>
        <ul>
          <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Задачи</NavLink></li>
          <li><NavLink to="/stats" className={({isActive}) => isActive ? "active" : ""}>Результаты</NavLink></li>
          <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>О проекте</NavLink></li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<div style={{textAlign: "center", padding: "50px"}}><h2>404 — Страница не найдена</h2></div>} />
        </Routes>
      </main>

      <footer>
        <p><small>Старишева Д.А., группа 5117241, 2026</small></p>
      </footer>
    </div>
  );
}