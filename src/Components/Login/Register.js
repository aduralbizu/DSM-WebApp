import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from "axios";

const Register = (props) => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const navega = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault(); //Para que no se recargue la página
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        } 
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMe4ROALWXO4waAXSwlyhgdXAJ4lQyWQU',authData)
        .then((response)=>{
            console.log(response);
            props.actualizarLogin(true,response.data); //nos hemos loggeado
            alert("Se ha registrado correctamente.");
            navega("/"); //Vamos una página hacia atrás
        })
        .catch((error)=>{
            alert('Error.');
        })
    }

    const cancelarHandler = () => { 
        navega("/"); //Lo redirigimos a home
    }

    return (
        <>
            <Container className="my-5 px-5 py-3 containerLogin ">
                <Row className="p-0 m-0"><p className="p-0 fs-2 mb-0">Registrarse.</p></Row>
                <Form onSubmit={submitHandler}>
                    <Row className="my-2"><Form.Label>Email: </Form.Label>
                        <Form.Control onChange={(event) => setEmail(event.target.value)} type="email" value={email} required/></Row>
                    <Row className="my-2"><Form.Label>Password: </Form.Label>
                        <Form.Control onChange={(event) => setpassword(event.target.value)} type="password" value={password} required/></Row>
                    <Row>
                        <Col className="text-center mt-3">
                            <Button className="mx-2" type="submit" variant="warning">REGISTER</Button>
                            <Button className="mx-2" variant="secondary" onClick={cancelarHandler}>CANCELAR</Button>
                        </Col>
                    </Row>
                    {/* <Col><Button variant="warning" onClick={logoutHandler}>LOGOUT</Button></Col> */}

                </Form >
            </Container>

        </>
    );
}

export default Register