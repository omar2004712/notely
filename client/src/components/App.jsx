import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAuth } from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';

function Header() {
  return <h1>Header</h1>;
}

function Landing() {
  return <h1>Landing</h1>;
}

function Login() {
  return <h1>Login</h1>;
}

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
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Landing} />
        <Route path="/notes" exact component={Notes} />
        <Route path="/edit_note" exact component={NoteEditor} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default connect(null, { getAuth })(App);
