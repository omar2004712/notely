import '../styles/index.css';
import React from 'react';

export default function Input({
  label,
  placeholder,
  setValue,
  value,
  type,
  errMsg,
}) {
  return (
    <div className="w-[90%] flex flex-col">
      <label className="text-sm font-semibold text-gray-400">{label}</label>
      <input
        type={type || 'text'}
        placeholder={placeholder}
        className="w-[100%] py-1 px-2 text-lg outline-none border-2 border-blue-50 rounded focus:border-blue-300 bg-blue-50"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <label className="text-sm text-red-500">{errMsg}</label>
    </div>
  );
}
