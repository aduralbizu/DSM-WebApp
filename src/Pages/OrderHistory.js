// Historial de pedidos

import { useEffect, useState } from "react";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


const OrderHistory = () => {
    const [historial, setHistorial] = useState({});
    const [clienteVisible, setClienteVisible] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('https://dsm-webapp-default-rtdb.europe-west1.firebasedatabase.app/historial.json')
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    setHistorial(response.data);
                    console.log(response.data);
                } else {
                    throw new Error('La respuesta no tiene el formato esperado');
                }
            })
            .catch(error => {
                alert("Se ha producido un error: " + error.message);
            });
    }, []);

    const handleVerClienteClick = (pedidoId) => {
        setClienteVisible(pedidoId);
        setShowModal(true);
    };

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

    const handleCloseModal = () => {
        setShowModal(false);
        setClienteVisible(null);
    };

    const calcularPrecioTotalPedido = (productos) => {
        let precioTotal = 0;
        productos.forEach(producto => {
            precioTotal += producto.quantity * producto.price;
        });
        return precioTotal.toFixed(2);
    };


    return (
        <>
            Eskarien zerrenda

            <div className="order-history">
                <h2>Historial de Pedidos</h2>
                <ul className="order-list">
                    {Object.keys(historial).map((pedidoId) => (
                        <li key={pedidoId} className="order-item">
                            <div className="order-info">
                                <p><strong>Pedido ID:</strong> {pedidoId}</p>
                                {historial[pedidoId].resumenPedido.map((producto, indexProducto) => (
                                    <div key={indexProducto} className="product-item">
                                        <p><strong>ID del Producto:</strong> {producto.id}</p>
                                        <p><strong>Precio:</strong> {producto.price} €</p>
                                        <p><strong>Cantidad:</strong> {producto.quantity}</p>
                                        <p><strong>Total:</strong> {(producto.quantity * producto.price).toFixed(2)} €</p>
                                    </div>
                                ))}
                                <p><strong>Total del Pedido:</strong> {calcularPrecioTotalPedido(historial[pedidoId].resumenPedido)} €</p>
                                <button className="ver-info-cliente" onClick={() => handleVerClienteClick(pedidoId)}>Ver Información del Cliente</button>
                                <button className="borrar-pedido" onClick={() => handleDeletePedido(pedidoId)}>Eliminar Pedido</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Información del Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {clienteVisible !== null && (
                            <div>
                                <p><strong>Nombre:</strong> {historial[clienteVisible].infoCliente.nombre}</p>
                                <p><strong>Apellidos:</strong> {historial[clienteVisible].infoCliente.apellidos}</p>
                                <p><strong>Dirección:</strong> {historial[clienteVisible].infoCliente.direccion}</p>
                                <p><strong>Código Postal:</strong> {historial[clienteVisible].infoCliente.codigoPostal}</p>
                                <p><strong>Provincia:</strong> {historial[clienteVisible].infoCliente.provincia}</p>
                                <p><strong>Teléfono:</strong> {historial[clienteVisible].infoCliente.numeroTelefono}</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>




        </>
    );
}

export default OrderHistory;