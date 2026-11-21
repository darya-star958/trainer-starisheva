import { memo, useState } from "react";
import { useProgressContext } from "../context/ProgressContext";
import { checkNumeric } from "../lib/check";
import TaskHeader from "./TaskHeader";
import HintBlock from "./HintBlock";

function TaskCard({ task, hideHints = false }) {
  if (!task || !task.id) {
    return <p className="error" style={{ color: "red" }}>Ошибка: задача не передана</p>;
  }

  const safeTask = {
    title: task.title ?? "Без названия",
    statement: task.statement ?? "Условие не указано",
    answer: task.answer ?? { value: 0, unit: "", tolerance: 0.01 },
    hint: task.hint ?? "Подсказки нет",
    solution: task.solution ?? "Разбора нет",
    image: task.image ?? null,
  };

  const { registerAttempt } = useProgressContext();
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const stateClass = result ? (result.ok ? "correct" : "wrong") : "";
  const outOfTries = attempts >= 3 && !(result && result.ok);

  function handleSubmit(e) {
    e.preventDefault();
    const res = checkNumeric(answer, safeTask.answer.value, safeTask.answer.tolerance);
    setResult(res);
    if (res.reason !== "not-a-number") {
      setAttempts(n => n + 1);
      registerAttempt(task.id, res.ok);
    }
  }

  return (
    <article className={`card ${stateClass}`} id={`task-${task.id}`}>
      <TaskHeader task={{ ...task, title: safeTask.title }} />
      <p className="statement">{safeTask.statement}</p>

      {safeTask.image && (
        <figure className="illustration">
          <img src={safeTask.image} alt={`Иллюстрация к задаче: ${safeTask.title}`} />
        </figure>
      )}

      <form className="answer-form" onSubmit={handleSubmit}>
        <label htmlFor={`ans-${task.id}`}>Ответ, {safeTask.answer.unit}</label>
        <input
          id={`ans-${task.id}`}
          type="text"
          inputMode="decimal"
          value={answer}
          onChange={e => { setAnswer(e.target.value); setResult(null); }}
          disabled={outOfTries}
          required
        />
        <button type="submit" disabled={outOfTries}>Проверить</button>
      </form>

      {result && (
        <p className={`result ${stateClass}`} role="status" aria-live="polite">
          {result.reason === "not-a-number"
            ? "Введите число (например, 0,48)"
            : result.ok ? "Верно!" : `Неверно. Осталось попыток: ${3 - attempts}`}
        </p>
      )}

      {!hideHints && <HintBlock hint={safeTask.hint} solution={null} />}

      {(outOfTries || (result && result.ok)) && (
        <details open>
          <summary>Разбор</summary>
          <p>{safeTask.solution}</p>
        </details>
      )}
    </article>
  );
}

export default memo(TaskCard);