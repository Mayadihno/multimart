import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import UseGetData from "../Hooks/UseGetData";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Allproducts = () => {
  const { data, setData } = UseGetData("products");
  const [save, setSave] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const filteed = data.filter((item) => item.id !== id);
      setData(filteed);
      toast.success("One Item deleted");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSave = (id) => {
    toggle();
    const file = data.find((item) => item.id === id);
    setSave(file.id);
  };
  const handleEdit = async (id) => {
    setLoading(true);
    const edictDoc = doc(db, "products", id);
    await updateDoc(edictDoc, {
      price: newPrice,
    });
    setModal(false);
    setLoading(false);
    navigate("/dashboard");
  };
  // console.log(save);
  return (
    <React.Fragment>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {loading && <h4>Loading...</h4>}
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Edit Item</th>
                    <th>Delete Item</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>
                        <h6>{item.productName}</h6>
                      </td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => handleSave(item.id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(item.id)}
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
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Item</ModalHeader>
            <ModalBody>
              <h4>Set new price</h4>
              <input
                type="text"
                size={5}
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="form-control"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => handleEdit(save)}>
                Save
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Allproducts;
