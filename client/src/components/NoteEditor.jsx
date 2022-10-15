import '../styles/index.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import NoteForm from './NoteForm';
import axios from 'axios';

function NoteEditor({ note }) {
  const [noteTitle, setNoteTitle] = useState(note ? note.title : '');
  const [noteContent, setNoteContent] = useState(note ? note.content : '');
  const [noteTitleErrMsg, setNoteTitleErrMsg] = useState('');
  const [noteContentErrMsg, setNoteContentErrMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    let res;

    if (note) {
      res = await axios.put('/api/edit-note', {
        _id: note._id,
        title: noteTitle,
        content: noteContent,
      });
    } else {
      res = await axios.post('/api/save-note', {
        title: noteTitle,
        content: noteContent,
      });
    }

    if (res.status === 201 || res.status === 204) {
      return (window.location = '/notes');
    }

    for (let error in res.data) {
      if (error === 'title') {
        setNoteTitleErrMsg(res.data[error].msg);
      } else {
        setNoteContentErrMsg(res.data[error].msg);
      }
    }
  };

  const renderTemplate = () => {
    return (
      <NoteForm
        note={{
          noteTitle,
          noteTitleErrMsg,
          setNoteTitle,
          noteContent,
          noteContentErrMsg,
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
