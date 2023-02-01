import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  //get the data from the DB and setNotes,
  //if there is an error, log the error
  const dataFetch = async () => {
    console.log("fetching the first time");
    try {
      const data = await (await fetch("http://localhost:3001/")).json();
      console.log(data);
      setNotes(() => {
        if (data.length == 0) {
          //set this as a note if there is no entry in the DB
          return [{ title: "No notes", content: "You have to add a note" }];
        } else {
          return data;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dataFetch();
  }, []);

  //updating the notes
  async function updateNotes() {
    console.log("fetching notes and update");
    const data = await (await fetch("http://localhost:3001/")).json();
    setNotes(() => {
      if (data.length == 0) {
        //set this as a note if there is no entry in the DB
        return [{ title: "No notes", content: "You have to add a note" }];
      } else {
        return data;
      }
    });
  }

  async function deleteNote(id) {
    await fetch("http://localhost:3001/", {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify({ id }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.error(error);
      })
      .finally(updateNotes);
  }

  //get the note from DB to save as new and then delete the old one.
  async function editNote(id) {
    console.log("editing note " + id);
    /*
    await fetch("http://localhost:3001/", {
      method: "GET",
      mode: "cors",
      body: JSON.stringify({ id }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
*/
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={updateNotes} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEditNote={editNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
