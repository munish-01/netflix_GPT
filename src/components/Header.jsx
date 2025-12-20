import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className="flex items-center justify-between px-4 md:px-10 py-3 
                  bg-linear-to-b from-black/90 to-transparent"
      >
        <img
          className="w-28 md:w-44 cursor-pointer transition-transform duration-300 hover:scale-105"
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
        />

        {user && (
          <div className="flex items-center gap-2 sm:gap-4">
            <img
              className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover"
              alt="usericon"
              src={user?.photoURL}
            />

            <button
              onClick={handleSignOut}
              className="block px-3 py-2 text-xs sm:text-sm font-semibold
                     bg-red-600 hover:bg-red-700 rounded-md
                     transition-colors"
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
