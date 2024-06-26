import React, { useState } from "react";
import "./login.css";
import {
  faArrowRight,
  faEnvelope,
  faEye,
  faEyeSlash,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schema";
import { useFormik } from "formik";
import { login } from "../../actions/userActions.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: ""
      },
      validationSchema: loginSchema,
      onSubmit: (value, action) => {
        login(value,()=>{
          navigate("/");
          action.resetForm();
        })
      },
    });

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginTitle">
          <div className="loginIcon">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
          <h3>Welcome!</h3>
          <span>Sign in to your account</span>
        </div>
        <div className="loginForm">
          <div className="loginWrapper">
            <label htmlFor="email">
              Email <span className="red">*</span>
            </label>
            <div className="loginInput">
              <input
                type="text"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            {touched.email && errors.email ? (
              <p className="error">{errors.email}</p>
            ) : null}
          </div>
          <div className="loginWrapper">
            <label htmlFor="password">
              Password <span className="red">*</span>
            </label>
            <div className="loginInput">
              <input
                name="password"
                type={`${showPassword ? "text" : "password"}`}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span>
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </span>
            </div>
            {touched.password && errors.password ? (
              <p className="error">{errors.password}</p>
            ) : null}
          </div>
          <div className="forgetPasswordLink">
            <div className="rememberWrapper">
              <div className="remeber">
                <input type="checkbox" name="remember" />
                <label htmlFor="remember">remember me ?</label>
              </div>
              <Link
                to="/forgetPassword"
                className="link"
                style={{ color: "#6c7ae0" }}
              >
                Forget Password ?
              </Link>
            </div>
          </div>
          <button type="button" onClick={handleSubmit}>
            Login
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <div className="linkForRegister">
            Don't have an account ?
            <Link
              to={"/register"}
              className="link"
              style={{ color: "#6c7ae0" }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
