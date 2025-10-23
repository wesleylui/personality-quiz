import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  // questions with four options each
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    // {
    //   question: "How old are you?",
    //   options: ["<18", "18-30", "30-65", "65+"],
    // },
    // {
    //   question: "Which of these cities would you want to live in?",
    //   options: ["Tokyo", "New York City", "San Francisco", "Toronto"],
    // },
  ];

  // possible results of quiz
  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  // map each option string to an elemental category
  // determines which element each answer corresponds to
  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    // Continue mapping all your possible options to a keyword
  };

  return (
    <div>
      <h2>Personality Quiz</h2>
    </div>
  );
}

export default App;
