
import React from 'react';
import './Contact.css'; // Importa el archivo CSS con los estilos
import { Container, Row, Col, Image } from "react-bootstrap";

const Contact = () => {
    return (
        <>


            <Container className='contact-container'>
                <Row>
                    
                    <Col>
                    <p className='h1' >Información de Contacto</p>

                        <Container className="contact-info">
                            <Row className='contact-item'>
                                <h3 className="contact-title">Dirección:</h3>
                                <p>Calle Mayor, Número 123</p>
                                <p>Pamplona, España</p>
                            </Row>

                            <Row className='contact-item'>
                                <h3 className="contact-title">Teléfono:</h3>
                                <p>687 45 36 45</p>
                            </Row>

                            <Row className='contact-item'>
                                <h3 className="contact-title">Correo Electrónico:</h3>
                                <p>abelki@supermercadoonline.com</p>
                            </Row>

                            <Row className='contact-item'>
                                <h3 className="contact-title">Horario de Tienda Física:</h3>
                                <p>Lunes a Viernes: 9:00 AM - 7:00 PM</p>
                                <p>Sábado: 10:00 AM - 2:00 PM</p>
                                <p>Domingo: Cerrado</p>
                            </Row>
                        </Container>
                    </Col>

                    <Col>
                        <Image className="image" alt='primera' src='../../../../Images/horario.png'></Image>

                    </Col>
                </Row>

            </Container>


        </>






    );
};

export default Contact;
