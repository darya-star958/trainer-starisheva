export default function TaskHeader({ task }) {
  return (
    <div className="task-header">
      <h3>{task.id}. {task.title}</h3>
      <span className="level-badge">{task.level}</span>
    </div>
  );
}