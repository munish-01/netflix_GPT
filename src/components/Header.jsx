import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
    return ()=> unSubscribe()
    // and it will unSubscribe my onAuthStateChange
  }, []);

  return (
    <div className=" flex absolute px-8 py-2 bg-linear-to-b from-black w-full z-10 justify-between items-center">
      <div>
        <img
          className="w-48 cursor-pointer"
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
      </div>
      {user && (
        <div className="flex p-2 items-center ">
          <img
            className="w-12 h-12 m-3 rounded-md"
            alt="usericon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="p-3 my-8 font-bold bg-red-600 rounded-lg justify-between text-white bg-opacity-80"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
