// (nombre+imagen+€)
import { useState } from 'react';
import { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import CartContext from "../../Contexts/CartContext";
import Modal from 'react-bootstrap/Modal';
import "./Product.css";

// cuando se usa setChart, es cuando se renderiza de nuevo comp producto
// si actuas directamente sobre var chart, parece que cambia tambien, pero no renderiza

const Product = (props) => {

    const name = props.product.name;
    const price = props.product.price;
    const image = props.product.image;
    const details = props.product.details;
    const id_producto = props.product.id;

    const cartContext = useContext(CartContext);

    // IMPORTANTE: Se deben manejar aquí, si no, hace setState en el renderizado de Product (dentro del return)
    const addToCartHandler = () => {
        cartContext.addToCart(id_producto);
    }

    const removeFromCartHandler = () => {
        cartContext.removeFromCart(id_producto);
    }

    const [smShow, setSmShow] = useState(false); //Variables para el modal
    const [lgShow, setLgShow] = useState(false);

    return (
        <div className='producto pb-3 pt-3' >
            <h3 className="nombreProducto">{name}</h3>
            <p>{image}</p>
            <p>{price} €</p>

            <Container>
                <Button variant="outline-success" className="m-1" onClick={addToCartHandler}>+</Button>
                <Button variant="outline-danger" className="m-1" onClick={removeFromCartHandler}> - </Button>
            </Container>
            <Button variant="outline-warning" onClick={() => setLgShow(true)}>Detalles</Button>

            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <h3>Detalles</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{name} - <p className='precioDetalles'>{price} €</p></h4>
                    <p>{details}</p>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default Product;
