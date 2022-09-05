import React, { useState } from "react";
import Header from "./Header";
import CreateNote from "./CreateNote";
import Note from "./Note";
import Footer from "./Footer";
import axios from "axios";
import Masonry from "react-masonry-css";

function App() {
  const [notes, setNotes] = useState([]);
  const breakpointColumnsObj = {
    default: 8,
    2080:7,
    1820:6,
    1560:5,
    1300: 4,
    1040: 3,
    780: 2,
    520: 1
  };
  
  React.useEffect(() => {
    axios.get("notes").then((res) => setNotes(res.data.notes.reverse()));
  }, []);

  function addNote(note) {
    setNotes((prevNotes) => [note, ...prevNotes]);
    axios.post("note", note);
  }

  function removeNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    axios.delete(`note/${id}`);
  }

  return (
    <>
      <Header />
      <div className="content-wrap">
        <CreateNote addNote={addNote} />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="notes-grid"
          columnClassName="notes-column"
        >
          {notes.map((note, index) => {
            return <Note key={note.id} removeNote={removeNote} note={note} />;
          })}
        </Masonry>
      </div>
      <Footer />
    </>
  );
}

export default App;
