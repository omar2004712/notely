import '../styles/index.css';
import React from 'react';
import SignWithGoogle from './SignWithGoogle';

export default function RegisterForm({
  children,
  onSubmit,
  withSignWithGoogle,
}) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-[100vw] h-[100vh]">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center max-w-[320px] w-[90vw] rounded-lg gap-2 shadow-[0_0_16px_rgb(220_222_226)]"
      >
        {children}
      </form>
      {withSignWithGoogle ? <SignWithGoogle /> : ''}
    </div>
  );
}
