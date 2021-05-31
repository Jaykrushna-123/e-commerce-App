import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="navbar-brand text-primary" to="/">
      {/* <i className="fas fa-dragon" style={{ fontSize: "1.2em" }}></i> Store */}
      <img src="https://icubeelectronics.com/wp-content/uploads/2018/06/flipkart-logo-yellow.png" alt="flipkart" width="95px" />
    </Link>
  );
}
