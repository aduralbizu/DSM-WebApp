import { Alert, Col, Row, Container } from "react-bootstrap";
import Product from "./Product";

const Products = (props) => {

    //Aquí un filtrado

    // const addTocart = props.addToCart();
    let contenido = <Alert variant="primary">No hay productos</Alert>; //Contenido condicional. Lo presentaremos en pantalla

    if (props.products.length > 0) {
        contenido = <Container className="text-center pt-3 pb-3">
            <Row className="gy-3 align-items-start">
                {
                    props.products.map((element) => { // La expresión props.productos.map(...) en JavaScript generalmente se usa para iterar sobre cada elemento de un array. Ejecuta la función que se le pasa como argumento para cada elemento del array
                        return (
                            <Col key={element.id} xs={12} sm={6} md={4} xl={3} >
                                <Product product={element} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>

    }

    return (
        <>
            {contenido}
        </>
    )
}

export default Products;