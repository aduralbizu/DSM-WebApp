import React from 'react';
import { Image, Button } from 'react-bootstrap';
import './OrderSummary.css'; // Importa el archivo CSS con los estilos
import { Link } from 'react-router-dom';

const OrderSummary = ({ cart }) => {

    const calculateTotal = () => {
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    };

    return (
        <div className="checkout-summary">
            <h2>¿Estás seguro?</h2>
            <p>Resumen del pedido:</p>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        <div className='producto'>
                            <h3 className="nombreProducto">{item.name}</h3>
                            <Image className="imagen" src={item.image} rounded />
                            <p className='precio'>{item.price} €</p>
                            <p>- Cantidad: {item.quantity} - Precio: {(item.price * item.quantity).toFixed(2)} €</p>
                        </div>
                    </li>
                ))}
                <p className="total">Total: {calculateTotal()} €</p>
            </ul>

            <Link to="/info-pedido">
                <Button variant="primary">Continuar</Button>
            </Link>

            <Button variant="secondary">Cancelar</Button>
        </div>
    );
}

export default OrderSummary;
