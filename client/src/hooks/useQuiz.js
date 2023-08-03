import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

export function useQuiz() {
  const value = useContext(QuizContext);
  if (value === undefined)
    throw new Error("QuizContext is used outside QuizProvider");
  return value;
}
