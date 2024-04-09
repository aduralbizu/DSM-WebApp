import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import './OrderHistory.css'; // Importa el archivo CSS con los estilos

const OrderHistory = (props) => {
    const [historial, setHistorial] = useState({});
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const navegar = useNavigate();

    useEffect(() => {

        console.log(localStorage.getItem('login'))
        if (localStorage.getItem('login')=="false") {
            navegar("/login");
        }

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

    const renderLocalDate = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleString(); // Convertir la fecha a hora local
    };

    const handleDeletePedido = (pedidoId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este pedido?")) {
            axios.delete(`https://dsm-webapp-default-rtdb.europe-west1.firebasedatabase.app/historial/${pedidoId}.json?auth=${props.loginDataIdToken}`)
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

    const handleFiltrarPorFechas = () => {
        // Filtrar los pedidos por el rango de fechas seleccionado
        const filteredHistorial = Object.entries(historial).filter(([pedidoId, pedido]) => {
            const fechaPedido = new Date(pedido.infoCliente.fechaPedido);
            const inicio = fechaInicio ? new Date(fechaInicio) : null;
            const fin = fechaFin ? new Date(fechaFin) : null;
            return (!inicio || fechaPedido >= inicio) && (!fin || fechaPedido <= fin);
        });
        return filteredHistorial;
    };

    let filteredHistorial = handleFiltrarPorFechas();
    filteredHistorial = filteredHistorial.filter((element) => {
        return element[1].infoCliente.cuentaCorreo === props.loginDataEmail;
    }); //Filtramos por email

    let content = <>
        <ul className="order-list">
            {filteredHistorial.map(([pedidoId, pedido]) => (
                <li key={pedidoId} className="order-item">
                    <div className="order-info">
                        <span><strong>Pedido ID:</strong> {pedidoId}</span>
                        <span><strong>Fecha de pedido:</strong> {renderLocalDate(pedido.infoCliente.fechaPedido)}</span>
                        <Link to={`/order-details/${pedidoId}`} className="ver-detalles-link">Ver detalles</Link>
                        <Button className="borrar-pedido" onClick={() => handleDeletePedido(pedidoId)}>Eliminar Pedido</Button>
                    </div>
                </li>
            ))}
        </ul>
    </>

    if (filteredHistorial.length == 0) {
        content = <Container className="text-center mt-5">
            <Alert variant="danger">
                No hay pedidos que mostrar para {props.loginDataEmail}.
            </Alert>
        </Container>
    }

    return (
        <>
            <div className="order-history my-3">
                <h2>Historial de Pedidos
                    
                </h2>
               
                <div className="filter-section">
                    <label htmlFor="fechaInicio">Desde:</label>
                    <input type="date" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                    <label htmlFor="fechaFin">Hasta:</label>
                    <input type="date" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                    <Button onClick={handleFiltrarPorFechas}>Filtrar</Button>
                </div>
                {content}
            </div>

        </>
    );
}

export default OrderHistory;
