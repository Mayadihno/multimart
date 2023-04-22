import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ data }) => {
  return (
    <React.Fragment>
      {data?.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </React.Fragment>
  );
};

export default ProductList;
