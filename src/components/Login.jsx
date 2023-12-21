import { useState, useEffect, useRef } from "react";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pattern } from "../Constants/regex";
import { faCheck, faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  useEffect(()=>{
    setFormDataValidity(prevState=>({
      ...prevState, email: pattern.email.test(formData.email)
    }))
  },[formData.email])

  useEffect(()=>{
    setFormDataValidity(prevstate=>({
      ...prevstate, password:pattern.password.test(formData.password)
    }))
  },[formData.password])

 useEffect(()=>{
  console.log()
 },[formData.email])

  return (
    <>
      <section className="body">
        <form className="form">
          <h1 className="header">Login</h1>

          <label className="label" htmlFor="email">
            Email address
          {  formData.email && <FontAwesomeIcon
            icon={
              (formDataValidity.email ? faCheck : faTimes)
            }
            className={formDataValidity.email ? "check" : "cross"}
          />}
          </label>
          <input
            className="input"
            type="email"
            ref={inputRef}
            name="email"
            onFocus={handleFocus}
            onChange={handleChange}
          />
            <label htmlFor="password" className="label">
          Password:
          {formData.password && <FontAwesomeIcon
            icon={
             
              (formDataValidity.password ? faCheck : faTimes)
            }
            className={formDataValidity.password ? "check" : "cross"}
          />}
        </label>
        <div className="input-container">
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            className="show-icon"
            title={!showPassword ? "Show password" : "Hide password"}
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input-password"
            onChange={handleChange}
            onFocus={() => handleFocus}
            autoComplete="off"
          />
        </div>
          <button className="Registerbutton" disabled={!formDataValidity.email || !formDataValidity.password}>Log In</button>
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
