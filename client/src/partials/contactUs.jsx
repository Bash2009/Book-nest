import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="row p-4 bg-accent mt-5" id="contactUs">
        <div className="col-12 col-md-6 bg-transparent">
          <p className="fs-5 fw-bold text-uppercase bg-transparent text-white">
            Contact us
          </p>
          <p className="bg-transparent text-white">
            Hope You enjoyed our Collection of the most amazing books. You can
            reach out to us through our social media pages
          </p>

          <div className="row mt-4">
            <span className="fa fa-phone col-1"></span>
            <span className="fa fa-facebook-square col-1"></span>
            <span className="fa fa-whatsapp col-1"></span>
            <span className="fa fa-instagram col-1"></span>
            <span className="fa fa-twitter-square col-1"></span>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-5 mt-md-2 bg-transparent">
          <p className="text-uppercase fw-bold bg-transparent text-white">
            Write to us
          </p>
          <form className="bg-transparent">
            <input
              type="text"
              className="form-control rounded-0 my-2"
              placeholder="Name"
            />
            <input
              type="text"
              className="form-control rounded-0 my-2"
              placeholder="Message"
            />
            <input
              type="submit"
              className="btn bg-dark text-white rounded-0 p-2 px-5"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
