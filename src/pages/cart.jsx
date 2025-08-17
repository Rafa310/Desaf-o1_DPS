import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, applyCoupon } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

export default function Cart() {
  // Obtener datos del carrito (los cupones ahora son objetos {code, discount})
  const { items, coupons, appliedCoupon } = useSelector((state) => state.cart);
  const [couponInput, setCouponInput] = useState('');
  const dispatch = useDispatch();

  // Calcular totales (actualizado para usar el discount del cupón aplicado)
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? (1 - appliedCoupon.discount) : 1;
  const finalTotal = subtotal * discount;

  // Aplicar cupón (versión actualizada para buscar en objetos)
  const handleApplyCoupon = () => {
    const couponCode = couponInput.trim().toUpperCase();
    const validCoupon = coupons.find(c => c.code === couponCode);
    
    if (validCoupon) {
      dispatch(applyCoupon(couponCode));
      toast.success(`¡Cupón "${couponCode}" aplicado!`);
      setCouponInput('');
    } else {
      toast.error('Cupón no válido');
    }
  };

  // Manejar tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Carrito</h2>

      {/* Sección de cupón */}
      <div style={{ display: 'flex', margin: '1rem 0' }}>
        <input
          type="text"
          value={couponInput}
          placeholder="Ej: DESCUENTO10"
          onChange={(e) => setCouponInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            padding: '0.5rem',
            flexGrow: 1,
            marginRight: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={handleApplyCoupon}
          disabled={!couponInput.trim()}
          style={{
            padding: '0.5rem 1rem',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: !couponInput.trim() ? 0.6 : 1
          }}
        >
          Aplicar
        </button>
      </div>

      {/* Cupón activo (actualizado para mostrar el discount del objeto) */}
      {appliedCoupon && (
        <p style={{ color: 'green', marginBottom: '1rem' }}>
          Cupón aplicado: <strong>{appliedCoupon.code}</strong> ({appliedCoupon.discount * 100}% de descuento)
        </p>
      )}

      {/* Lista de productos */}
      {items.length === 0 ? (
        <p style={{ color: '#666' }}>Tu carrito está vacío</p>
      ) : (
        <div>
          {items.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid #f5f5f5'
              }}
            >
              <div>
                <span style={{ fontWeight: 'bold' }}>{item.title}</span>
                <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                  (${item.price} x {item.quantity})
                </span>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff4444',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                ❌
              </button>
            </div>
          ))}

          {/* Total (actualizado para mostrar correctamente los descuentos) */}
          <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
            {appliedCoupon && (
              <p style={{ color: '#666', marginBottom: '0.25rem' }}>
                Subtotal: <span style={{ textDecoration: 'line-through' }}>${subtotal.toFixed(2)}</span>
              </p>
            )}
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              Total: <span style={{ color: '#4CAF50' }}>${finalTotal.toFixed(2)}</span>
              {appliedCoupon && (
                <span style={{ color: 'green', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                  (Ahorras ${(subtotal - finalTotal).toFixed(2)})
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}