import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css'; // Importa el archivo CSS con los estilos

const ErrorPage = () => {
    return (
        <>
            <p className='text-center im mb-0 pb-0'>404</p>
            <div className="error-container">

                <div className="error-content">
                    <h2 className="error-heading">Página no encontrada</h2>
                    <p className="error-message"> Lo sentimos. La dirección web que has especificado no es una página activa de nuestra web. </p>
                    <p className="error-suggestion">Puedes regresar a la página principal haciendo clic <Link to="/">aquí</Link>.</p>
                </div>
            </div>
        </>
    );
}

export default ErrorPage;
