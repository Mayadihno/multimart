import React, { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../Firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Addproducts = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      productName: title,
      shortDesc,
      price,
      description,
      category,
      imgUrl: image,
    };
    //add product to firebase database
    try {
      const docRef = collection(db, "products");
      const storageRef = ref(
        storage,
        `productImage/${Date.now() + image.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress here
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          setLoading(true);
        },
        () => {
          toast.error("Image not uploaded");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            await addDoc(docRef, {
              productName: title,
              shortDesc,
              price,
              description,
              category,
              imgUrl: downloadUrl,
            });
          });
        }
      );
      if (!loading) {
        toast.success("Product Added Successfully");
        navigate("/dashboard/all-product");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <React.Fragment>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-5">Add products</h4>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <span>Product Title</span>
                  <input
                    type="text"
                    placeholder="Double Sofa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Description</span>
                  <input
                    type="text"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Short Description</span>
                  <input
                    type="text"
                    placeholder="lorem....."
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                  />
                </FormGroup>
                <div className="d-flex align-items-center justify-content-between gap-5">
                  <FormGroup className="form__group w-50">
                    <span>Price</span>
                    <input
                      type="number"
                      placeholder="$1000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group w-50">
                    <span>Category</span>
                    <select
                      className="w-100 p-2"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Choose Product Category</option>
                      <option value="sofa">Sofa</option>
                      <option value="chair">Chair</option>
                      <option value="mobile">Mobile</option>
                      <option value="watch">Watch</option>
                      <option value="wireless">Wireless</option>
                    </select>
                  </FormGroup>
                </div>
                <div>
                  <FormGroup className="form__group">
                    <span>Product Image</span>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </FormGroup>
                </div>
                <button className="buy__btn mt-3">Add Product</button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Addproducts;
