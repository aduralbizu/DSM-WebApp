import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/UI/Header';
import Home from './Pages/Home';
import Footer from './Components/UI/Footer';
import ProductList from './Pages/ProductList';
import ErrorPage from './Pages/ErrorPage';
import { useState } from 'react';


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
      }
    ]
  )

  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (productId) => {
    // Buscar el producto en la lista de productos
    const product = products.find(product => product.id === productId); // productId: es del producto concreto en Product.js
    // Agregar el producto al carrito
    setCart([...cart, product]);
  };

  // Función para quitar un producto del carrito
  const removeFromCart = (productId) => {
    // Filtrar el carrito para eliminar el producto con el ID especificado
    const updatedCart = cart.filter(item => item.id !== productId);
    // Actualizar el estado del carrito
    setCart(updatedCart);
  };

  return (
    <>
      <Header cart={cart}/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product-list'
          element={<ProductList
            products={products}
            addToCart={addToCart}
            removeFromCart={removeFromCart} />
          }

        />

        <Route path='*' element={<ErrorPage />} />
      </Routes>

    

      <Footer />

    </>

  );
}

export default App;
