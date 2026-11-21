export default function HintBlock({ hint, solution }) {
  return (
    <>
      <details>
        <summary>Подсказка</summary>
        <p>{hint}</p>
      </details>
      {solution && (
        <details>
          <summary>Разбор</summary>
          <p>{solution}</p>
        </details>
      )}
    </>
  );
}