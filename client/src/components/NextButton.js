import { useQuiz } from "../hooks/useQuiz";

export default function NextButton() {
  const { questionCount, dispatch, questionIndex, answer } = useQuiz();
  if (answer === null) return null;
  if (questionIndex < questionCount - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  if (questionIndex === questionCount - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}
