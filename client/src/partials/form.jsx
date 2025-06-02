import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Form = (props) => {
  const [ready, setReady] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (props.type == "Sign up") {
      setValues(values, {
        name: "",
        con_password: "",
      });
    }
  }, []);

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    if (props.type == "Sign up") {
      if (values.password !== values.con_password) {
        setReady(false);
        alert("Input the same passwords");
      } else {
        setReady(true);
      }

      if (ready == true) {
        console.log("done");
        axios
          .post("/api/sign_up", values)
          .then((res) => {
            navigate("/");
          })
          .catch((err) => console.log(err));
      } else {
        console.log("Passwords are not the same");
      }
    } else {
      axios
        .post("/api/login", values)
        .then((res) => {
          console.log(res);
          if (res.data.success == true) {
            navigate("/");
          } else {
            alert("Incorrect information");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <div className="col-11 col-md-6 col-lg-4 mx-auto rounded-4 bg-prim text-second p-3 mt-5">
        <form method="POST" onSubmit={handleSubmit}>
          <p className="fw-bold fs-3 text-accent">Books nest</p>

          {props.type == "Sign up" && (
            <>
              <label htmlFor="name" className="my-2 fw-bold">
                Username:
              </label>
              <input
                onChange={(e) => {
                  setValues({ ...values, name: e.target.value });
                }}
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
            </>
          )}
          <label htmlFor="email" className="my-2 fw-bold">
            Email:
          </label>
          <input
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
            }}
            type="email"
            name="email"
            id="email"
            className="form-control"
          />

          <label htmlFor="password" className="my-2 fw-bold">
            Password:
          </label>
          <input
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
            }}
            type="password"
            name="password"
            id="password"
            className="form-control"
          />

          {props.type == "Sign up" && (
            <>
              <label htmlFor="conpassword" className="my-2 fw-bold">
                Confirm Password:
              </label>
              <input
                onChange={(e) => {
                  setValues({ ...values, con_password: e.target.value });
                }}
                type="password"
                name="conpassword"
                id="conpassword"
                className="form-control"
              />
            </>
          )}

          <input
            onChange={(e) => {
              setValues({ ...values, name: e.target.value });
            }}
            type="submit"
            value={props.type}
            className="btn text-second mt-3 my-2 btn-accent form-control"
          />
          {props.type == "Sign up" && (
            <>
              <a
                className="text-second text-decoration-none py-1"
                onClick={props.handleChange}
              >
                Already have an account? Log in
              </a>
            </>
          )}
          {props.type == "Log in" && (
            <>
              <a
                className="text-second text-decoration-none py-1"
                onClick={props.handleChange}
              >
                Don't have an account? Sign up
              </a>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Form;
