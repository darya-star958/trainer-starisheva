import { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id); // уборка при размонтировании
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <span className="timer">
      {mm}:{ss}
      <button type="button" onClick={() => setRunning(r => !r)}>
        {running ? "Пауза" : "Продолжить"}
      </button>
      <button type="button" onClick={() => { setSeconds(0); setRunning(true); }}>Сброс</button>
    </span>
  );
}