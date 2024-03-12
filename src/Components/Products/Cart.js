

const Cart = ({ cart }) => (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>{item.name} {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
  
  export default Cart;