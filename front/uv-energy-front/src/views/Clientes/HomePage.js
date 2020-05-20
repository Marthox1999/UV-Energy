import React from "react";
// reactstrap components
// core components
import UVHeader from "components/Headers/UVHeader.js";
import { withTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import i18n from '../../i18n.js';

import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Alert,
    Modal,
    ModalBody,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Media,
    UncontrolledDropdown,
  } from "reactstrap";

/*const c = require('../constants')*/
const cookie = new Cookies();
/*
<h2>
A su izquierda podra encontrar las funcionaliades del usuario ingresado
<img
alt="..."
src={require("assets/img/theme/apple-icon.png")}
/>
</h2>
*/
class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                is_active: true,
                cellphone: "",
                position: "CLT"
            },
            isAlertEmpty: false,
            isAlertSuccess: false,
            isBadinputs: false,
            credentials: cookie.get('notCredentials'),
        }
    }

    render() {
        const { t } = this.props
        return(
            <>
            <UVHeader/>
                
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <center>
                        <font size="5">Bienvenido</font>
                    </center>
                    </CardHeader>
                    <center>
                    <img
                        alt="..."
                        src={require("assets/img/theme/apple-icon.png")}
                        />
                    </center>
                    <CardBody>
                    <center>
                        <font size="5">
                            A su izquierda podra encontrar las funcionalidades del usuario ingresado
                        </font>
                    </center>
                    </CardBody>
                </Card>
                
            </Container>
            </>
        );
    }
}

export default withTranslation()(HomePage);