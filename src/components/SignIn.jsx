import React, { useState } from "react";
import Header from "./Header";
import bg_logo from "../assets/bg.jpg";

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={bg_logo} />
      </div>
      <form className="absolute p-12 bg-black/85 w-3/12 my-36 mx-auto left-0 right-0 text-white rounded">
        <h1 className="text-3xl font-semibold mb-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-gray-700 rounded"
          />
        )}

        <input
          type="text"
          placeholder="Email"
          className="p-4 my-3 w-full bg-gray-700 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="p-4 my-3 w-full bg-gray-700 rounded"
        />

        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 mt-4 rounded">
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <p>
          {isSignIn ? "New to Netflix?  " : "Already a Member. "}

          <span className="font-bold cursor-pointer" onClick={toggleSignInForm}>
            {isSignIn ? "Sign Up now" : "Sign In now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
