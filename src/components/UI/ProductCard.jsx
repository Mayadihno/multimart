import React from "react";
import { RiAddFill } from "react-icons/ri";
import "../../Styles/product-card.css";
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../Redux/slice";
import { toast } from "react-toastify";
const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        imgUrl: item.imgUrl,
        productName: item.productName,
        price: item.price,
      })
    );
    toast("Product added to cart");
  };
  return (
    <React.Fragment>
      <Col lg="3" md="4" className="mb-2">
        <div className="product__item" key={item.id}>
          <div className="product__img">
            <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
          </div>
          <div className="p-2 product__info">
            <Link to={`/shop/${item.id}`}>
              <h3 className="product__name">{item.productName}</h3>
            </Link>
            <span>{item.category}</span>
          </div>
          <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
            <span className="price">${item.price}</span>
            <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
              <i>
                <RiAddFill />
              </i>
            </motion.span>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default ProductCard;
