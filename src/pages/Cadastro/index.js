import React, { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';

function Cadastro() {
    const [distritos, setDistritos] = useState([]);
    const [selectedCidade, setCidade] = useState('');
    const [selectedNome, setNome] = useState('');
    const [selectedCargo, setCargo] = useState('');

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
            .then(res => res.json())
            .then(result => setDistritos(result))
    }, [])

    const cadFuncionarios = () => {
        var Create = {
            nome: selectedNome,
            cargo: selectedCargo,
            cidade: selectedCidade,
            id: Date.now()
        }

        if (localStorage.getItem('Funcionarios') === null) {
            var List = []
            List.push(Create)
            localStorage.setItem('Funcionarios', JSON.stringify(List))
        }
        else {
            var Get = JSON.parse(localStorage.getItem('Funcionarios'))
            Get.push(Create)
            console.log(Get)
            localStorage.setItem('Funcionarios', JSON.stringify(Get))
        }

    }

    return (
        <Row className="justify-content-md-center">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control onChange={(e) => setNome(e.target.value)} type="text" placeholder="Digite o nome" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Select onChange={(e) => setCidade(e.target.value)} aria-label="Default select example">
                        <option>Selecione a cidade</option>
                        {distritos.length > 0 ? distritos.map(x => {
                            return (<option value={x.nome} key={x.id}>{x.nome}</option>)
                        }) : null}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control onChange={(e) => setCargo(e.target.value)} type="text" placeholder="Digite o cargo" />
                </Form.Group>

                <Button onClick={(() => cadFuncionarios())} variant="primary">
                    Cadastrar
                </Button>
            </Form>
        </Row>

    );


};

export default Cadastro;