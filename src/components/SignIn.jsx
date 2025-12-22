import React, { useRef, useState } from "react";
import Header from "./Header";
import bg_logo from "../assets/bg.jpg";
import checkValidData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { getFirebaseAuthError } from "../utils/firebaseErrorMap";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { AVTAR_URL } from "../utils/constants";

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState("signIn");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [authError, setAuthError] = useState("");
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // validate the form data
    const nameValue = isSignIn ? "" : name.current.value || "";
    const emailValue = email.current.value || "";
    const passValue = password.current.value || "";

    const message = checkValidData(nameValue, emailValue, passValue, isSignIn);
    // setErrorMessage(message)
    setNameError(message.name || "");
    setEmailError(message.email || "");
    setPasswordError(message.password || "");

    if (Object.keys(message).length > 0) return;

    // logic for sign In/Up Logic
    if (!isSignIn) {
      // signUp logic here
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: AVTAR_URL,
          })
            .then(() => {
              // auth.currentUser is updated user not exisiting one
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setAuthError(getFirebaseAuthError(error.code));
            });
        })
        .catch((error) => {
          setAuthError(getFirebaseAuthError(error.code));
        });
    } else {
      // signIn logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          setAuthError(getFirebaseAuthError(error.code));
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={bg_logo}
          className="h-full w-full object-cover"
          alt="background"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <Header />

        {/* Form Wrapper */}
        <div className="flex items-center justify-center min-h-screen px-4 pt-24">
          <form
            className="w-full max-w-md bg-black/80 text-white rounded-lg
                   p-6 sm:p-8 md:p-10 shadow-xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>

            {!isSignIn && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 my-2 w-full bg-gray-700 rounded outline-none"
                  ref={name}
                />
                {nameError && (
                  <p className="text-red-500 text-sm mb-1">{nameError}</p>
                )}
              </>
            )}

            <input
              type="text"
              placeholder="Email"
              className="p-3 my-2 w-full bg-gray-700 rounded outline-none"
              ref={email}
            />
            {emailError && (
              <p className="text-red-500 text-sm mb-1">{emailError}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="p-3 my-2 w-full bg-gray-700 rounded outline-none"
              ref={password}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mb-1">{passwordError}</p>
            )}

            {authError && (
              <p className="text-red-500 text-sm mt-2">{authError}</p>
            )}

            <button
              className="w-full bg-red-600 hover:bg-red-700
                     text-white font-semibold py-3 mt-4 rounded
                     transition-colors"
              onClick={handleButtonClick}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>

            <p className="text-sm mt-4 text-gray-300">
              {isSignIn ? "New to Netflix? " : "Already a Member. "}
              <span
                className="font-bold cursor-pointer hover:underline text-white"
                onClick={toggleSignInForm}
              >
                {isSignIn ? "Sign Up now" : "Sign In now"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
