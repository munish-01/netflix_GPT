import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default Header;
