import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-link">Inicio</Link>
        <Link href="/cart" className="navbar-link">Carrito</Link>
        <Link href="/admin" className="navbar-link">Admin</Link>
      </div>
    </nav>
  );
}