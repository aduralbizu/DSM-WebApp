// Página principal
import Carousel from 'react-bootstrap/Carousel';
import { Container, Image } from "react-bootstrap";
import './Home.css'

const Home = () => {
    return (
        <>
            <Container className='mt-4 mb-4'>
                <h1>¡Bienvenido!</h1>
                <h4 className='textHome'>Disponga de los mejores productos al mejor precio.</h4>
            </Container>
            <Container className='mb-3'>
                <Carousel>
                    <Carousel.Item>
                        <Image className='imagenCarousel' alt='primera' src='../../../../Images/supermarket.jpg'></Image>
                        <Carousel.Caption>
                            <h3>La mejor calidad</h3>
                            <p>Vendemos solamente productos naturales sin pesticidas.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image className='imagenCarousel' alt='segunda' src='../../../../Images/km0.jpg'></Image>
                        <Carousel.Caption>
                            <h3>De km 0</h3>
                            <p>Nos preocupamos en apoyar el comercio local.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image className='imagenCarousel' alt='tercera' src='../../../../Images/affordableFood.jpg'></Image>
                        <Carousel.Caption>
                            <h3>Precios razonables</h3>
                            <p>
                                Nos aseguramos de que nuestros precios sean alcanzables para todo el mundo.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

        </>
    )
}

export default Home;