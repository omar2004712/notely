import React from 'react';

export default function RegisterButton({ innerText }) {
  return (
    <button
      type="submit"
      className="text-xl py-2 w-[100%] bg-yellow-400 rounded-b-xl text-white hover:bg-yellow-300 mt-4"
    >
      {innerText}
    </button>
  );
}
