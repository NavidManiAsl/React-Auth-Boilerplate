import { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Register() {
  const pattern = {
    username: /^[a-z0-9_-]{3,15}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    email:
      /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  };

  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [formDataValidity, SetFormDataValidity] = useState({
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    SetFormDataValidity((prevstate) => ({
      ...prevstate,
      username: pattern.username.test(formData.username),
    }));
  }, [formData.username]);

  useEffect(() => {
    SetFormDataValidity((prevstate) => ({
      ...prevstate,
      email: pattern.email.test(formData.email),
    }));
  });

  useEffect(() => {
    SetFormDataValidity((prevstate) => ({
      ...prevstate,
      password: pattern.password.test(formData.password),
    }));
  }, [formData.password]);

  useEffect(() => {
    SetFormDataValidity((prevstate) => ({
      ...prevstate,
      passwordConfirm:
        formData.password === formData.passwordConfirm &&
        formDataValidity.password,
    }));
  }, [formData.password, formData.passwordConfirm]);

  const handleInputChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="body">
      <form className="form">
        <h1 className="header">Register</h1>
        <label htmlFor="username" className="label">
          Username:
          <FontAwesomeIcon
            icon={
              formData.username &&
              (formDataValidity.username ? faCheck : faTimes)
            }
            className={formDataValidity.username ? "check" : "cross"}
          />
        </label>
        <input
          type="text"
          ref={inputRef}
          name="username"
          className="input"
          autoComplete="off"
          onBlur={() => setUsernameFocus(false)}
          onFocus={() => setUsernameFocus(true)}
          onChange={handleInputChange}
        />
        <p
          className={
            formData.username && !formDataValidity.username && usernameFocus
              ? "info"
              : "hidden"
          }
        >
          <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
          Alphanumeric, may include _ and - length of 3 to 16 characters.
        </p>
        <label htmlFor="email" className="label">
          email:
          <FontAwesomeIcon
            icon={
              formData.email && (formDataValidity.email ? faCheck : faTimes)
            }
            className={formDataValidity.email ? "check" : "cross"}
          />
        </label>
        <input
          type="text"
          name="email"
          className="input"
          autoComplete="off"
          onBlur={() => setEmailFocus(false)}
          onFocus={() => setEmailFocus(true)}
          onChange={handleInputChange}
        />
        <p
          className={
            formData.email && !formDataValidity.email && emailFocus
              ? "info"
              : "hidden"
          }
        >
          <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
          Enter a valid email.
        </p>
        <label htmlFor="password" className="label">
          Password:
          <FontAwesomeIcon
            icon={
              formData.password &&
              (formDataValidity.password ? faCheck : faTimes)
            }
            className={formDataValidity.password ? "check" : "cross"}
          />
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
            onChange={handleInputChange}
            onFocus={() => setPasswordFocus(true)}
          />
        </div>

        <p
          className={
            formData.password && !formDataValidity.password && passwordFocus
              ? "info"
              : "hidden"
          }
        >
          <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
          Must include uppercase, lowercase, number and one special character.
          Length of minimum 8 characters.
        </p>
        <label htmlFor="passwordConfirm" className="label">
          Confirm password:
          <FontAwesomeIcon
            icon={
              formData.password &&
              (formDataValidity.passwordConfirm ? faCheck : faTimes)
            }
            className={formDataValidity.passwordConfirm ? "check" : "cross"}
          />
        </label>
        <input
          type="password"
          name="passwordConfirm"
          className="input"
          onChange={handleInputChange}
        />
        <p
          className={
            formData.passwordConfirm && !formDataValidity.passwordConfirm
              ? "info"
              : "hidden"
          }
        >
          <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
          Must match the password.
        </p>
        <button
          className="Registerbutton"
          disabled={
            !formDataValidity.username ||
            !formDataValidity.email ||
            !formDataValidity.password ||
            !formDataValidity.passwordConfirm
          }
        >
          Sign In
        </button>
        <p className="attention">
          Already have an account?
          <a href="#" className="link">
            Login!
          </a>
        </p>
      </form>
    </section>
  );
}

export default Register;
