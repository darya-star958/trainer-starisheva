# Тренажер по теме «Логические выражения и таблицы истинности»

**Автор:** Старишева Дарья Александровна, группа 5117241, 2026 год.
**Ссылка на опубликованную версию:** [https://darya-star958.github.io/trainer-starisheva/](https://darya-star958.github.io/trainer-starisheva/)

## Состав проекта
- `src/lib/` — предметная логика (фильтрация, проверка ответов).
- `src/hooks/` — кастомные хуки (`useTasks`, `useFilteredTasks`, `useLocalStorage`).
- `src/components/` — визуальные компоненты (`TaskCard`, `Filters`, `StatsPanel`, `Panel`, `ErrorBoundary`).
- `src/context/` — контексты (`ProgressContext`, `ThemeContext`).
- `src/pages/` — страницы приложения (Задачи, Результаты, О проекте, 404).
- `public/data/tasks.json` — банк задач.

## Команды запуска и сборки
```bash
npm install     # установка зависимостей
npm run dev     # запуск в режиме разработки
npm run build   # сборка проекта
npm run preview # локальная проверка сборки
