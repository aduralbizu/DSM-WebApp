import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/UI/Header';
import Home from './Pages/Home';
import Footer from './Components/UI/Footer';
import ProductList from './Pages/ProductList';
import ErrorPage from './Pages/ErrorPage';
import { useState } from 'react';
import CartContext from './Contexts/CartContext';


function App() {

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
      },{
        id: Math.random().toString(),
        name: 'Galletas',
        price: 2.25,
        image: 'imagen1'
      },
      {
        id: Math.random().toString(),
        name: 'Cerveza',
        price: 1,
        image: 'imagen2'
      },
      {
        id: Math.random().toString(),
        name: 'Agua mineral',
        price: 1,
        image: 'imagen3'
      },{
        id: Math.random().toString(),
        name: 'Zumo de naranja',
        price: 1.15,
        image: 'imagen1'
      },
      {
        id: Math.random().toString(),
        name: 'Chocolate',
        price: 0.15,
        image: 'imagen2'
      },
      {
        id: Math.random().toString(),
        name: 'Queso Idiazabal',
        price: 4,
        image: 'imagen3'
      }
      
    ]
  )

  // Estado del carrito de compras
  const [cart, setCart] = useState([]);


  const addToCart = (productId) => {

    const productToAdd = products.find(product => product.id === productId); //devuelve primer elto encontrado
    const productInCart = cart.find(item => item.id === productId);

    // Si el producto ya está en el carrito, incrementar su cantidad
    if (productInCart) { // En js if, no solo acepta valores booleanos (tambien thruthy, falsy)
      const updatedCart = cart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 }; //En js en notacion shallow copy, el primer elto entre llaves siempre copia del objeto, y el segundo propiedad
        }
        return item;
      });
      setCart(updatedCart);
    } else { // Si el producto no está en el carrito, agregarlo con cantidad 1
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        if (item.quantity === 1) {

          return null;
        } else {

          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    }).filter(item => item !== null); // Se queda con los distintos
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
};



  return (
    <>
      <CartContext.Provider value={{ addToCart:addToCart, removeFromCart:removeFromCart, clearCart:clearCart }}>

        <Header cart={cart} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product-list'
            element={<ProductList
              products={products}
               />
            }

          />

          <Route path='*' element={<ErrorPage />} />
        </Routes>



        <Footer />
      </CartContext.Provider >

    </>

  );
}

export default App;
