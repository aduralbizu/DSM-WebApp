import { Button, Container, Col, Row, Form } from "react-bootstrap";
import './CheckoutForm.css'
import { useState } from "react";
import axios from "axios";

const CheckoutForm = (props) => {

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [direccion, setdireccion] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [provincia, setProvincia] = useState('');
    const [pais, setPais] = useState('');

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

        const infoCliente = {
            apellidos: apellidos,
            codigoPostal: codigoPostal,
            direccion: direccion,
            nombre: nombre,
            numeroTelefono: numeroTelefono,
            pais: pais,
            provincia: provincia
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

    }


    return (
        <>
            <Container className="my-4 px-0 ">
                <p className="fs-4 fw-medium py-0 my-0">Tramitar pedido</p>
            </Container>
            <Form onSubmit={submitHandler}>
                <Container className="contenedorInfo my-4 px-4 py-3">
                    <p className="fs-5 fw-medium py-0 my-0">Datos del comprador</p>
                    <Row>
                        <Col><Form.Label className="my-2">Nombre</Form.Label>
                            <Form.Control onChange={nombreHandler} required type="text" placeholder="Nombre" value={nombre} />
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
                            <Form.Select onChange={paisHandler} type="text" value={pais} aria-label="Default select example" required>
                                <option >Seleccione país</option>
                                <option value="España">España</option>
                                <option value="Francia">Francia</option>
                                <option value="Portugal">Portugal</option>
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
                    <Button className="mx-3" type="submit" variant="warning">Enviar pedido</Button>
                </Container>
            </Form>
        </>
    );
}

export default CheckoutForm;
