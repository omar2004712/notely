import '../styles/index.css';
import React from 'react';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] gap-8">
      <h1 className="text-2xl text-center">
        Start Creating and Sharing Your Notes!!
      </h1>
      <p className="text-xl text-gray-400 text-center">
        Create your account with us!
      </p>
    </div>
  );
}
