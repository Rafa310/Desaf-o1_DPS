
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '16px', background: '#18699fd4' }}>
      <Link href="/" style={{ marginRight: '16px' }}>Inicio</Link>
      <Link href="/cart">Carrito</Link>
      <Link href="/admin">  Admin</Link>
    </nav>
  );
}