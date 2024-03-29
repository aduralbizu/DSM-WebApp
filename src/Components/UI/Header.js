import { useState, useRef, useEffect } from "react";
import { Badge, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../Products/Cart.css';
import Cart from "../Products/Cart";
import './Header.css';

const Header = (props) => {
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [bloquearClics, setBloquearClics] = useState(false);
    const cartRef = useRef(null);

    const toggleCarrito = () => {
        setMostrarCarrito(!mostrarCarrito);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                if (mostrarCarrito) {
                    setMostrarCarrito(false);
                    setBloquearClics(false); // Restaurar la capacidad de clics
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mostrarCarrito]);

 

    const calculateUds = () => {
        let uds = 0;

        props.cart.forEach(item => {
            uds += item.quantity;
        });
        return uds;
    };

    return (
        <>
            <div className="header">
                <Nav className="justify-content-start">
                    <Nav.Item as="li">
                        <Link to='/'>Inicio |</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/product-list'>Lista de productos</Link>
                    </Nav.Item>
                </Nav>
                <Nav className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link onClick={toggleCarrito}  style={{ marginRight: '10px' }}>
                            🛒 Carrito <Badge variant="primary">{calculateUds()}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            {/* Mostrar el panel del carrito si mostrarCarrito es true */}
            {mostrarCarrito &&
                <div className="panel-carrito" ref={cartRef}>
                    <Cart cart={props.cart} />
                </div>
            }

            {bloquearClics && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9999 }}></div>
            )}
        </>
    )
}


export default Header;

