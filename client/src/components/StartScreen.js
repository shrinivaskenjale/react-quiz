import { useQuiz } from "../hooks/useQuiz";

export default function StartScreen() {
  const { questionCount, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the React quiz!</h2>
      <h3>{questionCount} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
