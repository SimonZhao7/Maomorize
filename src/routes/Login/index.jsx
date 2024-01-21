import "./style.css";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebase"; // Assuming you have initialized Firebase in 'firebase.js' file
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      navigate("/view");
      // Redirect user to View Page
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Set up GoogleAuthProvider
      const provider = new GoogleAuthProvider();
      // Sign in with Google using a pop-up window
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate("/view");
      console.log("User logged in with Google successfully!", user);
      // Redirect user to View Page
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <div className="mao-background"> 
    
    <div className="container">
     
    <div className="login-form">
      <div className="maomorize-text"> Maomorize </div>

      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="login-button" onClick={handleLogin}>Login</button>
      <button className="continue-button" onClick={handleGoogleLogin}>Continue with Google</button>

      {/* Link to Forgot Password */}
      <div className="forgot-password-link">
        <Link to="/Forgot">Forgot Password?</Link>
      </div>

    <div className="login-cat"> </div>
    <div className="speech-bubble"> </div>

      
    </div>
    </div>
    </div>
  );
};

export default Login;
