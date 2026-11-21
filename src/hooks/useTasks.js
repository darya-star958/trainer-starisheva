import { useEffect, useState } from "react";

/**
 * Загрузка банка задач: состояние загрузки, ошибки и данных в одном месте.
 * @param {string} url — путь к JSON
 * @returns {{tasks: Array, loading: boolean, error: string}}
 */
export function useTasks(url = "data/tasks.json") {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!cancelled) setTasks(data.tasks ?? []);
      } catch (e) {
        if (!cancelled) setError("Не удалось загрузить банк задач");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { tasks, loading, error };
}