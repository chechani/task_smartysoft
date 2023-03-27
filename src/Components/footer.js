import React from "react";
import { BsGoogle } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <span className="copyright" style={{marginLeft:"150px"}}>
        Copyright © 2022-2023  Inc. All Right Reserved.
      </span>
      <div className="icons">
        <a href="https://mail.google.com/mail/">
          <BsGoogle style={{ paddingRight: "10px" }} />
        </a>
        <a href="https://www.instagram.com/accounts/login/">
          <BsInstagram style={{ paddingRight: "10px" }} />
        </a>
        <a href="https://www.linkedin.com/login">
          <BsLinkedin style={{ paddingRight: "10px" }} />
        </a>
        <a href="https://www.facebook.com/login/">
          <BsFacebook style={{ paddingRight: "10px" }} />
        </a>
      </div>
      <style>
        {`
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #333;
            color: #fff;
            padding: 10px;
            width: 100%;
            position: fixed;
            bottom: 0;
          }

          .icons a {
            color: #fff;
            text-decoration: none;
            margin-right: 10px;
          }

          .icons a:hover {
            color: #999;
          }

          .icons svg {
            height: 20px;
            width: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default Footer;
