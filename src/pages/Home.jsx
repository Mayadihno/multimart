import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
import "../Styles/home.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../components/services/Services";
import ProductList from "../components/UI/ProductList";
import { useState } from "react";
// import product from "../assets/data/products";
import { useEffect } from "react";
import counterImg from "../assets/images/counter-timer-img.png";
import Clock from "../components/UI/Clock";
import UseGetData from "../Hooks/UseGetData";
const Home = () => {
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [bestSales, setBestSales] = useState([]);
  const [mobileProduct, setMobileProduct] = useState([]);
  const [wirelessProduct, setWirelessProduct] = useState([]);
  const [popularProduct, setPopularProduct] = useState([]);
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const { data: product } = UseGetData("products");
  useEffect(() => {
    const filteredProducts = product.filter(
      (item) => item.category === "chair"
    );
    const filtereBestSalesProducts = product.filter(
      (item) => item.category === "sofa"
    );
    const filtereMobileProducts = product.filter(
      (item) => item.category === "mobile"
    );
    const filtereWirelesssProducts = product.filter(
      (item) => item.category === "wireless"
    );
    const filterePopularProducts = product.filter(
      (item) => item.category === "watch"
    );
    setTrendingProduct(filteredProducts);
    setBestSales(filtereBestSalesProducts);
    setMobileProduct(filtereMobileProducts);
    setWirelessProduct(filtereWirelesssProducts);
    setPopularProduct(filterePopularProducts);
  }, [product]);

  return (
    <React.Fragment>
      <Helmet title="Home">
        <section className="hero__section">
          <Container>
            <Row className="rows">
              <Col lg="6" md="6">
                <div className="hero__content">
                  <p className="hero__subtitle">Trending product in {year}</p>
                  <h2>Male Your Interior More Minimalistics & Modern</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam natus necessitatibus saepe distinctio quo ipsum
                    expedita laboriosam, sunt iure non.
                  </p>

                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="buy__btn"
                    onClick={() => navigate("/shop")}
                  >
                    SHOP NOW
                  </motion.button>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="hero__img">
                  <img src={heroImg} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Services />
        <section className="trending__products">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">Trending Products</h2>
              </Col>
              <ProductList data={trendingProduct} />
            </Row>
          </Container>
        </section>
        <section className="best__sales">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">Best Sales</h2>
              </Col>
              <ProductList data={bestSales} />
            </Row>
          </Container>
        </section>
        <section className="timer__count">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="clock__top-content">
                  <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                  <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
                </div>

                <Clock />
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  onClick={() => navigate("/shop")}
                  className="buy__btn store__btn"
                >
                  Visit Store
                </motion.button>
              </Col>
              <Col lg="6" md="6" className="text-end">
                <img src={counterImg} alt="" />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="new__arrivals">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">New Arrivals</h2>
              </Col>
              <ProductList data={mobileProduct} />
              <ProductList data={wirelessProduct} />
            </Row>
          </Container>
        </section>
        <section className="Popular__product">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title mb-5">Popular In Category</h2>
              </Col>
              <ProductList data={popularProduct} />
            </Row>
          </Container>
        </section>
      </Helmet>
    </React.Fragment>
  );
};

export default Home;
