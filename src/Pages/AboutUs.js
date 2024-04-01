import React from 'react';
import './AboutUs.css'; // Importa el archivo CSS con los estilos

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h2 className="about-us-heading">SOBRE NOSOTROS</h2>
            <p className="about-us-text">
                Somos una empresa dedicada a proporcionar alimentos frescos y de calidad a nuestros clientes. 
                Nuestra historia se remonta a más de una década, cuando comenzamos como un pequeño negocio familiar 
                en el corazón de la comunidad. Desde entonces, hemos crecido y nos hemos expandido, pero siempre 
                hemos mantenido nuestro compromiso con la calidad y la satisfacción del cliente.
            </p>
            <p className="about-us-text">
                En nuestra empresa, creemos en apoyar a la agricultura local y sostenible. Trabajamos en estrecha 
                colaboración con agricultores locales para ofrecer productos frescos y de temporada a nuestros clientes. 
                Creemos en la importancia de conocer de dónde provienen nuestros alimentos y en mantener una relación 
                cercana con nuestros proveedores.
            </p>
            <p className="about-us-text">
                Nos enorgullece ser una empresa comprometida con la comunidad y el medio ambiente. 
                Nuestro equipo está formado por personas apasionadas por la alimentación y la agricultura, 
                y nos esforzamos por ofrecer el mejor servicio posible a nuestros clientes.
            </p>
        </div>
    );
}

export default AboutUs;
