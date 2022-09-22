import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [user, setuser] = useState({
    username: "",
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
    //   "http://localhost:5000/register",
    //   {
    //     name: user.username,
    //     email: user.email,
    //     password: user.password,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log(result.data);
    // localStorage.setItem("user", JSON.stringify(result.data));

    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({
        name: user.username,
        email: user.email,
        password: user.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));

    if (result) {
      navigate("/");
    }
    setuser({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="signup">
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            value={user.username}
            placeholder="Enter Name"
            name="username"
            onChange={handleChange}
            style={{ textTransform: "capitalize" }}
            autoComplete="off"
          />
        </Form.Group>

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
          SignUp
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
