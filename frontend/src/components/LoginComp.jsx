import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginComp = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let result = await axios.post(
    //   "http://localhost:5000/login",
    //   { email: user.email, password: user.password },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // console.log(result.data);
    // if (result.data.email) {
    //   localStorage.setItem("user", JSON.stringify(result.data));
    //   navigate("/");
    // } else {
    //   alert("please enter correct details");
    // }

    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email: user.email, password: user.password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("please enter correct details");
    }
    setuser({
      email: "",
      password: "",
    });
  };

  return (
    <div className="signup">
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            name="email"
            onChange={handleChange}
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
            autoComplete="off"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{
            width: "100%",
          }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginComp;
