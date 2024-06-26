import React, { useState } from "react";
import "./register.css";
import {
  faArrowRight,
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../schema";
import { register } from "../../actions/userActions";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: registerSchema,
      onSubmit: (value,action) => {
        register(value,()=>{
          action.resetForm();
          navigate("/login");
        })
      },
    });
  return (
    <div className="register">
      <div className="registerContainer">
        <div className="registerTitle">
          <div className="registerIcon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <h3>Create account!</h3>
        </div>
        <div className="registerForm">
          <div className="registerWrapper">
            <label htmlFor="username">
              Username <span className="red">*</span>
            </label>
            <div className="registerInput">
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>
            {touched.username && errors.username ? (
              <p className="error">{errors.username}</p>
            ) : null}
          </div>
          <div className="registerWrapper">
            <label htmlFor="email">
              Email <span className="red">*</span>
            </label>
            <div className="registerInput">
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            {touched.email && errors.email ? (
              <p className="error">{errors.email}</p>
            ) : null}
          </div>
          <div className="registerWrapper">
            <label htmlFor="password">
              Password <span className="red">*</span>
            </label>
            <div className="registerInput">
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={() =>
                    showPassword
                      ? setShowPassword(false)
                      : setShowPassword(true)
                  }
                />
              </span>
            </div>
            {touched.password && errors.password ? (
              <p className="error">{errors.password}</p>
            ) : null}
          </div>
          <button type="button" onClick={handleSubmit}>
            Register
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <div className="linkForLogin">
            Do have an account ?
            <Link to={"/login"} className="link" style={{ color: "#6c7ae0" }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
