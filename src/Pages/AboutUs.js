import React from 'react';
import './AboutUs.css'; // Importa el archivo CSS con los estilos
import { Image } from "react-bootstrap";

const AboutUs = () => {

    <h4 className='textHome'>Disponga de los mejores productos al mejor precio.</h4>

    return (
        <div className="about-us-container">
            <h1 className="textHome">SOBRE NOSOTROS</h1>
            <h5 className="textHome">
                Somos una empresa dedicada a proporcionar alimentos frescos y de calidad a nuestros clientes. 
                Nuestra historia se remonta a más de una década, cuando comenzamos como un pequeño negocio familiar 
                en el corazón de la comunidad. Desde entonces, hemos crecido y nos hemos expandido, pero siempre 
                hemos mantenido nuestro compromiso con la calidad y la satisfacción del cliente.
            </h5>
            <h5 className="textHome">
                En nuestra empresa, creemos en apoyar a la agricultura local y sostenible. Trabajamos en estrecha 
                colaboración con agricultores locales para ofrecer productos frescos y de temporada a nuestros clientes. 
                Creemos en la importancia de conocer de dónde provienen nuestros alimentos y en mantener una relación 
                cercana con nuestros proveedores.
            </h5>
            <h5 className="textHome">
                Nos enorgullece ser una empresa comprometida con la comunidad y el medio ambiente. 
                Nuestro equipo está formado por personas apasionadas por la alimentación y la agricultura, 
                y nos esforzamos por ofrecer el mejor servicio posible a nuestros clientes.
            </h5>
            <div className="about-us-image">
                <Image src="../../../Images/eko.png" alt="Imagen sobre nosotros" />
            </div>
        </div>
    );
}

export default AboutUs;
