import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/UI/Header';
import Home from './Pages/Home';
import Footer from './Components/UI/Footer';
import ErrorPage from './Pages/ErrorPage';
import { useEffect, useState } from 'react';
import CartContext from './Contexts/CartContext';
import Products from './Pages/Products';
import axios from 'axios';
import CheckoutForm from './Pages/CheckoutForm';
import Contact from './Pages/Contact';
import AboutUs from './Pages/AboutUs';
import OrderHistory from './Pages/OrderHistory';
import Login from './Components/Login/Login';
import OrderDetails from './Pages/OrderDetails';
import OrderSummary from './Pages/OrderSummary';

function App() {

  const [login, setLogin] = useState(false);
  const [loginDataIdToken, setloginDataIdToken] = useState('');
  const [loginDataEmail, setloginDataEmail] = useState('');

  const actualizarLogin = (login, loginData) => {
    setLogin(login);
    setloginDataIdToken(loginData.idToken);
    setloginDataEmail(loginData.email);
    localStorage.setItem('login',login);
    localStorage.setItem('loginDataIdToken',loginData.idToken);
    localStorage.setItem('loginDataEmail',loginData.email);
  }

  useEffect(()=>{
    if(localStorage.getItem('login')==='true'){ //Recuerda que localStorage serializa todo como string. Serialiar: El proceso de convertir el estado de un objeto en un formato que se pueda almacenar o transportar
      setLogin(true);
      setloginDataIdToken({idToken:localStorage.getItem('loginDataIdToken')});
      setloginDataEmail({email:localStorage.getItem('loginDataEmail')});
    }
  },[]); //[] para que se ejecute solo cuando se carga

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
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

  useEffect(() => {
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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header cart={cart} actualizarLogin = {actualizarLogin} login={login}actualizarLogin = {actualizarLogin} login={login}/>

          <div style={{ flex: '1' }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/resumen-pedido' element={<OrderSummary cart={cart} />} />
              <Route path='/info-pedido' element={<CheckoutForm cart={cart} />} />
              <Route path='/product-list' element={<Products products={products} />} />
              <Route path='/about-us' element={<AboutUs />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/order-history' element={<OrderHistory />} />
              <Route path='/order-details/:id' element={<OrderDetails />} />
              <Route path='/login' element={<Login actualizarLogin={actualizarLogin}/>} />
          <Route path='/login' element={<Login actualizarLogin={actualizarLogin}/>} />
          <Route path='*' element={<ErrorPage />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </CartContext.Provider>
    </>

  );
}

export default App;
