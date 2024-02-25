import React from "react";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex gap-4 items-center bg-gray-200 p-8 justify-between">
        <p>Welcome Back</p>
        <div className="gap-2 flex ">
          <span>{userData.firstName}</span>
          <span>{userData.lastName}</span>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center">
        <button
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          onClick={() => navigate("/")}
        >
          Reauthenticate
        </button>
      </div>
    </>
  );
};

export default Home;
