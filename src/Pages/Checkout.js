// Trás botón realizar pedido de pag principal
// Donde puedes revisar pedido
import OrderSummary from "../Components/Products/OrderSummary";


// igual no hace falta por como se ha implementado el carrito
const Checkout = ({cart}) => {

    
    return (
        <>

       <OrderSummary cart={cart}></OrderSummary> 




        </>
    );
}

export default Checkout;
