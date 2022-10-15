import GOOGLE_LOGO from './images/google-logo.png';
import React from 'react';

export default function SignWithGoogle() {
  return (
    <a
      href="/auth/google"
      className="flex justify-center font-semibold text-xl text-gray-500 items-center gap-2 shadow-[0_0_4px_gray] w-[90%] max-w-[320px] p-2 rounded-full hover:bg-gray-100 transition-all"
    >
      <span>Sign With Google</span>
      <img src={GOOGLE_LOGO} alt="google logo" className="w-8" />
    </a>
  );
}
