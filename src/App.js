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
        image: 'imagen1',
        details: "Las patatas más crujientes del mercado, ahora a un precio mejor."
      },
      {
        id: Math.random().toString(),
        name: 'Manzana',
        price: 0.15,
        image: 'imagen2',
        details: "Estas manzanas son tan sanas que mantendrán al médico alejado."
      },
      {
        id: Math.random().toString(),
        name: 'Botella 1L AOVE',
        price: 4,
        image: 'imagen3',
        details: "El único aceite de oliva virgen extra que no se vende a 8€ el litro."
      }, {
        id: Math.random().toString(),
        name: 'Galletas',
        price: 2.25,
        image: 'imagen1',
        details: "Galletas sin chocolate, para tomar con el desayuno, comida o merienda."
      },
      {
        id: Math.random().toString(),
        name: 'Cerveza',
        price: 1,
        image: 'imagen2',
        details: "Cerveza rubia Pilsen. De origen 100% local. "
      },
      {
        id: Math.random().toString(),
        name: 'Agua mineral',
        price: 1,
        image: 'imagen3',
        details: "Agua de mineralización muy débil, de los manantiales de la meseta."
      }, {
        id: Math.random().toString(),
        name: 'Zumo de naranja',
        price: 1.15,
        image: 'imagen1',
        details: "Zumo de naranjas de valencia sin pulpa. Cero azucares o edulcorantes añadidos."
      },
      {
        id: Math.random().toString(),
        name: 'Chocolate',
        price: 0.15,
        image: 'imagen2',
        details: "Chocolate 70%, de origen sostenible. Cero azucares añadidos."
      },
      {
        id: Math.random().toString(),
        name: 'Queso Idiazabal',
        price: 4,
        image: 'imagen3',
        details: "El mejor queso de Navarra, kilometro 0. Nafarroako gaztarik hoberena, bertakoa."
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

          <Route path='*' element={<ErrorPage />} />
        </Routes>



        <Footer />
      </CartContext.Provider >

    </>

  );
}

export default App;
