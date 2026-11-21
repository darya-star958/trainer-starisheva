import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";

export default function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загружаем задачи напрямую здесь, чтобы избежать проблем с хуком
    fetch("/data/tasks.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.tasks.find((t) => String(t.id) === String(id));
        setTask(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Загрузка...</p>;

  if (!task) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Задача не найдена</h2>
        <p>Задачи с номером {id} не существует.</p>
        <Link to="/">← Вернуться к списку задач</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Назад к задачам</Link>
      <TaskCard task={task} />
    </div>
  );
}