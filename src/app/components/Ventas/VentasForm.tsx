import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  nombre: string;
  stock: number;
  precio: number;
  // Agrega otras propiedades del producto que necesites
}

interface SaleItem {
  productId: number;
  quantity: number;
}

const SaleForm: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  // Función para buscar productos
  const fetchProducts = async (name: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products?name=${name}`
      );
      const data = await response.json();
      setProductList(data);
    } catch (error) {
      console.error("Error al buscar productos:", error);
      toast.error("Hubo un error al buscar productos.");
    }
  };

  // Maneja el cambio en el campo de nombre de producto
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setProductName(name);
    if (name) {
      fetchProducts(name);
    } else {
      setProductList([]);
      setSelectedProduct(null);
    }
  };

  // Maneja la selección de un producto de la lista
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductName(product.nombre);
    setProductList([]); // Ocultar lista después de seleccionar
  };

  // Enviar la venta
  const handleSell = async () => {
    if (!selectedProduct || quantity <= 0) {
      toast.error(
        "Por favor, selecciona un producto y establece una cantidad válida."
      );
      return;
    }

    const saleItem: SaleItem = {
      productId: selectedProduct.id,
      quantity,
    };

    try {
      // Aquí hacemos la solicitud a la API para realizar la venta
      const response = await fetch("http://localhost:3000/products/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([saleItem]),
      });

      if (!response.ok) {
        throw new Error("Error al realizar la venta");
      }

      const updatedProduct = await response.json();
      toast.success("Venta realizada con éxito.");
      setSelectedProduct(null);
      setProductName("");
      setQuantity(1);
      // Aquí puedes manejar la actualización del inventario local si es necesario
    } catch (error) {
      console.error("Error al realizar la venta:", error);
      toast.error("Hubo un error al realizar la venta.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Realizar Venta</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Producto:
        </label>
        <input
          type="text"
          value={productName}
          onChange={handleProductNameChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Buscar producto por nombre"
        />
        {productList.length > 0 && (
          <ul className="border mt-2 bg-white rounded-lg shadow-lg">
            {productList.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {product.nombre} (Stock: {product.stock})
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedProduct && (
        <div className="mb-4">
          <p>
            <strong>Producto seleccionado:</strong> {selectedProduct.nombre}
          </p>
          <p>
            <strong>Stock disponible:</strong> {selectedProduct.stock}
          </p>
          <p>
            <strong>Precio:</strong> ${selectedProduct.precio}
          </p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Cantidad a vender:
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          min="1"
          max={selectedProduct?.stock || 1}
        />
      </div>

      <button
        onClick={handleSell}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Realizar Venta
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SaleForm;
