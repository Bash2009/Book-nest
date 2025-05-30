import React, { useState } from "react";
import Background from "../partials/backGround";
import Navbar from "../partials/navBar";
import Form from "../partials/form";

const Credentials = () => {
  const [change, setChange] = useState("Log in");
  function handleChange() {
    if (change == "Sign up") {
      setChange("Log in");
    } else {
      setChange("Sign up");
    }
  }
  return (
    <>
      <Background>
        <Navbar id="nav1" />
        <Form type={change} handleChange={handleChange} />
      </Background>
    </>
  );
};

export default Credentials;
