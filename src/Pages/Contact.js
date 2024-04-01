
import React from 'react';
import './Contact.css'; // Importa el archivo CSS con los estilos

const Contact = () => {
    return (
        <div className="contact-container">
            <h2 className="contact-heading">Información de Contacto</h2>
            <div className="contact-info">
                <div className="contact-item">
                    <h3 className="contact-title">Dirección:</h3>
                    <p>Calle Mayor, Número 123</p>
                    <p>Pamplona, España</p>
                </div>
                <div className="contact-item">
                    <h3 className="contact-title">Teléfono:</h3>
                    <p>687 45 36 45</p>
                </div>
                <div className="contact-item">
                    <h3 className="contact-title">Correo Electrónico:</h3>
                    <p>abelki@supermercadoonline.com</p>
                </div>
                <div className="contact-item">
                    <h3 className="contact-title">Horario de Tienda Física:</h3>
                    <p>Lunes a Viernes: 9:00 AM - 7:00 PM</p>
                    <p>Sábado y Domingo: Cerrado</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
