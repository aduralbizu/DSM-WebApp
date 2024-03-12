
const Cart = ({ cart }) => {

  const calculateTotal = () => {
    let total = 0;

    cart.forEach(item => {

      total += item.price * item.quantity;
    });
    return total;
  };

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
    </div>
  );
};

export default Cart;
