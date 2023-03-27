import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  // const logout = () => {
  //   localStorage.clear();
  //   navigate("/signup");
  // };

  return (
    <div>
    <img className="logo" src="https://clients.smartysoft.in/files/Smarty%20Final%20Logo_Reverse.png"style={{width:"150px",height:"45px",paddingTop:"43px"}}  alt="logo"/>
    { auth ?
      <ul className="nav-ul nav-right">
        <li>
          <Link to="/">MyTodo</Link>
        </li>
        <li>
          <Link src="https://clients.smartysoft.in/files/Smarty%20Final%20Logo_Reverse.png" to="/add">Add MyTodo</Link>
        </li>
     
      
      </ul>
      :
      <ul className="nav-ul nav-right" >
      <li>
            <Link to="/signin">SignIn</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
      </ul>
    }
    </div>
  );
};

export default Header;
