import { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";

export default function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  // let mins = String(Math.floor(secondsRemaining / 60));
  // mins = mins.length === 1 ? "0" + mins : mins;
  // let secs = String(secondsRemaining % 60);
  // secs = secs.length === 1 ? "0" + secs : secs;
  const mins = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
  const secs = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <div className="timer">
      {mins}:{secs}
    </div>
  );
}
