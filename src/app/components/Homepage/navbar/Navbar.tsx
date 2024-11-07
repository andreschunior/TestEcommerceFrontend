// components/Navbar.js
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-yellow-400 p-4 shadow-md">
      <div className="container mx-auto flex justify-around">
        <Link href="/" className="text-gray-800 font-bold hover:text-gray-600">
          Inicio
        </Link>
        <Link
          href="/products"
          className="text-gray-800 font-bold hover:text-gray-600"
        >
          Productos
        </Link>
        <Link
          href="/ventas"
          className="text-gray-800 font-bold hover:text-gray-600"
        >
          Ventas
        </Link>
        <Link
          href="/contacto"
          className="text-gray-800 font-bold hover:text-gray-600"
        >
          Contacto
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
