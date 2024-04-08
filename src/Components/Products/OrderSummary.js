import React, { useContext } from 'react';
import { Image, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import CartContext from "../../Contexts/CartContext";
import './OrderSummary.css'; // Importa el archivo CSS con los estilos
import { Link } from 'react-router-dom';


const OrderSummary = ({ cart }) => {

    const cartContext = useContext(CartContext);

    const calculateTotal = () => {
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    };

    const anadirUnidadHandler = (event) => {
        cartContext.addToCart(event.currentTarget.value);
    };

    const sustraerUnidadHandler = (event) => {
        cartContext.removeFromCart(event.currentTarget.value);
    };

    // Verifica si el carrito está vacío
    if (cart.length === 0) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="warning">
                    Tu carrito está vacío.
                </Alert>
                <Link to="/product-list">
                    <Button className="mt-3" variant="danger">Volver a Lista de Productos</Button>
                </Link>
            </Container>
        );
    }

    return (
        <>
            <Container className="my-4 px-0 ">
                <p className="fs-4 fw-medium py-0 my-0">Resumen del pedido:</p>
            </Container>
            <Container className="p-0 contenedorScroll">
                <ul className="list-group">
                    {cart.map(item => (
                        <li className="list-group-item bordeProducto" key={item.id}>
                            <Container className='text-center'>
                                <Row className='align-items-center'>
                                    <Col><Image className="imagen2" src={item.image} /></Col>
                                    <Col><p className="fs-5 fw-semibold m-0">{item.name}</p></Col>
                                    <Col><p className="m-0">{item.price} €</p></Col>
                                    <Col> <p className="m-0 text-primary fw-bold">x{item.quantity} </p></Col>
                                    <Col> <p className="m-0"> Precio: {(item.price * item.quantity).toFixed(2)} €</p></Col>
                                    <Col xs={12} sm={2}>
                                        <Button value={item.id} onClick={anadirUnidadHandler} className="m-1 parejaBotones" variant="success" title="Añadir unidad" >
                                            <i className="bi bi-cart-plus"></i>
                                        </Button>
                                        <Button value={item.id} onClick={sustraerUnidadHandler} className="m-1 parejaBotones" variant="danger" title="Sustraer unidad">
                                            <i className="bi bi-cart-x"></i>
                                        </Button>
                                    </Col>
                                </Row>

                            </Container>
                        </li>
                    ))}

                </ul>
            </Container>
            <Container className='mb-3'>
                <p className="fs-5 mt-3 fw-semibold">Total: {calculateTotal()} €</p>
                <Link to="/info-pedido">
                    <Button className="me-2 mb-3" variant="primary">Continuar</Button>
                </Link>
                <Link to="/product-list">
                    <Button className="mb-3" variant="danger">Cancelar</Button>
                </Link>
            </Container>
        </>
    );
}

export default OrderSummary;
