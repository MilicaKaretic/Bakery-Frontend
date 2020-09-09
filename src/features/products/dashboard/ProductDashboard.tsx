import React from "react";
import ProductList from "./ProductList";
import { observer } from "mobx-react-lite";

const ProductDashboard: React.FC = () => {
  return (
    <div
      style={{
        justifyContent: "center",
      }}
    >
      <ProductList />
    </div>
  );
};

export default observer(ProductDashboard);
