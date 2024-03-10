// (nombre+imagen+€)
import { Button } from "react-bootstrap";

const Product = (props) => {
    const name = props.product.name;
    const price = props.product.price;
    const image = props.product.image;

    return (
        <div className='producto m-4 p-2' >
            <h2>{name}</h2>
            <p>{image}</p>
            <p>{price} €</p>
            <Button variant="outline-success" className="m-1">+</Button>
            <Button variant="outline-danger" className="m-1"> - </Button>
        </div>
    )
}

export default Product;
