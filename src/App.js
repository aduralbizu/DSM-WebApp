import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/UI/Header';
import Home from './Pages/Home';
import Footer from './Components/UI/Footer';
import ProductList from './Pages/ProductList';
import ErrorPage from './Pages/ErrorPage';

function App() {
  return (
    <>
    <Header />

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product-list' element={<ProductList/>} />
      <Route path='*' element={<ErrorPage/>} />
    </Routes>

    <Footer />
    
    </>

  );
}

export default App;
