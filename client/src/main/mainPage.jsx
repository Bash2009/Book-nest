import React, { useEffect, useState } from "react";
import Navbar from "../partials/navBar";
import BookCarousel from "../partials/bookCarousel";
import SubHead from "../partials/subHead";
import ContactUs from "../partials/contactUs";
import Genres from "../partials/genres";

const MainPage = () => {
  return (
    <>
      <Navbar id="nav2" />
      <SubHead />
      <BookCarousel />
      <br />
      <p className="fs-4 col-11 mx-auto">Recommended for you:</p>
      <hr className="col-11 mx-auto" />
      <Genres />
      <ContactUs />
    </>
  );
};

export default MainPage;
