// pages/products/low-stock.tsx
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  nombre: string;
  stock: number;
}

const LowStockPage: React.FC = () => {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  const fetchLowStockProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/stock"); // Ajusta según tu ruta de API
      const data = await response.json();
      setLowStockProducts(data);
    } catch (error) {
      console.error("Error al obtener productos con bajo stock:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Productos con Bajo Stock
      </h1>
      {lowStockProducts.length === 0 ? (
        <p className="text-center text-gray-700">
          No hay productos con bajo stock.
        </p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-2 border-b font-semibold">ID</th>
              <th className="py-2 border-b font-semibold">Producto</th>
              <th className="py-2 border-b font-semibold">Stock</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product) => (
              <tr key={product.id}>
                <td className="py-2 border-b text-center">{product.id}</td>
                <td className="py-2 border-b text-center">{product.nombre}</td>
                <td className="py-2 border-b text-center">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LowStockPage;
