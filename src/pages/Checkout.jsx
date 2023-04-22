import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import "../Styles/checkout.css";
import { useSelector } from "react-redux";
const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <React.Fragment>
      <Helmet title="Checkout">
        <CommonSection title={"Checkout"} />
        <section>
          <Container>
            <Row>
              <Col lg="8">
                <h6 className="mb-4 fw-bold">Billing Information</h6>
                <Form className="billing__form">
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Username" />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="email" placeholder="Email Address" />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="tel" placeholder="Phone Number" />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Street Address" />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="City" />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Postal Code" />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input type="text" placeholder="Country" />
                  </FormGroup>
                </Form>
              </Col>
              <Col lg="4">
                <div className="checkout__cart">
                  <h6>
                    Total Qty:
                    <span>
                      {totalQty <= 1 ? `${totalQty} item` : `${totalQty} items`}
                    </span>
                  </h6>
                  <h6>
                    Subtotal: <span>${totalAmount}</span>
                  </h6>
                  <h6>
                    <span>
                      Shipping: <br />
                      Free Shipping
                    </span>
                    <span>$0</span>
                  </h6>
                  <h4>
                    Total Cost: <span>${totalAmount}</span>
                  </h4>
                  <button className="buy__btn auth__btn w-75 text-center">
                    Place an order
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </React.Fragment>
  );
};

export default Checkout;
