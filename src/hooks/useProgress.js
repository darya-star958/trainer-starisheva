import { useLocalStorage } from "./useLocalStorage";

export function useProgress() {
  const [progress, setProgress] = useLocalStorage("trainer:progress", {
    attempts: [],
    solved: [],
  });

  const registerAttempt = (taskId, ok) => {
    setProgress(prev => ({
      attempts: [...prev.attempts, { taskId, ok, at: new Date().toISOString() }],
      solved: ok ? [...new Set([...prev.solved, taskId])] : prev.solved,
    }));
  };

  const resetProgress = () => {
    setProgress({ attempts: [], solved: [] });
  };

  return { progress, registerAttempt, resetProgress };
}