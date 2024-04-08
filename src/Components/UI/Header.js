import React, { useState } from "react";
import { Badge, Nav, Modal, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../Products/Cart";
import { useNavigate } from 'react-router-dom';
import "./Header.css";

const Header = (props) => {
  const navega = useNavigate();

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

  const isCartEmpty = () => {
    return props.cart.length === 0;
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    navega("/");
    props.actualizarLogin(false, {});
    alert("Ha cerrado sesión");
    return;
  }

  return (
    <>
      <div className="header">
        <Link to="/" className="header-logo">
          <Image src="../../../../Images/cesta-de-la-compra.png" alt="Abelki Logo" className="logo-image" />
          Abelki
        </Link>
        <Nav className="header-links">
          <Nav.Item as="li">
            <Link to="/">Inicio</Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Link to="/product-list">Lista de productos</Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Link to="/order-history">Historial de pedidos</Link>
          </Nav.Item>
          {props.login ? (<Nav.Item as="li">
            <Link onClick={logoutHandler}>Log out</Link>
          </Nav.Item>) : (<><Nav.Item as="li">
            <Link to="/login">Login</Link>
          </Nav.Item>
            <Nav.Item as="li">
              <Link to="/register">Register</Link>
            </Nav.Item></>)}
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
          {isCartEmpty() ? (
            <p>La cesta está vacía</p>
          ) : (
            <Cart cart={props.cart} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {!isCartEmpty() && (
            <Link to="/resumen-pedido">
              <Button variant="primary" onClick={handleToggleModal}>
                Realizar Pedido
              </Button>
            </Link>
          )}
          <Button variant="secondary" onClick={handleToggleModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
