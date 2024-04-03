import React, { useState } from "react";
import { Badge, Nav, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../Products/Cart";
import "./Header.css";

const Header = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const calculateUds = () => {
    let uds = 0;
    props.cart.forEach((item) => {
      uds += item.quantity;
    });
    return uds;
  };

  return (
    <>
      <div className="header">
        <Link to="/" className="header-logo">
          Abelki
        </Link>
        <Nav className="header-links">
          <Nav.Item as="li">
            <Link to="/">Inicio |</Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Link to="/product-list">Lista de productos |</Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Link to="/order-history">Historial de pedidos</Link>
          </Nav.Item>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link onClick={handleToggleModal} style={{ marginRight: "10px" }}>
              🛒 Carrito <Badge variant="primary">{calculateUds()}</Badge>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      <Modal show={showModal} onHide={handleToggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cesta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart cart={props.cart} />
        </Modal.Body>
        <Modal.Footer>
          <Link to="/resumen-pedido">
            <Button variant="primary" onClick={handleToggleModal}>Realizar Pedido</Button>
          </Link>
          <Button variant="secondary" onClick={handleToggleModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
