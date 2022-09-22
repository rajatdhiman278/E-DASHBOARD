import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
function UpdateProduct() {
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  // const [category, setCategory] = useState("");
  // const [company, setCompany] = useState("");

  const [validated, setValidated] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    // setName(result.name);
    // setPrice(result.price);
    // setCategory(result.category);
    // setCompany(result.company);

    setData({
      name: result.name,
      price: result.price,
      category: result.category,
      company: result.company,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        category: data.category,
        company: data.company,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.stopPropagation();
  //   } else {
  //     const userId = JSON.parse(localStorage.getItem("user"))._id;
  //     // let result = await axios.post(
  //     //   "http://localhost:5000/add-product",
  //     //   {
  //     //     productName: data.productname,
  //     //     price: data.price,
  //     //     category: data.category,
  //     //     company: data.company,
  //     //     userid: userId,
  //     //   },
  //     //   {
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //     },
  //     //   }
  //     // );
  //     // console.log(result.data);

  //     let result = await fetch("http://localhost:5000/add-product", {
  //       method: "post",
  //       body: JSON.stringify({
  //         name: data.name,
  //         price: data.price,
  //         category: data.category,
  //         company: data.company,
  //         userId: userId,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     result = await result.json();
  //     console.log(result);
  //   }
  //   setValidated(true);
  // };
  return (
    <div className="signup">
      <h1 style={{ textAlign: "center" }}>Update Product</h1>
      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            value={data.name}
            // value={name}
            placeholder="Enter product Name"
            name="name"
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
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
            // value={price}
            name="price"
            // onChange={(e) => {
            //   setPrice(e.target.value);
            // }}
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
            // value={category}
            name="category"
            onChange={handleChange}
            // onChange={(e) => {
            //   setCategory(e.target.value);
            // }}
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
            // value={company}
            name="company"
            onChange={handleChange}
            // onChange={(e) => {
            //   setCompany(e.target.value);
            // }}
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
          Update Product
        </Button>
      </Form>
    </div>
  );
}

export default UpdateProduct;
