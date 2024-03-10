import { useState } from "react";
import Products from "../Components/Products/Products";

const ProductList = () =>{

    const [products, setProductos] = useState(
        [
            {
                id: Math.random().toString(),
                name: 'Lays',
                price: 1,
                image: 'imagen1'
            },
            {
                id: Math.random().toString(),
                name: 'Manzana',
                price: 0.15,
                image: 'imagen2'
            },
            {
                id: Math.random().toString(),
                name: 'Botella 1L AOVE',
                price: 4,
                image: 'imagen3'
            }
        ]
    )

    return (
        <>
        <Products products={products}/>
        </>
    )
}

export default ProductList;