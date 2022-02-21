import React, { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';

function Cadastro() {
    const [distritos, setDistritos] = useState([]);

    const [selectedCidade, setCidade] = useState('');
    const [selectedNome, setNome] = useState('');
    const [selectedCargo, setCargo] = useState('');

    useEffect(() => { //https://servicodados.ibge.gov.br/api/v1/localidades/estados
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
            .then(res => res.json())
            .then(result => setDistritos(result))
    }, [])

    const cadFuncionarios = (x) => {
        console.log(x)
    }

    return (
        <Row className="justify-content-md-center">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control onKeyPress={cadFuncionarios('s')} type="text" placeholder="Digite o nome" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Cidade {'\n'}</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Selecione a cidade</option>
                        {distritos.length > 0 ? distritos.map(x => {
                            return (<option value={x.nome} key={x.id}>{x.nome}</option>)
                        }) : null}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control type="text" placeholder="Digite o cargo" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
        </Row>

    );


};

export default Cadastro;