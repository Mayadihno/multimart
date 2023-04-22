import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../Styles/dashboard.css";
import UseGetData from "../Hooks/UseGetData";
const Dashboard = () => {
  const { data: product } = UseGetData("products");
  const { data: users } = UseGetData("users");
  return (
    <React.Fragment>
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <div className="revenew__box">
                <h5>Total sales</h5>
                <span>$4634</span>
              </div>
            </Col>
            <Col lg="3">
              <div className="order__box">
                <h5>Order</h5>
                <span>7634</span>
              </div>
            </Col>
            <Col lg="3">
              <div className="products__box">
                <h5>Total Product</h5>
                <span>{product.length}</span>
              </div>
            </Col>
            <Col lg="3">
              <div className="user__box">
                <h5>Total Users</h5>
                <span>{users.length}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
