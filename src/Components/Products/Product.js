// (nombre+imagen+€)
import { useContext } from "react";
import { Button } from "react-bootstrap";
import CartContext from "../../Contexts/CartContext";
import "./Product.css";

// cuando se usa setChart, es cuando se renderiza de nuevo comp producto
// si actuas directamente sobre var chart, parece que cambia tambien, pero no renderiza

const Product = (props) => {

    const name = props.product.name;
    const price = props.product.price;
    const image = props.product.image;

    const id_producto = props.product.id;

    const cartContext = useContext(CartContext);

    // IMPORTANTE: Se deben manejar aquí, si no, hace setState en el renderizado de Product (dentro del return)
    const addToCartHandler = () => {
        cartContext.addToCart(id_producto);
    }

    const removeFromCartHandler = () => {
        cartContext.removeFromCart(id_producto);
    }

  
    return (
        <div className='producto pb-3 pt-3' >
            <h3 className="nombreProducto">{name}</h3>
            <p>{image}</p>
            <p>{price} €</p>
          
            <Button variant="outline-success" className="m-1" onClick={ addToCartHandler }>+</Button>
            <Button variant="outline-danger" className="m-1" onClick={ removeFromCartHandler }> - </Button>
        </div>

    )
}

export default Product;
