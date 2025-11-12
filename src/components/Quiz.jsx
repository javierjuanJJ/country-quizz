import React, { useState, useEffect } from "react";
import Question from "./Question";
import Congratulations from "./Congratulations";
import { getRandomCountries, generateQuizQuestions } from "../utils/helpers";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(data => {
        const selected = getRandomCountries(data, 10);
        const quizData = generateQuizQuestions(selected, data);
        setQuestions(quizData);
      });
  }, []);

  const handleAnswer = (index, answer) => {
    const updated = [...userAnswers];
    updated[index] = answer;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleFinish = () => setShowResult(true);

  const handlePlayAgain = () => {
    window.location.reload();
  };

  if (questions.length === 0) return <p>Cargando preguntas...</p>;

  if (showResult)
    return (
      <Congratulations
        correctAnswers={userAnswers.filter(
          (a, i) => a === questions[i].correctAnswer
        ).length}
        totalQuestions={questions.length}
        handlePlayAgain={handlePlayAgain}
      />
    );

  return (
    <div className="quiz-container">
      <h1 className="title">🌍 Country Quiz</h1>
      <Question
        questionData={questions[currentQuestion]}
        questionIndex={currentQuestion}
        userAnswer={userAnswers[currentQuestion]}
        handleAnswer={handleAnswer}
      />

      <div className="navigation">
        <button onClick={handlePrev} disabled={currentQuestion === 0}>
          ← Anterior
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNext}>Siguiente →</button>
        ) : (
          <button onClick={handleFinish}>Finalizar</button>
        )}
      </div>

      <div className="progress">
        {currentQuestion + 1} / {questions.length}
      </div>
    </div>
  );
}

export default Quiz;