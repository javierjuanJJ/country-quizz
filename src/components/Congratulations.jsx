import React from "react";

function Congratulations({ correctAnswers, totalQuestions, handlePlayAgain }) {
  return (
    <div className="congrats">
      <h1>🎉 ¡Felicidades!</h1>
      <p>Respondiste correctamente {correctAnswers} de {totalQuestions} preguntas.</p>
      <button onClick={handlePlayAgain}>Jugar de nuevo</button>
    </div>
  );
}

export default Congratulations;