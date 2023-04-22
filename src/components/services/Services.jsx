import React from "react";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import "./services.css";
import serviceData from "../../assets/data/serviceData";
const Services = () => {
  return (
    <React.Fragment>
      <section className="services">
        <Container>
          <Row>
            {serviceData.map((item, index) => {
              return (
                <Col lg="3" md="4" key={index}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="services__item"
                    style={{ background: `${item.bg}` }}
                  >
                    <span>
                      <i>{<item.icon />}</i>
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Services;
