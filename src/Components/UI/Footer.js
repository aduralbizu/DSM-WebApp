import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <ul className="footer-links">
                <li><Link to='/about-us'>Sobre nosotros</Link></li>
                <li><Link to='/contact'>Contacto</Link></li>
            </ul>
            <p>&copy; 2024 Abelki</p>
        </footer>
    );
}

export default Footer;
