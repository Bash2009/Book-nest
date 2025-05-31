import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-md p-3 bg-prim">
        <Link to="/" className="navbar-brand fw-bold text-accent">
          Book Nest
        </Link>
        <button
          className="btn d-md-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + props.id}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id={props.id}>
          <div className="navbar-nav ms-auto">
            <Link to="/" className="nav-link text-second">
              Home
            </Link>

            <Link to="/search" className="nav-link text-second">
              Search
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
