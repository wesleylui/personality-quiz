import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import Header from "./components/Header";
import { UserProvider } from "./components/UserContext";
import UserForm from "./components/UserForm";
import { Question } from "./components/Questions";
import Results from "./components/Results";

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
	const keywords = useMemo(
		() => ({ Fire: "fire", Water: "water", Earth: "earth", Air: "air" }),
		[]
	);

	// map each option string to an elemental category
	// determines which element each answer corresponds to
	const elements = useMemo(
		() => ({
			"Red 🔴": "Fire",
			"Blue 🔵": "Water",
			"Green 🟢": "Earth",
			"Yellow 🟡": "Air",
		}),
		[]
	);

	// HANDLERS
	// handle: click on an option
	function handleAnswer(answer) {
		setAnswers([...answers, answer]);
		setCurrentQuestionIndex(currentQuestionIndex + 1);
	}

	// handle: submit the user's name
	function handleUserFormSubmit(name) {
		setUserName(name);
	}

	// handle: finish the quiz

	// USEEFFECT
	// ensure quiz results are only returned once user has answered all questions
	// and API is fetched according
	useEffect(
		function () {
			if (currentQuestionIndex === questions.length) {
				// determine the winning element from answers
				const counts = {};
				answers.forEach(function (answer) {
					const el = elements[answer];
					counts[el] = (counts[el] || 0) + 1;
				});
				const selectedElement = Object.keys(counts).reduce(function (a, b) {
					return counts[a] > counts[b] ? a : b;
				});
				setElement(selectedElement);
				// fetch artwork using the corresponding keyword
				fetchArtwork(keywords[selectedElement]);
			}
		},
		[currentQuestionIndex, answers, questions.length, elements, keywords]
	);

	// MET MUSEUM IMAGE FETCH
	// Fetch an image from The Met Collection API. This does a search for the
	// provided query (defaults to `painting`) and then fetches the first
	// object details that contains an image. The returned object is stored in
	// `artwork` state for rendering below.
	const [metLoading, setMetLoading] = useState(false);
	const [metError, setMetError] = useState(null);

	// Fetch artwork from The Met. If `query` is provided we'll search for that
	// term (e.g. 'portrait' or 'fire') otherwise fall back to a broad search
	// to return any random artwork.
	async function fetchArtwork(query) {
		setMetError(null);
		setMetLoading(true);
		setArtwork(null);
		try {
			const base = "https://collectionapi.metmuseum.org/public/collection/v1";
			// choose search term: either the provided query or a broad 'a'
			const term = query ? query : "a";
			const searchRes = await fetch(
				`${base}/search?hasImages=true&q=${encodeURIComponent(term)}`
			);
			const searchJson = await searchRes.json();
			const ids = searchJson.objectIDs || [];
			if (ids.length === 0) {
				setMetError("No objects found");
				return;
			}

			let found = null;
			// try up to 30 random candidates (or fewer if the result set is small)
			const attempts = Math.min(30, ids.length);
			for (let i = 0; i < attempts; i++) {
				const id = ids[Math.floor(Math.random() * ids.length)];
				try {
					const objRes = await fetch(`${base}/objects/${id}`);
					if (!objRes.ok) continue;
					const obj = await objRes.json();
					const imageUrl = obj.primaryImageSmall || obj.primaryImage;
					if (imageUrl) {
						found = {
							objectID: obj.objectID,
							title: obj.title,
							artist: obj.artistDisplayName,
							date: obj.objectDate,
							imageUrl,
							creditLine: obj.creditLine,
						};
						break;
					}
				} catch {
					// ignore and try another id
					continue;
				}
			}

			if (!found) {
				setMetError("No images found");
			} else {
				setArtwork(found);
			}
		} catch (err) {
			setMetError(err.message || String(err));
		} finally {
			setMetLoading(false);
		}
	}

	return (
		<UserProvider value={{ name: userName, setName: setUserName }}>
			<Header />
			<Routes>
				<Route
					path="/"
					element={<UserForm onSubmit={handleUserFormSubmit} />}
				/>
				<Route
					path="/quiz"
					element={
						currentQuestionIndex < questions.length ? (
							<Question
								question={questions[currentQuestionIndex].question}
								options={questions[currentQuestionIndex].options}
								onAnswer={handleAnswer}
							/>
						) : (
							<Results element={element} artwork={artwork} />
						)
					}
				/>
			</Routes>
		</UserProvider>
	);
}

export default App;
