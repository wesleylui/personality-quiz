// Question.jsx
// hold logic for displaying the questions
// display each quiz question and its corresponding options
// we will pass questions, options, and onAnswer as argument to Question.jsx
// we use JS .map() method to display the question options

import React from "react";

export function Question({ question, options, onAnswer }) {
  return (
    <div>
      <h2>{question}</h2>
      {options.map(function (option) {
        return (
          <button
            key={option}
            onClick={function () {
              onAnswer(option);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
