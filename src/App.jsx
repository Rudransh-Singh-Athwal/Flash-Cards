import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
  {
    id: 1,
    question:
      "Which technology is primarily responsible for the styling of web pages?",
    answer: "CSS",
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
  },
  {
    id: 3,
    question:
      "Which programming language is mainly used for adding interactivity to websites?",
    answer: "JavaScript",
  },

  {
    id: 4,
    question:
      "What is the purpose of a front-end web development framework like React?",
    answer: "To create a visually appealing user interface",
  },
  {
    id: 5,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 6,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
  {
    id: 7,
    question:
      "Which part of web development is responsible for handling data storage and retrieval?",
    answer: "Back-end development",
  },
  {
    id: 8,
    question:
      "What is the primary function of a web server in the context of web development?",
    answer: "Handling HTTP requests and serving web pages",
  },
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handlePrevious() {
    const currentIndex = questions.findIndex((el) => el.id === selectedId);
    if (currentIndex > 0) {
      setSelectedId(questions[currentIndex - 1].id);
    }
  }

  function handleNext() {
    const currentIndex = questions.findIndex((el) => el.id === selectedId);
    if (currentIndex < questions.length - 1) {
      setSelectedId(questions[currentIndex + 1].id);
    }
  }

  return (
    <>
      <h1>Flash Cards</h1>
      <div className="flashcards">
        {questions.map((el) => (
          <div
            key={el.id}
            className={el.id === selectedId ? "selected" : ""}
            onClick={() => handleClick(el.id)}
          >
            <p>{el.id == selectedId ? el.answer : el.question}</p>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={
            selectedId === null ||
            questions.findIndex((el) => el.id === selectedId) === 0
          }
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={
            selectedId === null ||
            questions.findIndex((el) => el.id === selectedId) ===
              questions.length - 1
          }
        >
          Next
        </button>
      </div>
      {/* <h3 className="ownerName">Made by Rudransh</h3> */}
    </>
  );
}
