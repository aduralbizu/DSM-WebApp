import Products from "../Components/Products/Products";

// {} equivale a props.addCart ...
const ProductList = ({ products }) => {



    return (
        <>
            <Products products={products} />
        </>
    )
}

export default ProductList;