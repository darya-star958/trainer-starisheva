export default function Filters({ tasks, filters, setFilters, onReset }) {
  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="filters" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Поиск по тексту..."
        aria-label="Поиск по тексту"
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
      />

      <select
        aria-label="Фильтр по теме"
        value={filters.topic}
        onChange={(e) => handleChange("topic", e.target.value)}
      >
        <option value="">Все темы</option>
        <option value="Инверсия">Инверсия</option>
        <option value="Конъюнкция">Конъюнкция</option>
        <option value="Дизъюнкция">Дизъюнкция</option>
        <option value="Импликация">Импликация</option>
        <option value="Таблицы истинности">Таблицы истинности</option>
      </select>

      <select
        aria-label="Фильтр по уровню"
        value={filters.level}
        onChange={(e) => handleChange("level", Number(e.target.value))}
      >
        <option value={0}>Любой уровень</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      <button type="button" onClick={onReset} aria-label="Сбросить фильтры">
        Сбросить
      </button>
    </div>
  );
}