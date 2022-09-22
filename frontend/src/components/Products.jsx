import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    // let result = await axios.get("http://localhost:5000/products");
    // setProduct(result.data);
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProduct(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProduct();
    }
  };

  const handleSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProduct(result);
    } else {
      getProduct();
    }
  };
  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        placeholder="Search Product..."
        className="search-product-box"
        onChange={handleSearch}
      />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {product.length > 0 ? (
        product.map((item, index) => {
          return (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              <li>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                <Link to={`/update/${item._id}`}>Update</Link>
              </li>
            </ul>
          );
        })
      ) : (
        <h1>No Record Found</h1>
      )}
    </div>
  );
}

export default Products;
