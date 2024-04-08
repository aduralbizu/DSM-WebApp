import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/UI/Header';
import Home from './Pages/Home';
import Footer from './Components/UI/Footer';
import ErrorPage from './Pages/ErrorPage';
import { useEffect, useState } from 'react';
import CartContext from './Contexts/CartContext';
import Products from './Components/Products/Products';
import axios from 'axios';
//import Checkout from './Pages/Checkout';
import CheckoutForm from './Pages/CheckoutForm';
import Contact from './Pages/Contact';
import AboutUs from './Pages/AboutUs';
import OrderHistory from './Pages/OrderHistory';
import OrderDetails from './Pages/OrderDetails';
import OrderSummary from './Components/Products/OrderSummary';

function App() {
  const [products, setProducts] = useState([]);

  // Estado del carrito de compras obtenido del localStorage
  // Esto permite persiste ante recarga, cierre de pestaña, incluso cierre del navegador
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : []; // si no se encuentra nada, vacio
  });

  useEffect(() => {
    axios.get('https://dsm-webapp-default-rtdb.europe-west1.firebasedatabase.app/products.json')
      .then((response) => {
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
        setProducts(arrayProductos);
      }).catch((error) => {
        alert("Se ha producido un error");
      })
  }, []);

  useEffect(() => { // cada vez que cambio var estado cart, lo asigno a almacenamiento local
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
      const updatedCart = cart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...productToAdd, quantity: 1, image: productToAdd.image }]);
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
    }).filter(item => item !== null);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <CartContext.Provider value={{ addToCart: addToCart, removeFromCart: removeFromCart, clearCart: clearCart }}>
        <Header cart={cart} />

        <Routes>
          <Route path='/' element={<Home />} />     
          <Route path='/resumen-pedido' element={<OrderSummary cart={cart} />}/>
          <Route path='/info-pedido' element={<CheckoutForm cart={cart}/>}/>
          <Route path='/product-list' element={<Products products={products} />} />
          <Route path='/about-us' element={<AboutUs />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/order-details/:id' element={<OrderDetails />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>

        <Footer />
      </CartContext.Provider >
    </>

  );
}

export default App;
