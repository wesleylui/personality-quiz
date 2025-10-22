// UserForm.jsx
// will have a search input that holds the NAME of the person taking the
// quiz for personalization

// has form and button that sets their name to the context

import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

export default function UserForm() {
  const [inputName, setInputName] = useState("");
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName); // set the name in context
    window.history.pushState({}, "", "/quiz"); // change URL w/o reload
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent); // Dispatch a navigation event
  }

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <label htmlFor="name">Enter your name:</label>
      <input
        id="name"
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Your name"
        required
      />
      <button type="submit" disabled={!inputName.trim()}>
        Start Quiz
      </button>
    </form>
  );
}
