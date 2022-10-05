import '../styles/index.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import NoteForm from './NoteForm';
import axios from 'axios';

function NoteEditor({ note }) {
  const [noteTitle, setNoteTitle] = useState(note ? note.title : '');
  const [noteContent, setNoteContent] = useState(note ? note.content : '');

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('note: ', note);
    console.log(`title: ${noteTitle} ${note.title}`);
    console.log(`content: ${noteContent} ${noteTitle}`);

    const res = await axios.put('/api/edit-note', {
      _id: note._id,
      title: noteTitle,
      content: noteContent,
    });

    console.log(res.data);
  };

  const renderTemplate = () => {
    return (
      <NoteForm
        note={{
          noteTitle,
          setNoteTitle,
          noteContent,
          setNoteContent,
          onSubmit,
        }}
      />
    );
  };

  return (
    <div className="flex w-[100vw] h-[100vh] items-center justify-center">
      {renderTemplate()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { note: state.editNote };
};

export default connect(mapStateToProps)(NoteEditor);
