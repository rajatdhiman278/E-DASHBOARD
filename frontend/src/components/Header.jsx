import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Hulk from "../assests/Images/Hulk.png";
const Header = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="mainContainer">
      {auth ? (
        <ul className="Nav-ul">
          <li>
            <img src={Hulk} alt="Hulk" className="logo" />
          </li>

          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update product</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="Nav-u_l">
          <div>
            <img src={Hulk} alt="Hulk" className="logo" />
          </div>
          <div>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Header;
