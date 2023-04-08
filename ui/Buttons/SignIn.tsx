"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import LoginCard from "ui/Auth/AuthComponent";

export const SignInModal = () => {
  const [isOpen, setIsOpen] = useState(false);

const handleLogin = () => {
  setIsOpen(true)
  toast('Signing In')
}

  function SignInButton() {
    return (
      <div onClick={handleLogin}>
        <Link
          href="#"
          className="text-zinc-900 dark:text-white hover:bg-zinc-50 focus:ring-4 bg-zinc-900 border-zinc-700 border focus:ring-zinc-300 hover:scale-105 text-xs rounded-lg lg:text-sm px-3 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-zinc-700 focus:outline-none dark:focus:ring-zinc-800  shadow-zinc-200 hover:shadow-sm"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <SignInButton />
        {isOpen && (
          <div
            className="z-50 flex m-4 mx-auto backdrop-blur-md -mt-5"
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              display: "flex",
            }}
            tabIndex={-1}
          >
            <div
              className="flex flex-col p-4 rounded-2xl bg-black opacity-2"
              onClick={() => setIsOpen(false)}
            >
              <button onClick={() => setIsOpen(false)}>Close</button>

              <LoginCard />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignInModal;
