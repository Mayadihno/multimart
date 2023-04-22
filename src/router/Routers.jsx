import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Addproducts from "../Admin/Addproducts";
import Allproducts from "../Admin/Allproducts";
import Dashboard from "../Admin/Dashboard";
import Users from "../Admin/Users";

const Routers = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="shop/:id" element={<ProductDetails />} />
        <Route path="/*" element={<ProtectedRoute />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard/add-product" element={<Addproducts />} />
          <Route path="dashboard/all-product" element={<Allproducts />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/users" element={<Users />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.Fragment>
  );
};

export default Routers;
