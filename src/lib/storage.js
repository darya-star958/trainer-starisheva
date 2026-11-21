const STORE_KEY = "trainer:progress";

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) ?? { attempts: [], solved: [] };
  } catch {
    return { attempts: [], solved: [] };
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORE_KEY, JSON.stringify(progress));
}

export function registerAttempt(progress, taskId, ok) {
  const newProgress = {
    attempts: [...progress.attempts, { taskId, ok, at: new Date().toISOString() }],
    solved: ok ? [...new Set([...progress.solved, taskId])] : progress.solved,
  };
  saveProgress(newProgress);
  return newProgress;
}