import '../styles/index.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAuth } from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Login from './Login';

function Register() {
  return <h1>Register</h1>;
}

function NoteEditor() {
  return <h1>Note Editor</h1>;
}

function Notes() {
  return <h1>Notes</h1>;
}

function App({ getAuth }) {
  useEffect(() => {
    getAuth();
  }, [getAuth]);

  return (
    <div className="font-['Product_Sans']">
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Landing} />
        <Route path="/notes" exact component={Notes} />
        <Route path="/edit_note" exact component={NoteEditor} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default connect(null, { getAuth })(App);
