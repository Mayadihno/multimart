import React, { useEffect, useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import { RiStarFill, RiStarHalfFill } from "react-icons/ri";
import "../Styles/productDetails.css";
import { motion } from "framer-motion";
import ProductList from "../components/UI/ProductList";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/slice";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import UseGetData from "../Hooks/UseGetData";

const ProductDetails = () => {
  const [tab, setTab] = useState(true);
  const [product, setProducts] = useState({});
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const { id } = useParams();
  const { data: products } = UseGetData("products");
  // const product = products.find((item) => item.id === id);
  const docRef = doc(db, "products", id);
  const getProducts = async () => {
    const getdoc = await getDoc(docRef);
    if (getdoc.exists()) {
      setProducts(getdoc.data());
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const { imgUrl, productName, price, description, shortDesc, category } =
    product;

  const relatedProduct = products.filter((item) => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();
    const reviewUsername = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      username: reviewUsername,
      text: reviewUserMsg,
      rating,
    };
    console.log(reviewObj);
    toast.success("Review Submitted");
    e.target.reset();
  };
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        price,
        imgUrl: imgUrl,
        productName,
      })
    );
    toast("Product add to cart");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <React.Fragment>
      <Helmet title="Description">
        <CommonSection title={"Product Description"} />
        <section className="pt-0">
          <Container>
            <Row className="align-items-center">
              <Col lg="6">
                <motion.img whileHover={{ scale: 0.9 }} src={imgUrl} alt="" />
              </Col>
              <Col lg="6">
                <div className="product__details">
                  <h2>{productName}</h2>
                  <div className="product__rating d-flex align-items-center gap-3 mb-3">
                    <div className="rating__group">
                      <span>
                        <RiStarFill />
                        <RiStarFill />
                        <RiStarFill />
                        <RiStarFill />
                        <RiStarHalfFill />
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-5">
                    <span className="product__price">${price}</span>
                    <p>Categoty: {category}</p>
                  </div>
                  <p className="mt-3 pb-3">{shortDesc}</p>
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="buy__btn"
                    onClick={addToCart}
                  >
                    Add to cart
                  </motion.button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pt-0">
          <Container>
            <Row>
              <Col lg="12">
                <div className="tab__wrapper">
                  <h6
                    className={`${tab ? "tab__active" : ""}`}
                    onClick={() => setTab(true)}
                  >
                    Description
                  </h6>
                  <h6
                    className={`${!tab ? "tab__active" : ""}`}
                    onClick={() => setTab(false)}
                  >
                    Reviews
                  </h6>
                </div>
                <div className="tab__content mt-4">
                  {tab ? (
                    <p>{description}</p>
                  ) : (
                    <div className="product__reviews">
                      <div className="review__wrapper">
                        <div className="review__form">
                          <h4>Leave Your Experince</h4>
                          <form onSubmit={submitHandler}>
                            <div className="form__group">
                              <input
                                type="text"
                                placeholder="Enter Username"
                                ref={reviewUser}
                              />
                            </div>
                            <div className="form__group d-flex align-items-center gap-4">
                              <motion.span
                                whileTap={{ scale: 1.3 }}
                                onClick={() => setRating(1)}
                              >
                                1<RiStarFill />
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.3 }}
                                onClick={() => setRating(2)}
                              >
                                2<RiStarFill />
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.3 }}
                                onClick={() => setRating(3)}
                              >
                                3<RiStarFill />
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.3 }}
                                onClick={() => setRating(4)}
                              >
                                4<RiStarFill />
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.3 }}
                                onClick={() => setRating(5)}
                              >
                                5<RiStarFill />
                              </motion.span>
                            </div>
                            <div className="form__group">
                              <textarea
                                ref={reviewMsg}
                                name=""
                                id=""
                                rows="5"
                                placeholder="Leave your experience"
                              />
                            </div>
                            <button className="buy__btn">Submit</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col lg="12" className="mt-5">
                <h2 className="related__title">You might also like</h2>
              </Col>
              <ProductList data={relatedProduct} />
            </Row>
          </Container>
        </section>
      </Helmet>
    </React.Fragment>
  );
};

export default ProductDetails;
