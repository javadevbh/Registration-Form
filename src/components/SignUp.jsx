import React, { useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { validate } from "./validate";
import notify from "./toastify";
import { Link } from "react-router-dom";

const SignUp = () => {

  document.title="Sign Up";

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    isAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const touchHandler = (event) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    });
  };

  const submitHandler = event => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      notify("success", "Your signed up successfully");
    } else {
      notify("error", "Invalid data!");
      setTouched({
        name: true,
        email: true,
        password: true,
        ConfirmPassword: true,
        isAccepted: true,
      });
    }
  };

  useEffect(
    () => {
      setErrors(validate(data,'SignUp'));
    },
    [data],
    [touched]
  );

  return (
    <>
      <form className={styles.signupForm} onSubmit={submitHandler}>
        <h2 className={styles.formTitle}>SignUp</h2>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className={(errors.name && touched.name) ? styles.inCorrect : styles.correct}
            type="text"
            name="name"
            value={data.name}
            placeholder="Enter name"
            onChange={changeHandler}
            onFocus={touchHandler}
          />
          {errors.name && touched.name && <span>{errors.name}</span>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className={(errors.email && touched.email) ? styles.inCorrect : styles.correct}
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter email"
            onChange={changeHandler}
            onFocus={touchHandler}
          />
          {errors.email && touched.email && <span>{errors.email}</span>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className={(errors.password && touched.password) ? styles.inCorrect : styles.correct}
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter password"
            onChange={changeHandler}
            onFocus={touchHandler}
          />
          {errors.password && touched.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            id="ConfirmPassword"
            className={(errors.ConfirmPassword && touched.ConfirmPassword) ? styles.inCorrect : styles.correct}
            type="password"
            name="ConfirmPassword"
            value={data.ConfirmPassword}
            placeholder="Enter password again"
            onChange={changeHandler}
            onFocus={touchHandler}
          />
          {errors.ConfirmPassword && touched.ConfirmPassword && (
            <span>{errors.ConfirmPassword}</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.checkboxContainer}>
            <label htmlFor="checkbox">I accept terms of privacy policy</label>
            <input
              id="checkbox"
              type="checkbox"
              name="isAccepted"
              value={data.isAccepted}
              onChange={changeHandler}
            />
          </div>
          {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
        </div>
        <div className={styles.buttonsContainer}>
          <Link to="/login">Login</Link>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default SignUp;
