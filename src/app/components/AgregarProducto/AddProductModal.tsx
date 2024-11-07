// components/AgregarProducto/AddProductModal.tsx
import React, { useState } from "react";
import axios from "axios";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void; // Agregar esta propiedad
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onProductAdded,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [imagenURL, setImagenURL] = useState("");
  const [modelosCompatiblesIds, setModelosCompatiblesIds] = useState<number[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        imagenURL,
        modelosCompatiblesIds,
      };

      const response = await axios.post("http://localhost:3000/products", data);
      console.log("Producto agregado:", response.data);
      onProductAdded(); // Llamar a onProductAdded después de agregar el producto
      onClose(); // Cerrar el modal
      resetForm();
    } catch (err) {
      setError("Error al agregar el producto");
      console.error(err);
    }
  };

  const resetForm = () => {
    setNombre("");
    setDescripcion("");
    setPrecio(0);
    setStock(0);
    setCategoria("");
    setImagenURL("");
    setModelosCompatiblesIds([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Nombre:
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Descripción:
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Precio:
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Stock:
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Categoría:
            <input
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Imagen URL:
            <input
              value={imagenURL}
              onChange={(e) => setImagenURL(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Modelos Compatibles (IDs separados por coma):
            <input
              placeholder="Ejemplo: 1,2,3"
              value={modelosCompatiblesIds.join(",")}
              onChange={(e) =>
                setModelosCompatiblesIds(
                  e.target.value
                    .split(",")
                    .map((id) => parseInt(id.trim()))
                    .filter((id) => !isNaN(id))
                )
              }
              className="border p-2 w-full"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
