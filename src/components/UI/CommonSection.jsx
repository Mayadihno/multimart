import React from "react";
import { Container } from "reactstrap";
import "../../Styles/commonSection.css";
const CommonSection = ({ title }) => {
  return (
    <React.Fragment>
      <section className="common__section">
        <Container className="text-center">
          <h1>{title}</h1>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default CommonSection;
