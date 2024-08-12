// https://csebackend-74p9.onrender.com/api/v1/QnA/get
// https://csebackend-74p9.onrender.com/api/v1/QnA/update/:id
// https://csebackend-74p9.onrender.com/api/v1/QnA/delete/:id

import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

function handleDelete(id) {
  const res = axios.delete(
    `https://csebackend-74p9.onrender.com/api/v1/QnA/delete/${id}`
  );
  if (res) {
    console.log(res);
  } else {
    console.log("Error deleting the card");
  }
}

function handleUpdate(id) {
  const res = axios.put(
    `https://csebackend-74p9.onrender.com/api/v1/QnA/update/${id}`
  );
  if (res) {
    console.log(res);
  } else {
    console.log("Error updating the card");
  }
}

// const questions = [
//   {
//     id: 1,
//     question:
//       "Which technology is primarily responsible for the styling of web pages?",
//     answer: "CSS",
//   },
//   {
//     id: 2,
//     question: "What does CSS stand for?",
//     answer: "Cascading Style Sheets",
//   },
//   {
//     id: 3,
//     question:
//       "Which programming language is mainly used for adding interactivity to websites?",
//     answer: "JavaScript",
//   },
//   {
//     id: 4,
//     question:
//       "What is the purpose of a front-end web development framework like React?",
//     answer: "To create a visually appealing user interface",
//   },
//   {
//     id: 5,
//     question: "How to give components memory?",
//     answer: "useState hook",
//   },
//   {
//     id: 6,
//     question:
//       "What do we call an input element that is completely synchronised with state?",
//     answer: "Controlled element",
//   },
//   {
//     id: 7,
//     question:
//       "Which part of web development is responsible for handling data storage and retrieval?",
//     answer: "Back-end development",
//   },
//   {
//     id: 8,
//     question:
//       "What is the primary function of a web server in the context of web development?",
//     answer: "Handling HTTP requests and serving web pages",
//   },
// ];

const questions = [
  {
    id: 1,
    question: "question",
    answer: "CSS",
  },
  {
    id: 2,
    question: "question",
    answer: "Cascading Style Sheets",
  },
  {
    id: 3,
    question: "question",
    answer: "JavaScript",
  },
  {
    id: 4,
    question: "question",
    answer: "To create a visually appealing user interface",
  },
  {
    id: 5,
    question: "question",
    answer: "useState hook",
  },
  {
    id: 6,
    question: "question",
    answer: "Controlled element",
  },
  {
    id: 7,
    question: "question",
    answer: "Back-end development",
  },
  {
    id: 8,
    question: "question",
    answer: "Handling HTTP requests and serving web pages",
  },
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://csebackend-74p9.onrender.com/api/v1/QnA/get"
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

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
      <>
        <div className="flashcards">
          {questions.map((el) => (
            <div
              key={el.id}
              className={el.id === selectedId ? "selected" : ""}
              onClick={() => handleClick(el.id)}
            >
              <p>{el.id == selectedId ? el.answer : el.question}</p>
              <button
                className="updateButton"
                onClick={() => handleUpdate(el.id)}
              >
                Update
              </button>
              <button
                className="deleteButton"
                onClick={() => handleDelete(el.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </>

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
