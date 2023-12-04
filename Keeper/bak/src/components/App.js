import React, { useState } from "react";
import Header from "./Header";
import CreateNote from "./CreateNote";
import Note from "./Note";
import Footer from "./Footer";

function App() {
  const [notes, setNotes] = useState([
    { title: "manga1", content: "kberaaa" },
    { title: "manga2", content: "kberaaa" },
    { title: "manga3", content: "kberaaa" },
    { title: "manga4", content: "kberaaa" },
    { title: "manga5", content: "kberaaa" },
  ]);

  function addNote(note) {
    setNotes((prevNotes) => [note, ...prevNotes]);
  }

  function removeNote(id) {
    setNotes((prevNotes) => prevNotes.filter((value, index) => index !== id));
  }

  return (
    <>
      <Header />
      <div className="content-wrap">
        <CreateNote addNote={addNote} />
        {notes.map((note, index) => {
          return (
            <Note key={index} id={index} removeNote={removeNote} note={note} />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default App;
