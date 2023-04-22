import React from "react";
import { Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import {
  RiNotification2Line,
  RiSearch2Line,
  RiSettings2Line,
} from "react-icons/ri";
import UseAuth from "../Hooks/UseAuth";
import "../Styles/adminNav.css";

const adminList = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All-Product",
    path: "/dashboard/all-product",
  },
  {
    display: "Add-Product",
    path: "/dashboard/add-product",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
];
const AdminNav = () => {
  const { currentUser } = UseAuth();
  return (
    <React.Fragment>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__wrapper-top">
              <div className="logo">
                <h2>Multimart</h2>
              </div>
              <div className="search__box bg-white">
                <input type="text" placeholder="Search..." />
                <span>
                  <i>
                    <RiSearch2Line />
                  </i>
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i>
                    <RiNotification2Line />
                  </i>
                </span>
                <span>
                  <i>
                    <RiSettings2Line />
                  </i>
                </span>
                <img src={currentUser?.photoURL} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu pt-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {adminList.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__menu" : ""
                      }
                    >
                      {item.display}{" "}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AdminNav;
