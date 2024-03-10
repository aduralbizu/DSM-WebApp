import { Alert } from "react-bootstrap";
import Product from "./Product";

const Products = (props) => {

    //Aquí un filtrado
    
    let contenido = <Alert variant="primary">No hay productos</Alert>; //Contenido condicional. Lo presentaremos en pantalla

    if (props.products.length > 0) {
        contenido = <div>
            {
                props.products.map((element) => { // La expresión props.productos.map(...) en JavaScript generalmente se usa para iterar sobre cada elemento de un array. Ejecuta la función que se le pasa como argumento para cada elemento del array
                    return (
                        <Product key = {element.id} product={element} />
                    )
                })
            }
        </div>

    }
    
    return(
    <>
        {contenido}
    </>
    )
}

export default Products;