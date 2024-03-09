import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/UI/Header';
import Home from './Pages/Home';
import Footer from './Components/UI/Footer';

function App() {
  return (
    <>
    <Header />

    <Routes>
      <Route path='/' element={<Home />} />
      
    </Routes>

    <Footer />
    
    </>

  );
}

export default App;
