import { useQuiz } from "../hooks/useQuiz";
import Options from "./Options";

export default function Question() {
  const { questions, dispatch, questionIndex, answer } = useQuiz();

  const question = questions[questionIndex];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
