import React, { useRef, useState } from "react";
import "./Header.css";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxHeart, RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UseAuth from "../../Hooks/UseAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import { toast } from "react-toastify";

const nav__links = [
  {
    id: 1,
    path: "/",
    display: "Home",
  },
  {
    id: 2,
    path: "shop",
    display: "Shop",
  },
  {
    id: 3,
    path: "cart",
    display: "Cart",
  },
];

const Headers = () => {
  const headerRef = useRef(null);
  const menuRef = useRef();
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { currentUser } = UseAuth();
  const stickyTopFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__top");
      } else {
        headerRef.current.classList.remove("sticky__top");
      }
    });
  };
  const items = JSON.parse(localStorage.getItem("cartItems"));
  useEffect(() => {
    stickyTopFunc();
    return () => window.removeEventListener("scroll", stickyTopFunc());
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out");
        navigate("/");
        setshow(false);
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  return (
    <React.Fragment>
      <div className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav__wrapper">
              <div className="logo">
                <img src={logo} alt="" />
                <div>
                  <h1>Multimart</h1>
                </div>
              </div>
              <div className="navigation" ref={menuRef} onClick={menuToggle}>
                <ul className="menu">
                  {nav__links.map((item) => (
                    <li className="nav__item" key={item.id}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "nav__active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="nav__icons">
                <span className="fav__icon">
                  <i>
                    <RxHeart />
                  </i>
                  <span className="badge">1</span>
                </span>
                <span className="cart__icon" onClick={() => navigate("/cart")}>
                  <i>
                    <IoBagHandleOutline />
                  </i>
                  <span className="badge">{totalQuantity}</span>
                  {/* totalQuantity || */}
                </span>
                <div className="profile">
                  <span className="userIcon">
                    <motion.img
                      whileTap={{ scale: 1.2 }}
                      src={currentUser ? currentUser.photoURL : userIcon}
                      alt=""
                      onClick={() => setshow(!show)}
                    />
                  </span>
                  {show && (
                    <div className="profile__action">
                      {currentUser ? (
                        <>
                          <span onClick={logout}>Logout</span>
                          <Link to="/dashboard" onClick={() => setshow(false)}>
                            Dashboard
                          </Link>
                        </>
                      ) : (
                        <h2 className="fs-5" onClick={() => setshow(false)}>
                          <Link to={"/login"} className="text-decoration-none">
                            Login
                          </Link>
                        </h2>
                      )}
                    </div>
                  )}
                </div>
                <div className="mobile__menu">
                  <span onClick={menuToggle}>
                    <i>
                      <RxHamburgerMenu />
                    </i>
                  </span>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Headers;
