import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from '../styles/register.css'
// import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:8080/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        // toast.success("Register Successfully");
      } else {
        setAuth(false);
        // toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register</h1>
      <form className="form-container-reg" onSubmit={onSubmitForm}>
        <input
          required
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="email-reg"
        />
        <input
          required
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="password-reg"
        />
        <input
          required
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={e => onChange(e)}
          className="name-reg"
        />
        <button className="sub-btn-reg">Submit</button>
      </form>
      <Link to="/Login">login</Link>
    </Fragment>
  );
};

export default Register;