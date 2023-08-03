const { createContext, useReducer, useEffect } = require("react");

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [
    {
      questions,
      status,
      questionIndex,
      answer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/questions`
        );
        const data = await res.json();
        dispatch({
          type: "dataReceived",
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "dataFailed",
        });
      }
    };

    getQuestions();
  }, []);

  const questionCount = questions.length;
  const maxPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );

  return (
    <QuizContext.Provider
      value={{
        dispatch,
        questions,
        status,
        questionIndex,
        answer,
        points,
        highscore,
        secondsRemaining,
        questionCount,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
  questionIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    }
    case "dataFailed": {
      return {
        ...state,
        status: "error",
      };
    }
    case "start": {
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    }
    case "newAnswer": {
      const question = state.questions[state.questionIndex];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        answer: null,
      };
    }
    case "finish": {
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.points, state.highscore),
      };
    }
    case "restart": {
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    }
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.secondsRemaining === 0
            ? Math.max(state.points, state.highscore)
            : state.highscore,
      };
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
