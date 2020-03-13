import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';

// reactstrap components
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
  ModalBody
} from "reactstrap";

import 'leaflet/dist/leaflet.css';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')
const cookie = new Cookies();

class RUDDAdminM extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            admin : {
                id: this.props.location.state.adminID,
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                is_active: true,
                cellphone: "",
                position: "ADMIN"
            },
            credentials: cookie.get('notCredentials'),            
        }        
    }
    componentDidMount(){
        axios.get(c.api + 'users/user/'+this.state.admin.id+'/',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert("Wrong Id")
              }
              else{
                this.setState({admin: response.data})
            }             
        }).catch(error => alert(error))
    }    
    render() {
        return(
            <>
            <UVHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">{this.state.admin.first_name} Information</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={this.AddAdmin}>
                            <h6 className="heading-small text-muted mb-4">
                            </h6>
                            <div className="pl-lg-4">                            
                                <Row>
                                    <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-first-name"
                                        >
                                        Name
                                        </label>
                                        <Input
                                        readOnly
                                        className="form-control-alternative"
                                        id="input-first-name"
                                        placeholder="Name"
                                        type="text"
                                        value={this.state.admin.first_name}
                                        />
                                    </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-last-name"
                                        >
                                        Last Name
                                        </label>
                                        <Input
                                        readOnly
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="Last Name"
                                        type="text"
                                        value={this.state.admin.last_name}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-phone-number"
                                        >
                                        Phone Number
                                        </label>
                                        <Input
                                        readOnly
                                        className="form-control-alternative"
                                        id="input-phone-number"
                                        placeholder="Phone Number"
                                        type="text"
                                        value={this.state.admin.cellphone}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                            </div>

                            <hr className="my-4"></hr>
                            <h6 className="heading-small text-muted mb-4">
                            Account Information
                            </h6>
                            <div className="pl-lg-4">                        
                                <Row>
                                    <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-username"
                                        >
                                        Username
                                        </label>
                                        <Input
                                        readOnly
                                        className="form-control-alternative"
                                        id="input-username"
                                        placeholder="Username"
                                        type="text"                                
                                        value={this.state.admin.username}
                                        />
                                    </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-email"
                                        >
                                        Email 
                                        </label>
                                        <Input
                                        readOnly
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="jesse@example.com"
                                        type="email"
                                        value={this.state.admin.email}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-md-12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-password"
                                        >
                                        Password
                                        </label>
                                        <Input
                                        readOnly 
                                        className="form-control-alternative"
                                        placeholder="Password" 
                                        type="password" 
                                        autoComplete="new-password"
                                        value={this.state.adminPassword}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </CardBody>
                </Card>                
            </Container>
            </>
        );
    }
}

export default RUDDAdminM;