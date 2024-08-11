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
    question: "What are the basic operations performed on data structures?",
    answer:
      "The basic operations performed on data structures include insertion, deletion, traversal, search, and sorting.",
  },
  {
    id: 2,
    question: "What is the difference between an array and a linked list?",
    answer:
      "An array stores elements sequentially in memory whereas a linked list consists of a series of nodes, each containing a value and a pointer to the next node.",
  },
  {
    id: 3,
    question: "What is the time complexity of an algorithm?",
    answer:
      "The time complexity of an algorithm is the measure of the amount of time it takes to run as a function of the input size.",
  },

  {
    id: 4,
    question: "What are the types of data structures?",
    answer:
      "There are several types of data structures, including arrays, linked lists, stacks, queues, trees, graphs, and hash tables.",
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
    question: "What are props in React?",
    answer:
      "Props are like function parameters used to pass data to components.",
  },
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  return (
    <>
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
    </>
  );
}
