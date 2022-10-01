import '../styles/index.css';
import React from 'react';
import { connect } from 'react-redux';

function Header({ auth }) {
  const buttonClassNames =
    'text-lg after:h-[2px] after:rounded after:scale-x-0 after:w-[100%] after:bg-black after:block hover:after:scale-x-100 after:transition-all';

  const renderButtons = () => {
    if (auth === null) {
      return <div></div>;
    } else if (auth) {
      return <button className={buttonClassNames}>logout</button>;
    } else {
      return <button className={buttonClassNames}>login</button>;
    }
  };

  return (
    <div className="flex justify-center fixed w-[100vw] p-3 bg-yellow-400">
      <h1 className="flex-1 text-4xl">Notely</h1>
      {renderButtons()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
