import React, { useState } from "react";

interface ProductDetailModalProps {
  product: {
    id: number;
    nombre: string;
    stock: number;
    categoria: string;
    descripcion: string;
    precio: number;
  };
  onClose: () => void;
  onAdjustStock: (id: number) => void; // Función para abrir el modal de ajuste de stock
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAdjustStock,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Detalles del Producto</h2>
        <div>
          <h3 className="text-xl font-semibold">{product.nombre}</h3>
          <p>
            <strong>Categoría:</strong> {product.categoria}
          </p>
          <p>
            <strong>Descripción:</strong> {product.descripcion}
          </p>
          <p>
            <strong>Precio:</strong> ${product.precio}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
          >
            Cerrar
          </button>
          <button
            onClick={() => onAdjustStock(product.id)}
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
          >
            Ajustar Stock
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
