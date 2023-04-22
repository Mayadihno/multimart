import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { RiAddFill, RiDeleteBin2Fill } from "react-icons/ri";
import "../Styles/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { cartActions } from "../Redux/slice";
import { useNavigate } from "react-router-dom";
import { RxMinus } from "react-icons/rx";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItem);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();
  const items = JSON.parse(localStorage.getItem("cartItems"));
  return (
    <React.Fragment>
      <Helmet title="Cart">
        <CommonSection title="Shopping Cart" />

        <section>
          <Container>
            <Row>
              <Col lg="9">
                {cartItems.length === 0 ? (
                  <h1>No item is add to cart</h1>
                ) : (
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => {
                        return <Tr item={item} key={item.id} />;
                      })}
                    </tbody>
                  </table>
                )}
              </Col>
              <Col lg="3">
                <div>
                  <h4 className="d-flex align-items-center justify-content-between">
                    Subtotal
                    <span className="fs-4 fw-bold">${totalAmount}</span>
                  </h4>
                  <p className="fs-6 mt-2">
                    taxes and Shipping will be calculate in Checkout
                  </p>
                </div>
                <button
                  className="buy__btn w-100 text-center"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </button>
                <button
                  className="buy__btn mt-3 w-100 text-center"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </React.Fragment>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  const increment = () => {
    dispatch(cartActions.incQty(item.id));
  };
  const decrement = () => {
    dispatch(cartActions.descQty(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>
        <div className="d-flex align-items-center gap-2 pt-2 text-center">
          <span className="remove">
            <i onClick={increment}>
              <RiAddFill />
            </i>
          </span>
          {item.quantity}
          <span className="remove">
            <i onClick={decrement}>
              <RxMinus />
            </i>
          </span>
        </div>
      </td>
      <td>${item.price}</td>
      <td>
        <span>
          <motion.i whileTap={{ scale: 1.3 }}>
            <RiDeleteBin2Fill onClick={deleteProduct} />
          </motion.i>
        </span>
      </td>
    </tr>
  );
};

export default Cart;
