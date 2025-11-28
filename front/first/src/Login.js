import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle API login on button click
   async function handleLogin(){
    const resp = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await resp.json();
    console.log("API Response:", data);

    if (data.success) {
      navigate("/User");
    } else {
      alert("Wrong username or password");
    }
  };

  // Function to handle username input change
  const handleUsernameInput = (e) => {
    setUsername(e.target.value); // sets username state
  };

  // Function to handle password input change
  const handlePasswordInput = (e) => {
    setPassword(e.target.value); // sets password state
  };

  return (
    <div>
      <style>{`
        .login-container {
          width: 350px;
          margin: 100px auto;
          padding: 30px;
          text-align: center;
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .input-box {
          width: 90%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 8px;
          border: 1px solid #bbb;
        }
        .login-btn {
          width: 95%;
          padding: 12px;
          background: #007bff;
          border: none;
          color: white;
          margin-top: 15px;
          border-radius: 8px;
        }
      `}</style>

      <div className="login-container">
        <h1>Login Here</h1>

        {/* Username input */}
        <input
          className="input-box"
          placeholder="Enter Username"
          onChange={handleUsernameInput} // calls function that sets username
        />

        {/* Password input */}
        <input
          className="input-box"
          placeholder="Enter Password"
          type="password"
          onChange={handlePasswordInput} // calls function that sets password
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

























