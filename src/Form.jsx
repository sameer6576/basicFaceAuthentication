import React, { useState } from "react";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { userData, updateUser } = useUser();
  const {
    firstName: initialFirstName,
    lastName: initialLastName,
    email: initialEmail,
  } = userData;
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    email: initialEmail,
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    navigate("/auth");
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex gap-8 bg-gray-300 p-8 rounded-lg shadow-lg ">
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <div className="flex gap-8 p-4 justify-between w-full items-center">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="bg-slate-50 rounded-md p-2"
          />
        </div>
        <div className="flex gap-8 p-4">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            className="bg-slate-50 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-8 p-4 justify-between">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            className="bg-slate-50 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="items-center justify-center bg-gray-800 text-white mx-auto py-2 px-4 rounded-md mt-8"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
