import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import AddProducts from "./components/AddProducts";
import UpdateProduct from "./components/UpdateProduct";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import PrivateComp from "./components/PrivateComp";
import LoginComp from "./components/LoginComp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path="/" element={<Products />} />
            <Route path="/add" element={<AddProducts />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginComp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
