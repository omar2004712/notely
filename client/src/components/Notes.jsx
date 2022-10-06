import '../styles/index.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from './Note';

// let pageNumber = 0;

function Notes() {
  const [fetchedNotes, setFetchedNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const renderNotes = () => {
    return notes.map((note) => <Note key={note._id} note={note} />);
  };

  const fetchNotes = async (pageNo) => {
    const { data } = await axios.post('/api/notes', { index: pageNo });
    setFetchedNotes(data.notes);
    setPageNumber(pageNo + 1);
  };

  const onScroll = async ({ target }) => {
    if (target.scrollHeight - target.scrollTop !== target.clientHeight) {
      return;
    }

    await fetchNotes(pageNumber);
  };

  useEffect(() => {
    setNotes((notes) => [...notes, ...fetchedNotes]);
  }, [fetchedNotes]);

  useEffect(() => {
    const INITIAL_PAGE_NUMBER = 0;
    fetchNotes(INITIAL_PAGE_NUMBER);
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
    <div
      onScroll={onScroll}
      className="overflow-auto h-[calc(100vh-64px)] grid gap-x-2 grid-cols-notes justify-center auto-rows-[1px] mt-[64px] p-4"
    >
      {renderNotes()}
    </div>
  );
}

export default Notes;
