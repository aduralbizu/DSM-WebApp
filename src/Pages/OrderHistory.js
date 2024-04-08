import { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './OrderHistory.css'; // Importa el archivo CSS con los estilos

const OrderHistory = () => {
    const [historial, setHistorial] = useState({});

    useEffect(() => {
        axios.get('https://dsm-webapp-default-rtdb.europe-west1.firebasedatabase.app/historial.json')
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    setHistorial(response.data);
                } else {
                    throw new Error('La respuesta no tiene el formato esperado');
                }
            })
            .catch(error => {
                alert("Se ha producido un error: " + error.message);
            });
    }, []);

    const handleDeletePedido = (pedidoId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este pedido?")) {
            axios.delete(`https://dsm-webapp-default-rtdb.europe-west1.firebasedatabase.app/historial/${pedidoId}.json`)
                .then(response => {
                    console.log("Pedido eliminado de la base de datos");
                    const updatedHistorial = { ...historial };
                    delete updatedHistorial[pedidoId];
                    setHistorial(updatedHistorial);
                })
                .catch(error => {
                    alert("Se ha producido un error al eliminar el pedido: " + error.message);
                });
        }
    };

    return (
        <div className="order-history">
            <h2>Historial de Pedidos</h2>
            <ul className="order-list">
                {Object.keys(historial).map((pedidoId) => (
                    <li key={pedidoId} className="order-item">
                        <div className="order-info">
                            <span><strong>Pedido ID:</strong> {pedidoId}</span>
                            <Link to={`/order-details/${pedidoId}`} className="ver-detalles-link">Ver detalles</Link>
                            <Button className="borrar-pedido" onClick={() => handleDeletePedido(pedidoId)}>Eliminar Pedido</Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderHistory;
