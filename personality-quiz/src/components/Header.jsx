// Header.jsx
// hold Links and Title for our quiz and navigation links

import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
		<div>
			<h1>Personality Quiz</h1>
			<p>(based on completely random things)</p>
			<Link to="/">Home</Link>
			<Link to="/quiz">Quiz</Link>
		</div>
	);
}
