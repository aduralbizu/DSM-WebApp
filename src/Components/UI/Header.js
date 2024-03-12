import { useState } from "react";
import { Badge, Nav } from "react-bootstrap" 
import { Link } from "react-router-dom"
import '../Products/Cart.css';
import Cart from "../Products/Cart";

const Header = (props) => {
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    const toggleCarrito = () => {
        setMostrarCarrito(!mostrarCarrito);
    }

    return (
        <>
            <Nav> 
                <Nav.Item>
                    <Link to='/'>Inicio</Link>
                    <Link to='/product-list'>| Lista de productos</Link>
                    {/* Enlace para mostrar/ocultar el panel del carrito */}
                    <Nav.Link onClick={toggleCarrito} style={{ marginLeft: '10px' }}>
                        🛒 Carrito <Badge variant="primary">4</Badge>
                    </Nav.Link>

                </Nav.Item>



            </Nav>

            {/* Mostrar el panel del carrito si mostrarCarrito es true */}
            {mostrarCarrito &&
                <div className="panel-carrito">
                    <Cart cart={props.cart}/>
                </div>
            }

        </>
    )
}

export default Header;