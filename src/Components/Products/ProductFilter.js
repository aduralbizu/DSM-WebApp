import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import './ProductFilter.css'; // Importamos el archivo de estilos CSS

const ProductFilter = ({ products, setFilteredProducts }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    const filtered = products.filter(product => {
      const price = parseFloat(product.price);
      const min = minPrice !== '' ? parseFloat(minPrice) : Number.MIN_VALUE;
      const max = maxPrice !== '' ? parseFloat(maxPrice) : Number.MAX_VALUE;
      return price >= min && price <= max;
    });
    setFilteredProducts(filtered);
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setFilteredProducts(products);
  };

  return (
    <Form className="product-filter">
      <InputGroup>
        <Form.Control
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          
        />
        
        <InputGroup.Text>-</InputGroup.Text>
        <Form.Control
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
        <Button variant="primary" onClick={handleFilter}>Filtrar</Button>
        <Button variant="secondary" onClick={handleReset}>Limpiar</Button>
      </InputGroup>
    </Form>
  );
};

export default ProductFilter;
