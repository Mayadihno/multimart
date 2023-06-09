import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setLoading(false);
      navigate("/checkout");
      toast.success("Login Successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <React.Fragment>
      <Helmet title="Login">
        <section>
          <Container>
            <Row>
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>
                <Form className="auth__form" onSubmit={signIn}>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <button className="buy__btn login__btn">Login</button>
                  <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                  </p>
                </Form>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </React.Fragment>
  );
};

export default Login;
