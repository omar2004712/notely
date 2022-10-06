import '../styles/index.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAuth } from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Notes from './Notes';
import NoteEditor from './NoteEditor';
import CreateButton from './CreateButton';

function App({ getAuth }) {
  useEffect(() => {
    getAuth();
  }, [getAuth]);

  return (
    <div className="absolute font-['Product_Sans']">
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Landing} />
        <Route path="/notes" exact component={Notes} />
        <Route
          path={['/edit_note', '/new_note']}
          exact
          component={NoteEditor}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path={['/notes', '/']} exact component={CreateButton} />
      </BrowserRouter>
    </div>
  );
}

export default connect(null, { getAuth })(App);
