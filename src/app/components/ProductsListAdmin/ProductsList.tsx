import React, { useEffect, useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
import AdjustStockModal from "./AdjustStockModal";
import EditProductModal from "./EditProductModal"; // Importamos el nuevo modal de edición
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  nombre: string;
  stock: number;
  categoria: string;
  descripcion: string;
  precio: number;
}

const ProductsListAdministrador: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<{
    [key: string]: Product[];
  }>({});
  const [isAdjustStockModalOpen, setIsAdjustStockModalOpen] = useState(false);
  const [productIdForAdjustment, setProductIdForAdjustment] = useState<
    number | null
  >(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false); // Estado para el modal de edición
  const [productIdForEdit, setProductIdForEdit] = useState<number | null>(null); // Estado para almacenar el ID del producto a editar

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const groupAndSortProductsByCategory = (products: Product[]) => {
    const grouped: { [key: string]: Product[] } = {};

    products.forEach((product) => {
      if (!grouped[product.categoria]) {
        grouped[product.categoria] = [];
      }
      grouped[product.categoria].push(product);
    });

    Object.keys(grouped).forEach((category) => {
      grouped[category].sort((a, b) => a.nombre.localeCompare(b.nombre));
    });

    return Object.keys(grouped)
      .sort()
      .reduce((sortedGrouped, category) => {
        sortedGrouped[category] = grouped[category];
        return sortedGrouped;
      }, {} as { [key: string]: Product[] });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const grouped = groupAndSortProductsByCategory(products);
      setGroupedProducts(grouped);
    }
  }, [products]);

  const handleOpenAdjustStockModal = (productId: number) => {
    setProductIdForAdjustment(productId);
    setIsAdjustStockModalOpen(true);
  };

  const handleCloseAdjustStockModal = () => {
    setProductIdForAdjustment(null);
    setIsAdjustStockModalOpen(false);
  };

  const handleAdjustStock = async (id: number, quantity: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${id}/adjust-stock`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        }
      );
      if (!response.ok) throw new Error("Error al ajustar stock");

      toast.success("Stock actualizado con éxito.");
      fetchProducts();
    } catch (error) {
      console.error("Error al ajustar el stock:", error);
      toast.error("Hubo un error al ajustar el stock.");
    }
  };

  const handleOpenProductDetailModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetailModal = () => {
    setSelectedProduct(null);
  };

  // Funciones para abrir y cerrar el modal de edición
  const handleOpenEditProductModal = (productId: number) => {
    setProductIdForEdit(productId);
    setIsEditProductModalOpen(true);
  };

  const handleCloseEditProductModal = () => {
    setProductIdForEdit(null);
    setIsEditProductModalOpen(false);
  };

  // Función para editar el producto con solicitud PUT
  const handleEditProduct = async (
    id: number,
    updatedProduct: Partial<Product>
  ) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) throw new Error("Error al actualizar el producto");

      toast.success("Producto actualizado con éxito.");
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      toast.error("Hubo un error al actualizar el producto.");
    }
  };

  // Función para borrar el producto con confirmación
  const handleDeleteProduct = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas borrar este producto?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al borrar el producto");

      toast.success("Producto borrado con éxito.");
      fetchProducts();
    } catch (error) {
      console.error("Error al borrar el producto:", error);
      toast.error("Hubo un error al borrar el producto.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Lista de Productos
      </h1>

      {Object.keys(groupedProducts).map((category) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mt-8">{category}</h2>
          <ul className="space-y-4">
            {groupedProducts[category].map((product) => (
              <li
                key={product.id}
                onClick={() => handleOpenProductDetailModal(product)}
                className="cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-lg shadow hover:bg-gray-100"
              >
                <div>
                  <h3 className="text-lg font-semibold">{product.nombre}</h3>
                  <p className="text-gray-600">
                    Categoría: {product.categoria}
                  </p>
                  <p className="text-gray-600">Stock: {product.stock}</p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenAdjustStockModal(product.id);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Ajustar Stock
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditProductModal(product.id);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(product.id);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Borrar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseProductDetailModal}
          onAdjustStock={handleOpenAdjustStockModal}
        />
      )}

      {isAdjustStockModalOpen && productIdForAdjustment !== null && (
        <AdjustStockModal
          productId={productIdForAdjustment}
          onClose={handleCloseAdjustStockModal}
          onAdjustStock={handleAdjustStock}
        />
      )}

      {isEditProductModalOpen && productIdForEdit !== null && (
        <EditProductModal
          product={products.find((p) => p.id === productIdForEdit)!} // Pasamos el producto completo
          onClose={handleCloseEditProductModal}
          onEditProduct={handleEditProduct}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProductsListAdministrador;
