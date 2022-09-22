import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
function AddProducts() {
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      // let result = await axios.post(
      //   "http://localhost:5000/add-product",
      //   {
      //     productName: data.productname,
      //     price: data.price,
      //     category: data.category,
      //     company: data.company,
      //     userid: userId,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log(result.data);

      let result = await fetch("http://localhost:5000/add-product", {
        method: "post",
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          category: data.category,
          company: data.company,
          userId: userId,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.log(result);
    }
    setValidated(true);
    setData({
      name: "",
      price: "",
      category: "",
      company: "",
    });
  };
  return (
    <div className="signup">
      <h1 style={{ textAlign: "center" }}>Add Product</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            value={data.name}
            placeholder="Enter product Name"
            name="name"
            onChange={handleChange}
            style={{ textTransform: "capitalize" }}
            autoComplete="off"
            required
          />
          <Form.Control.Feedback type="invalid">
            Required Product name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Product Price"
            value={data.price}
            name="price"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <Form.Control.Feedback type="invalid">
            Required Price
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company name"
            value={data.category}
            name="category"
            onChange={handleChange}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            required
          />
          <Form.Control.Feedback type="invalid">
            Required Category
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Company:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company Name"
            value={data.company}
            name="company"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <Form.Control.Feedback type="invalid">
            Required Company
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{
            width: "100%",
          }}
        >
          Add Product
        </Button>
      </Form>
    </div>
  );
}

export default AddProducts;
