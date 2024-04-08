import { Button, Container, Col, Row, Form, Image } from "react-bootstrap";
import './CheckoutForm.css'
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../Contexts/CartContext";

const CheckoutForm = (props) => {

    const nombreRef = useRef(); //Esta variable va a ser un puntero. Es lo que estamos diciendo.

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                // Ordenar la lista de países por nombre común
                const sortedCountries = response.data.sort((a, b) => {
                    const countryA = a.name.common.toLowerCase();
                    const countryB = b.name.common.toLowerCase();
                    if (countryA < countryB) {
                        return -1;
                    }
                    if (countryA > countryB) {
                        return 1;
                    }
                    return 0;
                });
                setCountries(sortedCountries);
            })
            .catch(error => {
                console.error('Error al obtener la lista de países:', error);
            });
    }, []);

    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [direccion, setdireccion] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [provincia, setProvincia] = useState('');
    const [pais, setPais] = useState('');

    const [completed, setcompleted] = useState(false);

    const [countries, setCountries] = useState([]);


    const cartContext = useContext(CartContext);

    const nombreHandler = (event) => {
        setNombre(event.target.value);
    }

    const apellidosHandler = (event) => {
        setApellidos(event.target.value);
    }

    const numeroTelefonoHandler = (event) => {
        setNumeroTelefono(event.target.value);
    }

    const direccionHandler = (event) => {
        setdireccion(event.target.value);
    }

    const codigoPostalHandler = (event) => {
        setCodigoPostal(event.target.value);
    }

    const provinciaHandler = (event) => {
        setProvincia(event.target.value);
    }

    const paisHandler = (event) => {
        setPais(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        // Validation checks
        if (!isNaN(nombre)) { //trim elimina whitespaces a ambos lados del string
            alert('Nombre debe ser de tipo string');
            return;
        }

        if (!isNaN(nombre)) {
            alert('Apellidos debe ser de tipo string');
            return;
        }

        let numeroTelefonoTrimmed = numeroTelefono.trim();
        const numeroTelefonoRegex = /^\d{9}$/;
        if (isNaN(numeroTelefonoTrimmed) || !numeroTelefonoRegex.test(numeroTelefonoTrimmed)) {
            alert('Numero Telefono debe ser un de 9 dígitos');
            return;
        }

        let codigoPostalTrimmed = codigoPostal.trim();
        const codigoPostalRegex = /^\d{5}$/;
        if (isNaN(codigoPostalTrimmed) || !codigoPostalRegex.test(codigoPostalTrimmed)) {
            alert('Código Postal debe ser un numero de 5 dígitos');
            return;
        }
        if (!isNaN(provincia)) {
            alert('Provincia debe ser de tipo string');
            return;
        }

        if (typeof pais !== 'string') {
            alert('Pais debe ser de tipo string');
            return;
        }

        const infoCliente = {
            apellidos: apellidos,
            codigoPostal: codigoPostal,
            direccion: direccion,
            nombre: nombre,
            numeroTelefono: numeroTelefono,
            pais: pais,
            provincia: provincia,
            fechaPedido: new Date(),
            cuentaCorreo: "pepe@gmail.com"
        }

        var resumenPedido = [];

        props.cart.map((x) => {
            var pedido = {
                id: x.id,
                price: x.price,
                quantity: x.quantity
            }
            resumenPedido.push(
                pedido
            )
        })

        if (resumenPedido.length == 0) {
            alert("El carrito está vacío, no se puede hacer la petición.");
            navigate("/");
            return;
        }

        const producto = {
            infoCliente,
            resumenPedido
        }

        axios.post('https://dsm-webapp-default-rtdb.europe-west1.firebasedatabase.app/historial.json', producto)
            .then((response) => {
                console.log("El producto se ha insertado en la BD");
            })
            .catch((error) => {
                alert("Se ha producido un error");
            })

        cartContext.clearCart(); //Vaciamos el carrito
        setcompleted(true); //Pasamos  ventana de agradecimientos


    }


    let contenido = <>
        <Container className="my-4 px-0 ">
            <p className="fs-4 fw-medium py-0 my-0">Tramitar pedido</p>
        </Container>
        <Form onSubmit={submitHandler}>
            <Container className="contenedorInfo my-4 px-4 py-3">
                <p className="fs-5 fw-medium py-0 my-0">Datos del comprador</p>
                <Row>
                    <Col><Form.Label className="my-2">Nombre</Form.Label>
                        <Form.Control ref={nombreRef} onChange={nombreHandler} required type="text" placeholder="Nombre" value={nombre} />
                    </Col>
                    <Col><Form.Label className="my-2">Apellidos</Form.Label>
                        <Form.Control onChange={apellidosHandler} required type="text" placeholder="Apellidos" value={apellidos} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}><Form.Label className="my-2">Número de teléfono</Form.Label>
                        <Form.Control onChange={numeroTelefonoHandler} required type="tel" placeholder="948788956" value={numeroTelefono} />
                    </Col>
                </Row>

            </Container>

            <Container className="contenedorInfo my-4 px-4 py-3">
                <p className="fs-5 fw-medium my-2">Dirección de envío</p>
                <Row>
                    <Col xs={8}><Form.Label className="my-2">Direccion</Form.Label>
                        <Form.Control onChange={direccionHandler} required type="text" placeholder="Calle Iturralde, nº50, 2ºB" value={direccion} />
                    </Col>
                    <Col xs={4}><Form.Label className="my-2">Código postal</Form.Label>
                        <Form.Control onChange={codigoPostalHandler} required type="text" placeholder="31450" value={codigoPostal} />
                    </Col>
                </Row>
                <Row>
                    <Col><Form.Label className="my-2">Provincia</Form.Label>
                        <Form.Control onChange={provinciaHandler} type="text" placeholder="Navarra" value={provincia} required />
                    </Col>
                    <Col><Form.Label className="my-2">País</Form.Label>
                        <Form.Select onChange={paisHandler} value={pais} aria-label="Default select example" required>
                            <option>Seleccione país</option>
                            {countries.map(country => (
                                <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
                            ))}
                        </Form.Select>
                    </Col>

                </Row>
                <Row>
                    <Col className="mt-3">
                        <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                        />
                    </Col>
                </Row>
            </Container>

            <Container className="my-4 ">
                <Button className="ms-3 me-1" type="submit" variant="warning">REALIZAR PEDIDO</Button>
                <Link to="/resumen-pedido">
                    <Button className="mx-1" variant="secondary">ATRÁS</Button>
                </Link>
            </Container>
        </Form>
    </>;

    if (completed) contenido =
        <Container className="my-4 text-center">
            <p className="fs-5 fw-normal mb-2">¡Gracias por confiar en nosotros!</p>
            <p className="fs-5 fw-medium mb-2">En breve empezará a recibir noticias.</p>
            <div className="p-0 m-0">
                <Image className="imagenAgradecimiento" src="../../../../Images/van.jpg"></Image>
            </div>
            <Link to="/product-list">
                <Button className="mx-1 mt-4" variant="dark">REALIZAR UN NUEVO PEDIDO</Button>
            </Link>

        </Container>;

    return (
        <>
            {contenido}
        </>
    );
}

export default CheckoutForm;
