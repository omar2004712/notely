import '../styles/index.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from './Input';
import RegisterForm from './RegisterForm';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post('/api/login', {
      name,
      password,
    });

    if (data.redirect) {
      return (window.location = data.redirect);
    }

    if (data.name) setNameErrMsg(data.name.msg);
    else setNameErrMsg('');

    if (data.password) setPasswordErrMsg(data.password.msg);
    else setPasswordErrMsg('');
  };

  return (
    <RegisterForm onSubmit={onSubmit} withSignWithGoogle>
      <div className="flex w-[100%] items-center text-2xl">
        <p className="text-center flex-1 p-2">login</p>
        <Link
          className="transition-all bg-gray-100 rounded-bl hover:bg-gray-200 text-center flex-1 p-2"
          to="/register"
        >
          register
        </Link>
      </div>
      <Input
        placeholder="Enter your Name"
        value={name}
        setValue={setName}
        label="Name"
        errMsg={nameErrMsg}
      />
      <Input
        type="password"
        placeholder="Enter a Password"
        value={password}
        setValue={setPassword}
        label="Password"
        errMsg={passwordErrMsg}
      />
      <button
        type="submit"
        className="text-xl py-2 w-[100%] bg-yellow-400 rounded-b-xl text-white hover:bg-yellow-300 mt-4"
      >
        login
      </button>
    </RegisterForm>
  );
}

export default Login;
