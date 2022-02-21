import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Funcionarios from './pages/Funcionarios';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/Login" exact component={Login} />
                <Route path="/Cadastro" component={Cadastro} />
                <Route path="/Funcionarios" component={Funcionarios} />
            </Switch>        
        </BrowserRouter>
    );
};

export default Routes;