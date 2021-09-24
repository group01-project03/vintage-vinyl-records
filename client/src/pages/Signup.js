import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

 //props to seperate elements 
function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password,
        username: formState.username,
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">
        ← Go to Login
      </Link>

      <h2 className="signup-title">Signup</h2>
      <div className="signup-container">
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2 username">
          <label htmlFor="Username">Username:</label>
          <input
            placeholder="username"
            name="username"
            type="username"
            id="username"
            className="username-input"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 email">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            className="email-input"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 password">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            className="password-input"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
      </div>
    </div>
  );

}

export default Signup;