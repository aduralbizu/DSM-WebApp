import Products from "../Components/Products/Products";

// {} equivale a props.addCart ...
const ProductList = ({ products, addToCart, removeFromCart }) =>{
    
    

    return (
        <>
        <Products products={products}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
        />
        </>
    )
}

export default ProductList;