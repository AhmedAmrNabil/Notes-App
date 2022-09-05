import React, { useState } from "react";
import Header from "./Header";
import CreateNote from "./CreateNote";
import Note from "./Note";
import Footer from "./Footer";
import axios from "axios";
import Masonry from "react-masonry-css";

function App() {
  const [notes, setNotes] = useState([
    {
      title: "Testing",
      content: "Note",
      id: "94a05397-1225-4680-ba6d-d192e6b873ec",
    },
    {
      title: "Testing Note 1",
      content: "testing note 1",
      id: "94814dff-33b7-4b5c-a206-9e7c242a1638",
    },
    {
      title: "Testing Note 1",
      content: "testing note 2",
      id: "e092806d-8dc2-4199-8763-62c7bb3b057d",
    },
  ]);
  const breakpointColumnsObj = {
    default: 8,
    2080: 7,
    1820: 6,
    1560: 5,
    1300: 4,
    1040: 3,
    780: 2,
    520: 1,
  };

  React.useEffect(() => {
    axios.get("notes").then((res) => setNotes(res.data.notes.reverse()));
  }, []);

  function addNote(note) {
    console.log(note);
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
