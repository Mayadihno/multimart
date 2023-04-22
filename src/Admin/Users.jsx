import React from "react";
import { Col, Container, Row } from "reactstrap";
import UseGetData from "../Hooks/UseGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { toast } from "react-toastify";

const Users = () => {
  const { data, setData } = UseGetData("users");
  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      const filteed = data.filter((item) => item.id !== id);
      setData(filteed);
      toast.success("One User deleted");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <React.Fragment>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="fw-bold">Users</h4>
            </Col>
            <Col lg="12" className="pt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <img src={user.photoURL} alt="" />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(user.uid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Users;
