import '../styles/index.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from './Note';

let pageNumber = 0;

function Notes() {
  const [fetchedNotes, setFetchedNotes] = useState([]);
  const [notes, setNotes] = useState([]);

  const renderNotes = () => {
    return notes.map((note) => <Note key={note._id} note={note} />);
  };

  useEffect(() => {
    pageNumber = 0;
    window.addEventListener('scroll', async () => {
      const NAV_BAR_HEIGHT = 64; // the height of the nav bar 64px
      if (
        document.body.scrollHeight - window.scrollY !==
        window.innerHeight - NAV_BAR_HEIGHT
      ) {
        return;
      }

      const { data } = await axios.post('/api/notes', { index: pageNumber });
      setFetchedNotes(data.notes);
      pageNumber++;
    });
  }, []);

  useEffect(() => {
    setNotes((notes) => [...notes, ...fetchedNotes]);
  }, [fetchedNotes]);

  useEffect(() => {
    window.dispatchEvent(new Event('scroll'));
  }, []);

  useEffect(() => {
    const rowGap = 8; // 8px gap between the rows of notes

    Array.from(document.querySelectorAll('.note')).forEach((note) => {
      note.parentElement.style.gridRowEnd = `span ${
        note.clientHeight + rowGap
      }`;
    });
  }, [notes]);

  return (
    <div className="grid gap-x-2 grid-cols-notes justify-center auto-rows-[1px] mt-[64px] p-4">
      {renderNotes()}
    </div>
  );
}

export default Notes;
