import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
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

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [addingNewCard, setAddingNewCard] = useState(false);
  const [editingCard, setEditingCard] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleAddingNewCardBool() {
    setAddingNewCard(!addingNewCard);
  }

  function handleEditingCardBool() {
    setEditingCard(!editingCard);
  }

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

  function handleAdd(newCard) {
    axios
      .post(`https://csebackend-74p9.onrender.com/api/v1/QnA`, newCard)
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("Card already exists!");
        } else {
          console.log("Error adding the card", error);
        }
      });
  }

  function handleUpdate(id, updatedCard) {
    axios
      .put(
        `https://csebackend-74p9.onrender.com/api/v1/QnA/update/${id}`,
        updatedCard
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Error updating the card", error);
      });
  }

  // function handleDelete(id) {
  //   setIsDeleting(true);
  //   axios
  //     .delete(`https://csebackend-74p9.onrender.com/api/v1/QnA/delete/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       fetchData(); // Reload and fetch data after deleting the card
  //       setIsDeleting(false);
  //     })
  //     .catch((error) => {
  //       console.log("Error deleting the card", error);
  //       setIsDeleting(false);
  //     });
  // }

  function handleDelete(id) {
    axios
      .delete(`https://csebackend-74p9.onrender.com/api/v1/QnA/delete/${id}`)
      .then((res) => {
        console.log(res);
        fetchData(); // Reload and fetch data after deleting the card
        const cardIndex = data.findIndex((el) => el.id === id);
        if (cardIndex !== -1) {
          data[cardIndex].isDeleting = false; // Reset isDeleting to false after deletion
        }
      })
      .catch((error) => {
        console.log("Error deleting the card", error);
        const cardIndex = data.findIndex((el) => el.id === id);
        if (cardIndex !== -1) {
          data[cardIndex].isDeleting = false; // Reset isDeleting to false after deletion
        }
      });
  }

  function handleClick(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handlePrevious() {
    const currentIndex = data.findIndex((el) => el.id === selectedId);
    if (currentIndex > 0) {
      setSelectedId(data[currentIndex - 1].id);
    }
  }

  function handleNext() {
    const currentIndex = data.findIndex((el) => el.id === selectedId);
    if (currentIndex < data.length - 1) {
      setSelectedId(data[currentIndex + 1].id);
    }
  }

  function handleAddNewCard() {
    if (newCard.question.trim() !== "" && newCard.answer.trim() !== "") {
      handleAdd(newCard);
      setNewCard({ question: "", answer: "" });
      setAddingNewCard(false);
    }
  }

  return (
    <>
      <h1>Flash Cards</h1>
      <h5>Tip: Click on a card to view the answer</h5>
      <div className="flashcards">
        {data.map((el) => (
          <div
            key={el.id}
            className={el.id === selectedId ? "selected" : ""}
            onClick={() => handleClick(el.id)}
          >
            {/* if(el.isDeleting){<p>Deleting...</p>}
            else{<p>{el.id == selectedId ? el.answer : el.question}</p>} */}
            {/* {el.isDeleting && <p>Deleting....</p>} */}
            <p>{el.id == selectedId ? el.answer : el.question}</p>
            <button
              className="updateButton"
              onClick={(e) => {
                e.stopPropagation();
                handleEditingCardBool();
              }}
            >
              Edit
            </button>
            <button
              className="deleteButton"
              onClick={(e) => {
                e.stopPropagation();
                if (
                  window.confirm("Are you sure you want to delete this card?")
                ) {
                  handleDelete(el.id);
                  el.isDeleting = true;
                }
                // handleDelete(el.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={
            selectedId === null ||
            data.findIndex((el) => el.id === selectedId) === 0
          }
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={
            selectedId === null ||
            data.findIndex((el) => el.id === selectedId) === data.length - 1
          }
        >
          Next
        </button>
      </div>

      {!addingNewCard && (
        <button className="addNewCardButton" onClick={handleAddingNewCardBool}>
          Add new card
        </button>
      )}

      {addingNewCard && (
        <div className="add-new-card">
          <input
            type="text"
            value={newCard.question}
            onChange={(e) =>
              setNewCard({ ...newCard, question: e.target.value })
            }
            placeholder="Enter question"
          />
          <input
            type="text"
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
            placeholder="Enter answer"
          />
          <div className="addNewCardButtons">
            <button onClick={handleAddNewCard}>Add</button>
            <button onClick={handleAddingNewCardBool}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
