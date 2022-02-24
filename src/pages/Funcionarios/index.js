import React, { useState } from 'react';
import { Button, Modal, Row, Table, Col, Container } from 'react-bootstrap';

function Funcionarios() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (val) => {
        setShow(true);
        var A = JSON.parse(localStorage.getItem('Funcionarios'))
        A.map((Y) => {
            if (Y.id === val) {
                localStorage.setItem('edit', JSON.stringify(Y))
            }
        })
    }
    return (
        <Container>
            <Row>
                <Col><h1>Funcionários</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Nome</th>
                                <th>Cidade</th>
                                <th>Cargo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(JSON.parse(localStorage.getItem('Funcionarios'))).map(x => {
                                return (
                                    <tr>
                                        <td>
                                            <Button variant="danger">Excluir</Button>
                                        </td>
                                        <td>
                                            <Button onClick={() => handleShow(x.id)} variant="info">Editar</Button>
                                        </td>
                                        <td>{x.nome}</td>
                                        <td>{x.cidade}</td>
                                        <td>{x.cargo}</td>
                                    </tr>
                                )
                            })}


                        </tbody>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Alterar dados</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                    {
                                      console.log(JSON.parse(localStorage.getItem('edit')))
                                    }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Fechar
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Salvar alterações
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </Table></Col>
            </Row>
        </Container>


    );
};

export default Funcionarios;