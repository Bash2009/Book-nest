import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SubHead = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  function handleSignOut() {
    fetch("/api/signout")
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "failed") {
          return;
        } else {
          setUser("");
        }
      });
  }
  return (
    <>
      <div className="row p-3">
        <p className="fs-4 col-10 col-md-11 m-0">
          Welcome<span className="d-none d-md-inline-block"> to the nest</span>
          {user != "" && ", " + user}
        </p>

        {user != "" && (
          <>
            <Link
              onClick={handleSignOut}
              className="btn col-1 p-1 tltip-toggle"
            >
              <i className="fa fa-sign-out fs-4 text-accent text-end"></i>
              <span className="tltip text-accent">Sign out</span>
            </Link>
          </>
        )}

        {user == "" && (
          <>
            <Link to="/user" className="btn col-2 col-md-1 p-1 tltip-toggle">
              <i className="fa fa-sign-in fs-4 text-accent text-end"></i>
              <span className="tltip">Sign in</span>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default SubHead;
