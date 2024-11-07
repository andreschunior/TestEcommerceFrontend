// components/ProductCard.tsx
import React from "react";

interface ProductCardProps {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenURL?: string;
  onClick: () => void; // Nueva prop para manejar el clic
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  nombre,
  descripcion,
  precio,
  stock,
  categoria,
  imagenURL,
  onClick, // Desestructuramos la nueva prop
}) => {
  return (
    <div
      className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      {imagenURL ? (
        <img
          src={imagenURL}
          alt={nombre}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center border bg-gray-200">
          <span>Imagen no disponible</span>
        </div>
      )}
      <h3 className="text-lg font-semibold">{nombre}</h3>
      <p className="text-gray-600">{descripcion}</p>
      <p className="text-gray-600">Precio: ${precio}</p>
      <p className="text-gray-600">Stock: {stock}</p>
      <p className="text-gray-600">Categoría: {categoria}</p>
    </div>
  );
};

export default ProductCard;
