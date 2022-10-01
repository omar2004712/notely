import '../styles/index.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Header({ auth }) {
  const buttonClassNames =
    'mt-1 text-lg after:h-[2px] after:rounded after:scale-x-0 after:w-[100%] after:bg-black after:block hover:after:scale-x-100 after:transition-all';

  const renderButtons = () => {
    if (auth === null) {
      return <div></div>;
    } else if (auth) {
      return (
        <a href="/api/logout" className={buttonClassNames}>
          logout
        </a>
      );
    } else {
      return (
        <Link to="/login" className={buttonClassNames}>
          login
        </Link>
      );
    }
  };

  return (
    <div className="flex justify-end fixed w-[100vw] p-3 bg-yellow-400 top-0 left-0">
      <Link to={auth ? '/notes' : '/'} className="flex-1 text-4xl">
        Notely
      </Link>
      {renderButtons()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
