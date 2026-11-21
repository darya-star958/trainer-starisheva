export function filterTasks(tasks, { subject = "", topic = "", level = 0, search = "" } = {}) {
  return tasks.filter(t => {
    const bySubject = subject === "" || t.subject === subject;
    const byTopic = topic === "" || t.topic === topic;
    const byLevel = level === 0 || t.level === level;
    const bySearch = search === "" || t.statement.toLowerCase().includes(search.toLowerCase());
    return bySubject && byTopic && byLevel && bySearch;
  });
}

export function topicsOf(tasks) {
  return [...new Set(tasks.map(t => t.topic))].sort();
}