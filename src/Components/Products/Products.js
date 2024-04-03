import { Alert, Col, Row, Container } from "react-bootstrap";
import Product from "./Product";
import ProductFilter from "./ProductFilter";
import { useEffect, useState } from "react";
import axios from "axios";


const Products = () => {

    //Aquí un filtrado
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.get('https://dsm-webapp-default-rtdb.europe-west1.firebasedatabase.app/products.json')
            .then((response) => {
                // console.log(response.data);
                let arrayProductos = [];
                for (let key in response.data) {
                    arrayProductos.push({
                        id: key,
                        name: response.data[key].name,
                        price: response.data[key].price,
                        image: response.data[key].image,
                        details: response.data[key].details
                    })
                }
                // console.log(arrayProductos);
                setProducts(arrayProductos);
                setFilteredProducts(arrayProductos);
            }).catch((error) => {
                alert("Se ha producido un error");
            })
    }, []); //Dependencia array vacío para que solo se ejecute una vez

    let contenido =
        <>
            <ProductFilter products={products} setFilteredProducts={setFilteredProducts} />

            <Container className="text-center pt-3 pb-3">
                <Row className="gy-3 align-items-start">
                    {
                        filteredProducts.map((element) => { // La expresión props.productos.map(...) en JavaScript generalmente se usa para iterar sobre cada elemento de un array. Ejecuta la función que se le pasa como argumento para cada elemento del array
                            return (
                                <Col key={element.id} xs={12} sm={6} md={4} xl={3} >
                                    <Product product={element} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>

    return (
        <>
            {contenido}
        </>
    )
}

export default Products;