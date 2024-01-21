// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import HomeIcon from "/src/assets/imgs/home_icon.png"; // Replace with the actual path to your home icon
import "./style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/View">
        <div className="home-button">Home</div>
        <div className="home-icon">
          <img src={HomeIcon} alt="Home" className="home-icon" />
        </div>
      </Link>

      <div className="plus-div"> + </div>
      <div className="plus-div2"> + </div>
      <div className="plus-div3"> + </div>

      <div className="dot-div"> . </div>
      <div className="dot-div2"> . </div>
      <div className="dot-div3"> . </div>

      <div className="ast-div"> * </div>
      <div className="ast-div2"> * </div>
      <div className="ast-div3"> * </div>

      <div>
        <img className="white-circle" src="/images/white-circle.png" />
      </div>
      <div>
        <img className="white-circle2" src="/images/white-circle.png" />
      </div>
      <div>
        <img className="white-circle3" src="/images/white-circle.png" />
      </div>

      <div>
        <img className="white-triangle" src="/images/white-triangle.png" />
      </div>
      <div>
        <img className="white-triangle2" src="/images/white-triangle.png" />
      </div>

      <div>
        <img className="down-triangle" src="/images/down-triangle.png" />
      </div>
      <div>
        <img className="down-triangle2" src="/images/down-triangle.png" />
      </div>

      <div>
        <img className="black-cat" src="/images/black-cat.png" />
      </div>

      <div>
        <img className="paw" src="/images/paw.png" />
      </div>
      <div>
        <img className="paw2" src="/images/paw.png" />
      </div>

      <div>
        <img className="orange-cat" src="/src/assets/imgs/orange-cat.png" />
      </div>

      <div>
        <img className="spotted-cat" src="/images/spotted-cat.png" />
      </div>
    </nav>
  );
};

export default Navbar;
