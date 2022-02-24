import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Table, Col, Container, Form } from 'react-bootstrap';

function Funcionarios() {
    const [distritos, setDistritos] = useState([]);
    const [selectedCidade, setCidade] = useState('');
    const [selectedNome, setNome] = useState('');
    const [selectedCargo, setCargo] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (val) => {
        setShow(true);
        var A = JSON.parse(localStorage.getItem('Funcionarios'))
        A.map((Y) => {
            if (Y.id === val) {
                localStorage.setItem('edit', '[' + JSON.stringify(Y) + ']')
            }
        })
    }
    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
            .then(res => res.json())
            .then(result => setDistritos(result))
    }, [])

    const SaveChanges=(obj)=>{
        var List=(JSON.parse(localStorage.getItem('Funcionarios')))
        List.map((z)=>{
           var Contador=0
            if (z.id===obj.id){
                List[Contador]=z
                localStorage.setItem('Funcionarios', JSON.stringify(List))
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
                                    (JSON.parse(localStorage.getItem('edit'))).map((a) => {
                                        return (
                                            <Form>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Nome</Form.Label>
                                                    <Form.Control onChange={(e) => setNome(e.target.value)} value={a.nome} type="text" placeholder="Digite o nome" />
                                                    <Form.Text className="text-muted">
                                                    </Form.Text>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>Cidade</Form.Label>
                                                    <Form.Select onChange={(e) => setCidade(e.target.value)} value={a.cidade} aria-label="Default select example">
                                                        <option>Selecione a cidade</option>
                                                        {distritos.length > 0 ? distritos.map(x => {
                                                            return (<option value={x.nome} key={x.id}>{x.nome}</option>)
                                                        }) : null}
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Cargo</Form.Label>
                                                    <Form.Control onChange={(e) => setCargo(e.target.value)} value={a.cargo} type="text" placeholder="Digite o cargo" />
                                                </Form.Group>
                                            </Form>

                                        )
                                    })
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Fechar
                                </Button>
                                <Button variant="primary" onClick={SaveChanges(JSON.parse(localStorage.getItem('edit')))}>
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