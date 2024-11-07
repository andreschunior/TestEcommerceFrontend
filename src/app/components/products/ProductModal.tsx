// components/ProductModal.tsx
import React from "react";

interface ProductModalProps {
  product: any; // Puedes especificar mejor el tipo si conoces la estructura
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{product.nombre}</h2>
        {product.imagenURL ? (
          <img
            src={product.imagenURL}
            alt={product.nombre}
            className="w-full h-48 object-cover mb-4"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center border bg-gray-200 mb-4">
            <span>Imagen no disponible</span>
          </div>
        )}
        <p className="text-gray-700">{product.descripcion}</p>
        <p className="text-gray-600">Precio: ${product.precio}</p>
        <p className="text-gray-600">Stock: {product.stock}</p>
        <p className="text-gray-600">Categoría: {product.categoria}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
