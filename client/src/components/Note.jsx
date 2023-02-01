import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Note(props) {
  function deleteNote() {
    props.onDelete(props.id);
  }
  function editNote() {
    props.onEditNote(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={deleteNote}>
        <DeleteIcon />
      </button>
      <button>
        <EditIcon onClick={editNote} />
      </button>
    </div>
  );
}

export default Note;
