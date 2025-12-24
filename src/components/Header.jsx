import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .try(() => {})
      .catch(
        (error = {
          // an error hanppened - page bna lena
        })
      );
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unSubscribe when component unmounts
    return () => unSubscribe();
    // and it will unSubscribe my onAuthStateChange
  }, []);

  const handleGptSearchClick = () => {
    // toogle GPT search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-10 py-3 bg-linear-to-b from-black/90 to-transparent">
        <img
          className="w-28 md:w-44 cursor-pointer transition-transform duration-300 hover:scale-105"
          src={logo}
          alt="logo"
        />

        {user && (
          <div className="flex items-center gap-2 sm:gap-4">
            {showGptSearch && (
              <select onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={handleGptSearchClick}
              className="bg-transparent hover:bg-red-800 text-white-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"
            >
              {showGptSearch? "Homepage" : "GPT Search"}
            </button>
            <img
              className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover"
              alt="usericon"
              src={user?.photoURL}
            />

            <button
              onClick={handleSignOut}
              className=" bg-red-800 font-semibold text-white py-2 px-4 hover:border border-white-800 rounded"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
