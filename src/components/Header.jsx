import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(
        (error = {
          // an error hanppened - page bna lena
        })
      );
  };

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
