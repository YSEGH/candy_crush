import React from "react";

export default function Score({ score }) {
  return (
    <div className="score">
      <h2>Votre score :</h2>
      <h1>{score}</h1>
    </div>
  );
}
