import '../styles/index.css';
import React, { useState } from 'react';
import Input from './Input';

export default function Register() {
  const [name, setName] = useState('');

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <form>
        <Input
          placeholder="Enter your Name"
          label="Name"
          value={name}
          setValue={setName}
        />
      </form>
    </div>
  );
}
