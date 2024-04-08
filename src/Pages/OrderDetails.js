import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import './OrderDetails.css';
import '../Components/Products/Product.css';

const OrderDetails = () => {
    const [mostrarPedido, setMostrarPedido] = useState({});
    const [products, setProducts] = useState([]);
    const parametros = useParams();

    useEffect(() => {
        axios.get(`https://dsm-webapp-default-rtdb.europe-west1.firebasedatabase.app/historial/${parametros.id}.json`)
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    setMostrarPedido(response.data);
                } else {
                    throw new Error('La respuesta no tiene el formato esperado');
                }
            })
            .catch(error => {
                console.error("Error al cargar los detalles del pedido:", error);
                alert("Se ha producido un error al cargar los detalles del pedido. Por favor, inténtelo de nuevo más tarde.");
            });
            
        axios.get('https://dsm-webapp-default-rtdb.europe-west1.firebasedatabase.app/products.json')
            .then((response) => {
                let arrayProductos = [];
                for (let key in response.data) {
                    arrayProductos.push({
                        id: key,
                        name: response.data[key].name,
                        price: response.data[key].price,
                        image: response.data[key].image,
                        details: response.data[key].details
                    })
                }
                setProducts(arrayProductos);
            }).catch((error) => {
                alert("Se ha producido un error");
            })
    }, []);

    const obtainName = (id) => {
        const product = products.find(product => product.id === id);
        return product ? product.name : "Nombre no encontrado";
    }

    const obtainImage = (id) => {
        const product = products.find(product => product.id === id);
        return product ? product.image : "Imagen no encontrada";
    }

    const calculateTotal = () => {
        let total = 0;
        mostrarPedido.resumenPedido.forEach(producto => {
            total += producto.price * producto.quantity;
        });
        return total.toFixed(2);
    }

    const renderInfoCliente = () => {
        const { infoCliente } = mostrarPedido;
        return (
            <div className="info-cliente-container">
                <h3>Información del Cliente:</h3>
                <ul>
                    <li><strong>Nombre:</strong> {infoCliente.nombre}</li>
                    <li><strong>Apellidos:</strong> {infoCliente.apellidos}</li>
                    <li><strong>Dirección:</strong> {infoCliente.direccion}</li>
                    <li><strong>Código Postal:</strong> {infoCliente.codigoPostal}</li>
                    <li><strong>Provincia:</strong> {infoCliente.provincia}</li>
                    <li><strong>País:</strong> {infoCliente.pais}</li>
                    <li><strong>Teléfono:</strong> {infoCliente.numeroTelefono}</li>
                </ul>
            </div>
        );
    };

    const renderProductos = () => {
        const productos = mostrarPedido.resumenPedido;
        return (
            <div className="productos-container">
                <h3>Productos:</h3>
                <ul>
                    {productos.map((producto, index) => (
                        <li key={index} className="producto-item">
                            <div className="producto-info">
                                <p><strong>Nombre del Producto:</strong> {obtainName(producto.id)}</p>
                                <p><strong>Precio:</strong> {producto.price} €</p>
                                <p><strong>Cantidad:</strong> {producto.quantity}</p>
                            </div>
                            <Image className="imagen mb-3 mt-3 img-fluid" src={obtainImage(producto.id)} rounded />
                            <p className="producto-total"><strong>Total:</strong> {(producto.quantity * producto.price).toFixed(2)} €</p>
                        </li>
                    ))}
                </ul>
                <p className="total-pedido"><strong>Total del pedido:</strong> {calculateTotal()} €</p>
            </div>
        );
    };

    return (
        <div className="order-details-container">
            <h2 className="order-details-heading">Detalles del Pedido</h2>
            {Object.keys(mostrarPedido).length > 0 ? (
                <>
                    {renderInfoCliente()}
                    {renderProductos()}
                    <Link to="/order-history" className="back-to-orders">Volver a Historial de Pedidos</Link>
                </>
            ) : <p className="error-message">No se encontraron detalles del pedido.</p>}
        </div>
    );
}

export default OrderDetails;
