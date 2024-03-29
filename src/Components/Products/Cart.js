import React, { useContext } from 'react';
import CartContext from '../../Contexts/CartContext';
import { Button } from 'react-bootstrap';

const Cart = ({ cart }) => {

  const calculateTotal = () => {
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };



  const cartContext = useContext(CartContext);

  const clearCartHandler = () => {
    cartContext.clearCart();
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - Cantidad: {item.quantity} - Precio unitario: {item.price} €
          </li>
        ))}
      </ul>
      <p>Total: {calculateTotal()} €</p>
      <Button onClick={clearCartHandler}>Vaciar Carrito</Button>
    </div>
  );
};

export default Cart;
