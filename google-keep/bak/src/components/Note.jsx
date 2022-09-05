import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  return (
    <div className="note" id={props.id}>
      <div className="container">
        <div className="title">{props.note.title}</div>
        <div
          className="content"
          style={
            props.note.content.split(" ").length >= 10
              ? { fontSize: "14px" }
              : { fontSize: "16px" }
          }
        >
          {props.note.content}
        </div>
      </div>
      <div className="delete">
        {
          <DeleteIcon
            className="delete-icon"
            onClick={() => {
              props.removeNote(props.id);
              console.log(props.id);
            }}
          />
        }
      </div>
    </div>
  );
}

export default Note;
