import React from "react";
import ProductList from "../components/ProductList/index.js";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  return (
    <div>
      <CategoryMenu />
      <ProductList />
    </div>
  );
};

export default Home;
