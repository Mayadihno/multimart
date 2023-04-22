import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { auth, db, storage } from "../Firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const storageRef = ref(storage, `images/${new Date() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress here
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          setLoading(true);
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            //update user profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadUrl,
            });
            //store user data in firestore
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              photoURL: downloadUrl,
              email,
            });
          });
        }
      );
      setLoading(false);
      e.target.reset();
      toast.success("Account Create Successfully");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  if (loading) return "Loading...";
  return (
    <React.Fragment>
      <Helmet title="Sign Up">
        <section>
          <Container>
            <Row>
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Sign Up</h3>
                <Form className="auth__form" onSubmit={SignUp}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
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
                  <FormGroup className="form__group">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </FormGroup>
                  <button className="buy__btn login__btn">
                    Create Account
                  </button>
                  <p>
                    Already have an account? <Link to="/login">Sign in</Link>
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

export default Signup;
