import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  DropdownMenu,
  UncontrolledDropdown,
  Media,
  DropdownToggle,
  DropdownItem
} from "reactstrap";
// core components
import UVHeader from "components/Headers/UVHeader.js";


class ModifyManager extends React.Component {
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
                        <h3 className="mb-0">Modificar Gerente</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form>
                    <FormGroup>
                                <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0">
                                <Media className="align-items-center" >
                                    <span className="mb-0 text-sm font-weight-bold">
                                        Gerente  
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle" style={{ background: 'none'}}>
                                    </span>
                                </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem className="noti-title" header tag="div">
                                    <h6 className="text-overflow m-0">Gerentes</h6>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile">
                                    <i className="ni ni-single-02" />
                                    <span>Gerente 1 </span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile">
                                    <i className="ni ni-single-02s" />
                                    <span>Gerente 2</span>
                                </DropdownItem>
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                        <h6 className="heading-small text-muted mb-4">
                        Seleccione el Gerente
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                <FormGroup>
                                    <label 
                                    for="exampleFormControlSelect1"
                                    >
                                    Seleccione el Gerente
                                    </label>
                                    <select class="form-control" id="exampleFormControlSelect1">
                                    </select>
                                </FormGroup>
                                </Col>
                            </Row>
                            
                        </div>
                    </Form>
                    
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                        Informacion Personal
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Nombre
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder="Nombre"
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                Apellido
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder="Apellido"
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                        </Row>
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
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Username"
                                type="text"
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
                                className="form-control-alternative"
                                id="input-email"
                                placeholder="jesse@example.com"
                                type="email"
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-password"
                                >
                                Contrasena
                                </label>
                                <Input 
                                className="form-control-alternative"
                                placeholder="Password" 
                                type="password" 
                                autoComplete="new-password"/>
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-id"
                                >
                                Cedula
                                </label>
                                <Input 
                                className="form-control-alternative"
                                id="input-id"
                                placeholder="1234"
                                type="id"/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="button">
                                Modificar
                            </Button>
                            <Button className="mt-4" color="primary" type="button">
                                Desactivar
                            </Button>
                            <Button className="mt-4" color="primary" type="button">
                                Eliminar
                            </Button>
                        </div>
                        </div>
                    </Form>
                    </CardBody>
                </Card>
            </Container>
            </>
        );
    }
}

export default ModifyManager;