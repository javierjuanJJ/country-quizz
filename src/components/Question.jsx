import React from "react";

function Question({ questionData, questionIndex, userAnswer, handleAnswer }) {
  const { question, options, correctAnswer, flag } = questionData;

  return (
    <div className="question-card">
      <img src={flag} alt="flag" className="flag" />
      <h2>{question}</h2>

      <div className="options">
        {options.map((option, i) => {
          const isSelected = userAnswer === option;
          const isCorrect = option === correctAnswer;
          const className =
            isSelected && isCorrect
              ? "option correct"
              : isSelected && !isCorrect
              ? "option wrong"
              : "option";

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleAnswer(questionIndex, option)}
              disabled={!!userAnswer}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;