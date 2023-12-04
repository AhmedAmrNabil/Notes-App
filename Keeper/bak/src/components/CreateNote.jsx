import React, { useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

function CreateNote(props) {
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState({ title: "", content: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setText((prevText) => ({ ...prevText, [name]: value }));
  }

  function handleClick(e) {
    props.addNote(text);
    setFocus(false);
    setText({ title: "", content: "" });
  }

  return (
    <form onFocus={() => setFocus(true)}>
      <div className="create-note">
        <input
          name="title"
          onChange={handleChange}
          hidden={!focus}
          type="text"
          placeholder="Title"
          className="title"
          onFocus={() => setFocus(true)}
          value={text.title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          style={focus ? { fontWeight: "400" } : { fontWeight: "500" }}
          className="content"
          placeholder="Take a note..."
          rows={focus ? "3" : "1"}
          value={text.content}
        ></textarea>
        <div className="add" hidden={!focus}>
          <NoteAddIcon className="add-icon" onClick={handleClick} />
        </div>
      </div>
    </form>
  );
}
export default CreateNote;
