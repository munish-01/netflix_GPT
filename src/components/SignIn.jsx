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
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState("signIn");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [authError, setAuthError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            photoURL: "https://avatars.githubusercontent.com/u/141801622?v=4",
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
              // Profile updated!
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setAuthError(getFirebaseAuthError(error.code));
            });
          // console.log(user);
        })
        .catch((error) => {
          console.log("Firebase error code:", error.code); // IMPORTANT
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
          // console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          console.log("Firebase error code:", error.code); // IMPORTANT
          setAuthError(getFirebaseAuthError(error.code));
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <Header />
      <div className="fixed inset-0 -z-10">
        <img src={bg_logo} className="h-full w-full object-cover" />
      </div>
      <form
        className="absolute p-12 bg-black/85 w-3/12 my-36 mx-auto left-0 right-0 text-white rounded"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-3xl font-semibold mb-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-gray-700 rounded"
            ref={name}
          />
        )}
        {nameError && <p className="text-red-500 text-sm mb-2">{nameError}</p>}

        <input
          type="text"
          placeholder="Email"
          className="p-4 my-3 w-full bg-gray-700 rounded"
          ref={email}
        />
        {emailError && (
          <p className="text-red-500 text-sm mb-2">{emailError}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="p-4 my-3 w-full bg-gray-700 rounded"
          ref={password}
        />
        {passwordError && (
          <p className="text-red-500 text-sm mb-2">{passwordError}</p>
        )}

        <div>
          {authError && (
            <p className="text-red-500 text-sm mb-3">{authError}</p>
          )}
        </div>

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 mt-4 rounded"
          onClick={handleButtonClick}
        >
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
