import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ 
        variables: { email: formState.email, password: formState.password } 
      })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
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
      <Link to="/signup">
        ← Go to Signup
      </Link>

      <h2 className="login-title">Login</h2>
      <div className="login-container">
      <form onSubmit={handleFormSubmit}>
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
        {
          error ? <div>
            <p className="error-text" >Your email or password are incorrect.</p>
          </div> : null
        }
        <div className="flex-row flex-end submit-btn">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;