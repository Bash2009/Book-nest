import React from "react";
import BookFinder from "../partials/bookFinder";
import Navbar from "../partials/navBar";
import ContactUs from "../partials/contactUs";

const SearchPage = () => {
  return (
    <>
      <Navbar id="nav3" />
      <BookFinder />
      <ContactUs />
    </>
  );
};

export default SearchPage;
