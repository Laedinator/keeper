import React, { useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { Collapse } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";

function CreateArea(props) {
  //remove state and add useRef instead
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isActive, setActive] = useState(false);

  function expandArea() {
    setActive(true);
  }
  function collapseArea() {
    setActive(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  //once you want to add the note, click on the button to submit
  //send a post request to the DB and save it.

  async function submitNote() {
    await fetch("http://localhost:3001/", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ note }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .catch((error) => {
        console.error(error);
      })
      .finally(props.onAdd);
  }

  function handleSubmit(e) {
    submitNote();
    setNote({
      title: "",
      content: "",
    });
    //setActive sets the style of the textArea
    setActive(false);
    e.preventDefault();
  }

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>
        <Collapse in={isActive}>
          <div>
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
          </div>
        </Collapse>
        <TextareaAutosize
          onFocus={expandArea}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          minRows={isActive ? 3 : 1}
        />

        <Zoom
          in={isActive}
          style={{ transitionDelay: isActive ? "500ms" : "0ms" }}
        >
          <Fab type="submit">
            <AddIcon color="inherit" />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
