import '../styles/index.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Input from './Input';
import RegisterForm from './RegisterForm';
import RegisterButton from './RegisterButton';

export default function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post('/api/register', {
      name,
      password,
      confirmPassword,
    });

    if (data.redirect) window.location = data.redirect;

    if (data.name) setNameErrMsg(data.name.msg);
    else setNameErrMsg('');

    if (data.password) setPasswordErrMsg(data.password.msg);
    else setPasswordErrMsg('');

    if (data.confirmPassword)
      setConfirmPasswordErrMsg(data.confirmPassword.msg);
    else setConfirmPasswordErrMsg('');
  };

  return (
    <RegisterForm withSignWithGoogle onSubmit={onSubmit}>
      <div className="flex w-[100%] items-center text-2xl">
        <Link
          to="/login"
          className="transition-all bg-gray-100 rounded-br hover:bg-gray-200 text-center flex-1 p-2"
        >
          login
        </Link>
        <p className="text-center flex-1 p-2">register</p>
      </div>
      <Input
        placeholder="Enter your Name"
        label="Name"
        value={name}
        setValue={setName}
        errMsg={nameErrMsg}
      />
      <Input
        placeholder="Enter a Password"
        label="Password"
        value={password}
        setValue={setPassword}
        errMsg={passwordErrMsg}
        type="password"
      />
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        errMsg={confirmPasswordErrMsg}
        type="password"
      />
      <RegisterButton innerText="Register" />
    </RegisterForm>
  );
}
