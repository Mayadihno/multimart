import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { RiSearchLine } from "react-icons/ri";
import "../Styles/shop.css";
import ProductList from "../components/UI/ProductList";
import UseGetData from "../Hooks/UseGetData";

const Shop = () => {
  const { data: products, setData } = UseGetData("products");
  const [productData, setProductData] = useState(products);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "sofa") {
      const filteredProduct = products.filter(
        (item) => item.category === "sofa"
      );
      setProductData(filteredProduct);
    }
    if (filterValue === "mobile") {
      const filteredProduct = products.filter(
        (item) => item.category === "mobile"
      );
      setProductData(filteredProduct);
    }
    if (filterValue === "chair") {
      const filteredProduct = products.filter(
        (item) => item.category === "chair"
      );
      setProductData(filteredProduct);
    }
    if (filterValue === "wireless") {
      const filteredProduct = products.filter(
        (item) => item.category === "wireless"
      );
      setProductData(filteredProduct);
    }
    if (filterValue === "watch") {
      const filteredProduct = products.filter(
        (item) => item.category === "watch"
      );
      setProductData(filteredProduct);
    }
  };
  const handleSearch = (e) => {
    const filterdName = e.target.value;

    if (filterdName) {
      const searchproduct = products.filter((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
      );
      setProductData(searchproduct);
      setSearch(filterdName);
    } else {
      setProductData(products);
    }
  };
  useEffect(() => {
    if (!show) {
      setProductData(products);
    }
  }, [products]);

  return (
    <React.Fragment>
      <Helmet title="Shop">
        <CommonSection title="Products" />
        <section>
          <Container>
            <Row>
              <Col lg="3" md="6">
                <div className="filter__widget">
                  <select onChange={handleChange}>
                    <option>Filter By Category</option>
                    <option value="sofa">Sofa</option>
                    <option value="chair">Chair</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </div>
              </Col>
              <Col lg="3" md="6" className="text-end">
                <div className="filter__widget">
                  <select>
                    <option>Sort By </option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </Col>
              <Col lg="6" md="12">
                <div className="search__box">
                  <input
                    type="text"
                    placeholder="Search...."
                    onChange={handleSearch}
                  />
                  <span>
                    <i>
                      <RiSearchLine />
                    </i>
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pt-0">
          <Container>
            <Row>
              {productData.length === 0 ? (
                <ProductList data={productData} />
              ) : (
                <ProductList data={productData} />
              )}
            </Row>
          </Container>
        </section>
      </Helmet>
    </React.Fragment>
  );
};

export default Shop;
