import { Nav } from "react-bootstrap" // import alternativos
import { Link } from "react-router-dom"

const Header = () => {

    return (
        <>
        <Nav>
        <Nav.Item>
        <Link to='/'>Inicio</Link>
        <Link to='/product-list'>| Lista de productos</Link>
        </Nav.Item>

        </Nav>
      
        </>
    )
}

export default Header;