import { useQuiz } from "../hooks/useQuiz";

export default function Progress() {
  const { questionCount, questionIndex, points, maxPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={questionCount}
        value={questionIndex + Number(answer !== null)}
      />
      <p>
        Question <strong>{questionIndex + 1}</strong> / {questionCount}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
