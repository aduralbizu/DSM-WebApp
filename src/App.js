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
import Checkout from './Pages/Checkout';
import CheckoutForm from './Pages/CheckoutForm';
import Contact from './Pages/Contact';
import AboutUs from './Pages/AboutUs';
import OrderHistory from './Pages/OrderHistory';




function App() {

  const [products, setProducts] = useState([]);

  // Estado del carrito de compras
  const [cart, setCart] = useState([]);

  useEffect(() => { //Es necesario hacer un GET/ de todos los productos para añadir producto al carrito
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
        setProducts(arrayProductos);
      }).catch((error) => {
        alert("Se ha producido un error");
      })
  }, []); //Dependencia array vacío para que solo se ejecute una vez


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
      setCart([...cart, { ...productToAdd, quantity: 1, image: productToAdd.image }]);
      //setCart([...cart, { ...productToAdd, quantity: 1 }]);
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
      <CartContext.Provider value={{ addToCart: addToCart, removeFromCart: removeFromCart, clearCart: clearCart }}>
        <Header cart={cart} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product-list'
            element={<ProductList
              products={products}
            />
            }
          />
          <Route path='/resumen-pedido'
            element={<Checkout
              cart={cart}
            />
            }
          />

          <Route path='/info-pedido'
            element={<CheckoutForm />}
          />

          <Route path='*' element={<ErrorPage />} />

          <Route path='/about-us' element={<AboutUs />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/order-history' element={<OrderHistory />} />
        </Routes>

        <Footer />
      </CartContext.Provider >
    </>

  );
}

export default App;
