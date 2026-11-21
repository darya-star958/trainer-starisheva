import { useProgressContext } from "../context/ProgressContext";

export default function StatsPanel({ tasks }) {
  const { progress, resetProgress } = useProgressContext();

  const totalAttempts = Object.values(progress).reduce((acc, p) => acc + (p.attempts || 0), 0);
  const solvedTasks = Object.values(progress).filter(p => p.solved).length;
  const totalTasks = tasks.length;
  const ratio = totalTasks > 0 ? Math.round((solvedTasks / totalTasks) * 100) : 0;

  const handleExport = () => {
    let csv = "TaskID,Status,Attempts\n";
    Object.keys(progress).forEach(taskId => {
      const p = progress[taskId];
      csv += `${taskId},${p.solved ? "Solved" : "Unresolved"},${p.attempts || 0}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "results.csv";
    link.click();
  };

  const handleReset = () => {
    if (window.confirm("Вы уверены, что хотите сбросить все результаты?")) {
      resetProgress();
    }
  };

  const topics = {};
  tasks.forEach(t => {
    if (!topics[t.topic]) topics[t.topic] = { total: 0, solved: 0 };
    topics[t.topic].total += 1;
    if (progress[t.id] && progress[t.id].solved) topics[t.topic].solved += 1;
  });

  return (
    <div>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button type="button" onClick={handleReset}>Сбросить результаты</button>
        <button type="button" onClick={handleExport}>Экспорт в CSV</button>
      </div>

      <p>Всего попыток: {totalAttempts}</p>
      <p>Доля верных: {ratio}%</p>
      <progress value={ratio} max="100" style={{ width: "100%", height: "20px" }} />

      <h3>Прогресс по темам</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "white" }}>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Тема</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Решено</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Всего</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Доля</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(topics).map(([topic, data]) => (
            <tr key={topic}>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>{topic}</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>{data.solved}</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>{data.total}</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                {data.total > 0 ? Math.round((data.solved / data.total) * 100) : 0}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}