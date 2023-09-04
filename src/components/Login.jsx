import React, { useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { validate } from "./validate";
import notify from "./toastify";
import { Link } from "react-router-dom";

const Login = () => {

  document.title="Login";

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const changeHandler = (event) => {
      setData({ ...data, [event.target.name]: event.target.value });
  };

  const touchHandler = (event) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      notify("success", "Your logged in successfully");
    } else {
      notify("error", "Invalid data!");
      setTouched({
        email: true,
        password: true,
      });
    }
  };

  useEffect(
    () => {
      setErrors(validate(data));
    },
    [data],
    [touched]
  );

  return (
    <>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <h2 className={styles.formTitle}>Login</h2>
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
        <div className={styles.buttonsContainer}>
          <Link to="/signup">Sign Up</Link>
          <button type="submit">Login</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
