import React from "react";

const CartContext =  React.createContext(
    {
       addToCart : () => {},
       removeFromCart: () => {},
       clearCart: () => {}
    }
);

export default CartContext;