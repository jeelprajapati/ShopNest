import React, { useState } from "react";
import "./changePassword.css";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../schema";
import { changePassword } from "../../actions/userActions";

const ChangePassword = ({ token }) => {
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        currentPassword: "",
        newPassword: "",
        cNewPassword: "",
      },
      validationSchema: changePasswordSchema,
      onSubmit: (value, action) => {
        const { cNewPassword, ...other } = value;
        changePassword(token, other, () => {
          action.resetForm();
        });
      },
    });
  return (
    <div className="changePassword">
      <h3>Change Password</h3>
      <div className="changePasswordForm">
        <div className="changePasswordWrapper">
          <label htmlFor="email">
            Email <span className="red">*</span>
          </label>
          <div className="changePasswordInput">
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
        <div className="changePasswordWrapper">
          <label htmlFor="currentPassword">
            Current Password <span className="red">*</span>
          </label>
          <div className="changePasswordInput">
            <input
              type={`${currentPassword ? "text" : "password"}`}
              name="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>
              <FontAwesomeIcon
                icon={currentPassword ? faEye : faEyeSlash}
                onClick={() =>
                  currentPassword
                    ? setCurrentPassword(false)
                    : setCurrentPassword(true)
                }
              />
            </span>
          </div>
          {touched.currentPassword && errors.currentPassword ? (
            <p className="error">{errors.currentPassword}</p>
          ) : null}
        </div>
        <div className="changePasswordWrapper">
          <label htmlFor="newPassword">
            New Password <span className="red">*</span>
          </label>
          <div className="changePasswordInput">
            <input
              type={`${newPassword ? "text" : "password"}`}
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>
              <FontAwesomeIcon
                icon={newPassword ? faEye : faEyeSlash}
                onClick={() =>
                  newPassword ? setNewPassword(false) : setNewPassword(true)
                }
              />
            </span>
          </div>
          {touched.newPassword && errors.newPassword ? (
            <p className="error">{errors.newPassword}</p>
          ) : null}
        </div>
        <div className="changePasswordWrapper">
          <label htmlFor="cNewPassword">
            Confirm New Password <span className="red">*</span>
          </label>
          <div className="changePasswordInput">
            <input
              type={`${confirmPassword ? "text" : "password"}`}
              name="cNewPassword"
              value={values.cNewPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>
              <FontAwesomeIcon
                icon={confirmPassword ? faEye : faEyeSlash}
                onClick={() =>
                  confirmPassword
                    ? setConfirmPassword(false)
                    : setConfirmPassword(true)
                }
              />
            </span>
          </div>
          {touched.cNewPassword && errors.cNewPassword ? (
            <p className="error">{errors.cNewPassword}</p>
          ) : null}
        </div>
        <button type="button" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
