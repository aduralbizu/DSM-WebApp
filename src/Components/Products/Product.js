// (nombre+imagen+€)
import { Button } from "react-bootstrap";

// OJO OJO, NO OLVIDAR QUE AQUI ESTAMOS CON UN SOLO PRODUCTO 
// RECORDAR PARA VARIABLE DE ESTADO
// cuando se usa setChart, es cuando se renderiza de nuevo comp producto
// si actuas directamente sobre var chart, parece que cambia tambien, pero no renderiza

const Product = (props) => {

    const name = props.product.name;
    const price = props.product.price;
    const image = props.product.image;

    const id_producto = props.product.id;
    // props.addToCart;
    // props.removeFromCart;


    // const agregarCarrito = () => {

    //     let productoEncontrado = false;

    //     for (let i = 0; i < chart.length; i++) {
    //         if (chart[i].id_producto === id_producto) {

    //             chart[i].cantidad += 1;
    //             productoEncontrado = true;
    //             break; // Salimos del bucle ya que encontramos el producto
    //         }
    //     }

    //     if (!productoEncontrado) {
            
    //         setChart(
    //             {
    //                 id: id_producto,
    //                 nombre: name,
    //                 cantidad: 1

    //             }
    //         )
        
    //     }

    //     //  setChart((prevChart) => {
    //     //      return [chart, ...prevChart]; // crea indice nuevo: [0], [1] del json
    //     //  })
    //     console.log(chart);

    // }


    return (
        <div className='producto m-4 p-2' >
            <h2>{name}</h2>
            <p>{image}</p>
            <p>{price} €</p>
            <Button variant="outline-success" className="m-1" onClick= {() => props.addToCart(id_producto)}>+</Button>
            <Button variant="outline-danger" className="m-1" onClick= {() => props.removeFromCart(id_producto)}> - </Button>
           
        </div>
       
    )
}

export default Product;
