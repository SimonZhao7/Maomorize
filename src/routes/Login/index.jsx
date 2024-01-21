import "./style.css";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../../firebase"; // Assuming you have initialized Firebase in 'firebase.js' file
import { getDoc, doc } from "firebase/firestore";
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
      console.log("User logged in with Google successfully!", user);

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        window.location.href =
          "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=157914177018-e41qqaq85l0g2rd004rub0p2rmvvrfkc.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fget-token";
      }
      navigate("/view");
      // Redirect user to View Page
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <div className="container">
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

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Continue with Google</button>

      {/* Link to Forgot Password */}
      <div className="forgot-password-link">
        <Link to="/Forgot">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
