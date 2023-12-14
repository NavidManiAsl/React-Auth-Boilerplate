import { useState, useEffect, useRef } from "react";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formDataValidity, setFormDataValidity] = useState({
    email: false,
    password: false,
  });
  const [formFocus, setFormFocus] = useState({
    email: false,
    password: false,
  });

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleFocus = (e) => {
    setFormFocus((prevstate) => ({
      ...prevstate,
      [e.target.name]: true,
    }));
  };

  const handleChange = (e) => {
    setFormData((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <section className="body">
        <form className="form">
          <h1 className="header">Login</h1>

          <label className="label" htmlFor="email">
            Email address
          </label>
          <input
            className="input"
            type="text"
            ref={inputRef}
            name="email"
            onFocus={handleFocus}
            onChange={handleChange}
          />
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="text"
            name="password"
            onFocus={handleFocus}
            onChange={handleChange}
          />
          <button className="Registerbutton">Log In</button>
          <p className="attention">
            Do not have an account?
            <a href="#" className="link">
              Sign in!
            </a>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
