import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { useFilteredTasks } from "../hooks/useFilteredTasks";
import TaskCard from "../components/TaskCard";
import Filters from "../components/Filters";
import Timer from "../components/Timer";

export default function HomePage() {
  const { tasks, loading, error } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizTasks, setQuizTasks] = useState([]);

  const filters = {
    subject: searchParams.get("subject") || "",
    topic: searchParams.get("topic") || "",
    level: Number(searchParams.get("level")) || 0,
    search: searchParams.get("search") || "",
  };

  const setFilters = (newFilters) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) nextParams.set(key, newFilters[key]);
      else nextParams.delete(key);
    });
    setSearchParams(nextParams);
  };

  const resetFilters = () => setSearchParams({});
  const { filtered } = useFilteredTasks(tasks, filters);

  const handleStartQuiz = () => {
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setQuizTasks(shuffled.slice(0, 5));
    setIsQuizMode(true);
  };

  const handleFinishQuiz = () => {
    setIsQuizMode(false);
    setQuizTasks([]);
  };

  const handleGenerateVariant = () => {
    if (filtered.length === 0) return;
    // Берем задачу строго из массива отфильтрованных
    const randomTask = filtered[Math.floor(Math.random() * filtered.length)];
    if (randomTask && randomTask.id) {
      navigate(`/task/${randomTask.id}`);
    }
  };

  if (loading) return <p>Загрузка задач...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (isQuizMode) {
    return (
      <section id="tasks" style={{ padding: "20px" }}>
        <h2>Контрольная работа (5 задач)</h2>
        <p style={{ color: "red", fontWeight: "bold" }}>Подсказки скрыты!</p>
        <div className="cards">
          {quizTasks.map(t => (
            <TaskCard key={t.id} task={t} hideHints={true} />
          ))}
        </div>
        <button onClick={handleFinishQuiz} style={{ marginTop: "20px", padding: "10px" }}>
          Завершить контрольную
        </button>
      </section>
    );
  }

  return (
    <section id="tasks">
      <h2>Задачи</h2>
      <div className="toolbar" style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
        <Timer />
        <button type="button" onClick={handleStartQuiz}>Начать контрольную</button>
        <button type="button" onClick={handleGenerateVariant}>Новый вариант</button>
      </div>

      <Filters tasks={tasks} filters={filters} setFilters={setFilters} onReset={resetFilters} />

      <div className="cards">
        {filtered.length === 0 ? (
          <p>Задач нет</p>
        ) : (
          filtered.map(t => <TaskCard key={t.id} task={t} />)
        )}
      </div>
    </section>
  );
}