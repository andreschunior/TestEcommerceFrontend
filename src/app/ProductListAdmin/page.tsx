"use client";
import LowStockPage from "@/app/components/LowStock/Lowstock";
import React from "react";
import ProductList from "../components/products/ProductsList";
import ProductsListAdministrador from "../components/ProductsListAdmin/ProductsList";

const ProductListAdmin: React.FC = () => {
  return (
    <>
      <ProductsListAdministrador />
    </>
  );
};

export default ProductListAdmin;
