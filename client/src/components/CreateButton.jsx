import '../styles/index.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editNote } from '../actions';

function CreateButton({ auth, editNote }) {
  const renderButton = () => {
    switch (auth) {
      case null:
      case false:
        return <></>;
      default:
        return (
          <Link to="/new_note">
            <button
              onClick={() => editNote(null)} // in case the note was already set before reinitialize it to null
              className="fixed bottom-4 right-4 text-2xl before:content-['+'] before:text-3xl flex items-center gap-5 max-w-[50px] rounded-[25px] overflow-hidden shadow-[0_0_10px_rgb(0_0_0/0.2)] py-2 px-4 text-yellow-500 sm:hover:max-w-[125px] sm:hover:gap-2 sm:hover:bg-gray-100 transition-all duration-300"
            >
              create
            </button>
          </Link>
        );
    }
  };

  return <>{renderButton()}</>;
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { editNote })(CreateButton);
