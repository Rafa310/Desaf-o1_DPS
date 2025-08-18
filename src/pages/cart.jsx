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
    <div className="cart-container">
    <h2>Carrito</h2>

      {/* Sección de cupón */}
      <div className="coupon-section">
        <input
          type="text"
          value={couponInput}
          placeholder="Ej: DESCUENTO10"
          onChange={(e) => setCouponInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
        onClick={handleApplyCoupon}
        disabled={!couponInput.trim()}
        >
          Aplicar
        </button>
      </div>

      {/* Cupón activo (actualizado para mostrar el discount del objeto) */}
      {appliedCoupon && (
        <p className="applied-coupon">
          Cupón aplicado: <strong>{appliedCoupon.code}</strong> ({appliedCoupon.discount * 100}% de descuento)
        </p>
      )}

      {/* Lista de productos */}
      {items.length === 0 ? (
        <p className="cart-empty">Tu carrito está vacío</p>
      ) : (
        <>
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <span className="item-title">{item.title}</span>
              <span className="item-price">(${item.price} x {item.quantity})</span>
            </div>
            <button
              className="remove-item"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              ❌
            </button>
          </div>
        ))}

          {/* Total (actualizado para mostrar correctamente los descuentos) */}
          <div className="cart-total">
          {appliedCoupon && (
            <p>
              Subtotal: <span style={{ textDecoration: 'line-through' }}>${subtotal.toFixed(2)}</span>
            </p>
          )}
          <p>
            Total: <span className="total-amount">${finalTotal.toFixed(2)}</span>
            {appliedCoupon && (
              <span className="savings">(Ahorras ${(subtotal - finalTotal).toFixed(2)})</span>
            )}
          </p>
        </div>
      </>
    )}
  </div>
);}