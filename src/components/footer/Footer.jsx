import React from "react";
import "./footer.css";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import { Link } from "react-router-dom";
import { MdLocationPin, MdPhone, MdEmail } from "react-icons/md";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <React.Fragment>
      <footer className="footer">
        <Container>
          <Row>
            <Col lg="4">
              <div className="logo">
                <div>
                  <h1 className="text-white">Multimart</h1>
                </div>
              </div>
              <p className="footer__text mt-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
                similique quas repellat deleniti provident asperiores accusamus,
                nulla expedita blanditiis vel?
              </p>
            </Col>
            <Col lg="3">
              <div className="footer__quicks-links">
                <h4 className="quick__links-title">Top Categories</h4>
                <ListGroup className="mb-3">
                  <ListGroupItem className="ps-0 border-0">
                    <Link to={"#"} className="text-decoration-none">
                      Mobile Phone
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to={"#"} className="text-decoration-none">
                      Mordern Sofa
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to={"#"} className="text-decoration-none">
                      Arm Chair
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to={"#"} className="text-decoration-none">
                      Smart Watches
                    </Link>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
            <Col lg="2">
              <div className="footer__quicks-links ">
                <h4 className="quick__links-title">Useful Links</h4>
                <ListGroup className="mb-3">
                  <ListGroupItem className="ps-0 border-0">
                    <Link to={"/shop"} className="text-decoration-none">
                      Shop
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to={"/cart"} className="text-decoration-none">
                      Cart
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to={"/login"} className="text-decoration-none">
                      Login
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to={"#"} className="text-decoration-none">
                      Privacy Policy
                    </Link>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
            <Col lg="3">
              <div className="footer__quicks-links">
                <h4 className="quick__links-title">Contact</h4>
                <ListGroup className="mb-3 footer__contact">
                  <ListGroupItem className="ps-0 border-0 d-flex gap-2">
                    <span>
                      <i>
                        <MdLocationPin />
                      </i>
                    </span>
                    <p>Futa South Gate, Akure, Ondo State, Nigeria.</p>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0 d-flex  gap-2">
                    <span>
                      <i>
                        <MdPhone />
                      </i>
                    </span>
                    <p>+2348136908207</p>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0 d-flex gap-2">
                    <span>
                      <i>
                        <MdEmail />
                      </i>
                    </span>
                    <p>Mayadihn0@gmail.com</p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
            <Col lg="12">
              <p className="footer__copyright">
                Copyright {year} developed by Mayadihno. All right Reserved
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
