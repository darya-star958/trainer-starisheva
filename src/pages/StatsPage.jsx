import StatsPanel from "../components/StatsPanel";
import { useTasks } from "../hooks/useTasks";

export default function StatsPage() {
  const { tasks } = useTasks();
  return (
    <div style={{ padding: "20px" }}>
      <h2>Мои результаты</h2>
      <StatsPanel tasks={tasks} />
    </div>
  );
}