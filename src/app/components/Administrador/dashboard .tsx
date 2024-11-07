// components/AdminDashboard.tsx
import Link from "next/link";
import React, { useState } from "react";
import AddProductModal from "../AgregarProducto/AddProductModal";

const AdminDashboard: React.FC = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleProductAdded = () => {
    console.log("Producto agregado con éxito");
    // Aquí puedes recargar la lista de productos si es necesario
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="p-4 bg-yellow-200 hover:bg-yellow-300 transition-all rounded-lg shadow cursor-pointer"
          onClick={handleOpenModal}
        >
          <h2 className="text-xl font-semibold">Agregar producto</h2>
          <p className="text-gray-700">Añade nuevos productos al inventario.</p>
        </div>
        <Link href="/ProductListAdmin">
          <div className="p-4 bg-blue-200 hover:bg-blue-300 transition-all rounded-lg shadow cursor-pointer">
            <h2 className="text-xl font-semibold">Ver productos</h2>
            <p className="text-gray-700">
              Consulta y gestiona todos los productos.
            </p>
          </div>
        </Link>
        <div className="p-4 bg-green-200 hover:bg-green-300 transition-all rounded-lg shadow cursor-pointer">
          <h2 className="text-xl font-semibold">Ver reportes</h2>
          <p className="text-gray-700">
            Accede a los reportes de inventario y ventas.
          </p>
        </div>
        <div className="p-4 bg-red-200 hover:bg-red-300 transition-all rounded-lg shadow cursor-pointer">
          <h2 className="text-xl font-semibold">Ajustar stock</h2>
          <p className="text-gray-700">
            Modifica el stock de productos existentes.
          </p>
        </div>
        <Link href="/LowStock">
          <div className="p-4 bg-purple-200 hover:bg-purple-300 transition-all rounded-lg shadow cursor-pointer">
            <h2 className="text-xl font-semibold">
              Ver productos con bajo stock
            </h2>
            <p className="text-gray-700">
              Consulta productos con bajo nivel de inventario.
            </p>
          </div>
        </Link>
        <Link href="/Ventas">
          <div className="p-4 bg-orange-200 hover:bg-purple-300 transition-all rounded-lg shadow cursor-pointer">
            <h2 className="text-xl font-semibold">Venta</h2>
            <p className="text-gray-700">Realiza una venta</p>
          </div>
        </Link>

        {/* Otros enlaces o tarjetas adicionales */}
      </div>

      {/* Modal para agregar producto */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={handleCloseModal}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
};

export default AdminDashboard;
