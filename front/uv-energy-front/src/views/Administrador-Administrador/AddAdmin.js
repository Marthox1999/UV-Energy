import React from "react";
import axios from 'axios';

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
import Cookies from 'universal-cookie';
import { withTranslation } from 'react-i18next';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')
const cookie = new Cookies();

class AddAdmin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            admin : {
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                is_active: true,
                cellphone: "",
                position: "ADMIN"
            },
            isAlertEmpty: false,
            isAlertSuccess: false,
            isBadinputs: false,
            credentials: cookie.get('notCredentials'),
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirsName = this.onChangeFirsName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeCellphone = this.onChangeCellphone.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.AddAdmin = this.AddAdmin.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    onChangeUsername(e){
        this.setState({ admin: {
                                    username: e.target.value,
                                    password: this.state.admin.password,
                                    email: this.state.admin.email,
                                    first_name: this.state.admin.first_name,
                                    last_name: this.state.admin.last_name,
                                    is_active: true,
                                    cellphone: this.state.admin.cellphone,
                                    position: "ADMIN"
                                }})
    }
    onChangePassword(e){
        this.setState({ admin: {
                                    username: this.state.admin.username,
                                    password: e.target.value,
                                    email: this.state.admin.email,
                                    first_name: this.state.admin.first_name,
                                    last_name: this.state.admin.last_name,
                                    is_active: true,
                                    cellphone: this.state.admin.cellphone,
                                    position: "ADMIN"
                                }})
    }
    onChangeEmail(e){
        this.setState({ admin: {
                                    username: this.state.admin.username,
                                    password: this.state.admin.password,
                                    email: e.target.value,
                                    first_name: this.state.admin.first_name,
                                    last_name: this.state.admin.last_name,
                                    is_active: true,
                                    cellphone: this.state.admin.cellphone,
                                    position: "ADMIN"
                                }})
    }
    onChangeFirsName(e){
        this.setState({ admin: {
                                    username: this.state.admin.username,
                                    password: this.state.admin.password,
                                    email: this.state.admin.email,
                                    first_name: e.target.value,
                                    last_name: this.state.admin.last_name,
                                    is_active: true,
                                    cellphone: this.state.admin.cellphone,
                                    position: "ADMIN"
                                }})
    }
    onChangeLastName(e){
        this.setState({ admin: {
                                    username: this.state.admin.username,
                                    password: this.state.admin.password,
                                    email: this.state.admin.email,
                                    first_name: this.state.admin.first_name,
                                    last_name: e.target.value,
                                    is_active: true,
                                    cellphone: this.state.admin.cellphone,
                                    position: "ADMIN"
                                }})
    }
    onChangeCellphone(e){
        this.setState({ admin: {
                                    username:this.state.admin.username,
                                    password: this.state.admin.password,
                                    email: this.state.admin.email,
                                    first_name: this.state.admin.first_name,
                                    last_name: this.state.admin.last_name,
                                    is_active: true,
                                    cellphone: e.target.value,
                                    position: "ADMIN"
                                }})
    }
    AddAdmin(e){
        e.preventDefault()
        if ((this.state.admin.username === "") ||
            (this.state.admin.password === "") ||
            (this.state.admin.email === "") ||
            (this.state.admin.first_name === "") ||
            (this.state.admin.last_name === "") ||
            (this.state.admin.cellphone === "")){
            console.log(this.state.admin)
            this.setState({isAlertEmpty: true, isAlertSuccess: false, isBadinputs: false})
        }else{
            axios.post(c.api + 'users/user/',
                       this.state.admin,
                       {headers: { Authorization: `Token ${this.state.credentials.token}`}})
            .then( response => {
                console.log(response)
                if (response.data.username !== ""){
                    this.setState({ isAlertSuccess: true,
                                    isAlertEmpty: false,
                                    isBadinputs: false,
                                    admin : response.data});
                }
            }).catch(error => {
                console.log(error)
                this.setState({ isAlertSuccess: false,
                                isAlertEmpty: false,
                                isBadinputs: true})
            })
        }
    }
    closeModal(){
        this.setState({ isAlertSuccess: !this.state.isAlertSuccess})
        window.location.reload(true);
    }
    render() {
        const { t } = this.props
        return(
            <>
            <UVHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <font size="5">{t("Admin.AddAdmin.1")}</font>
                        <br></br>
                        <font size="3">{this.props.location.pathname}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                        <strong>{t("Admin.Warning.1")}</strong> {t("Admin.EmptyFields.1")}
                    </Alert>
                    <Alert color="warning" isOpen={this.state.isBadinputs}>
                        <strong>{t("Admin.Warning.1")}</strong> {t("Admin.BadInputs.1")}
                    </Alert>
                    <Form onSubmit={this.AddAdmin}>
                        <h6 className="heading-small text-muted mb-4">
                            {t("Admin.PersonalInfo.1")}
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                {t("Admin.Name.1")}
                                </label>
                                <Input
                                required
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder={t("Admin.Name.1")}
                                type="text"
                                value={this.state.admin.first_name}
                                onChange={this.onChangeFirsName}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                {t("Admin.LastName.1")}
                                </label>
                                <Input
                                required
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder={t("Admin.LastName.1")}
                                type="text"
                                value={this.state.admin.last_name}
                                onChange={this.onChangeLastName}
                                />
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="col-md-12">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-phone-number"
                                >
                                {t("Admin.PhoneNumber.1")}
                                </label>
                                <Input
                                required
                                className="form-control-alternative"
                                id="input-phone-number"
                                placeholder={t("Admin.PhoneNumber.1")}
                                type="text"
                                value={this.state.admin.cellphone}
                                onChange={this.onChangeCellphone}
                                />
                            </FormGroup>
                            </Col>                        
                        </Row>
                        </div>
                        
                        <hr className="my-4"></hr>
                        <h6 className="heading-small text-muted mb-4">
                        {t("Admin.AccountInfo.1")}
                        </h6>
                        <div className="pl-lg-4">                        
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-username"
                                >
                                {t("Admin.Username.1")}
                                </label>
                                <Input
                                required
                                className="form-control-alternative"
                                id="input-username"
                                placeholder={t("Admin.Username.1")}
                                type="text"
                                value={this.state.admin.username}
                                onChange={this.onChangeUsername}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-email"
                                >
                                {t("Admin.Email.1")}
                                </label>
                                <Input
                                required
                                className="form-control-alternative"
                                id="input-email"
                                placeholder={t("Admin.EmailExample.1")}
                                type="email"
                                value={this.state.admin.email}
                                onChange={this.onChangeEmail}
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
                                {t("Admin.Password.1")}
                                </label>
                                <Input
                                required
                                className="form-control-alternative"
                                placeholder={t("Admin.Password.1")}
                                type="password" 
                                autoComplete="new-password"
                                value={this.state.admin.password}
                                onChange={this.onChangePassword}                               
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit">
                                {t("Admin.AddButton.1")}
                            </Button>
                        </div>
                        </div>
                    </Form>
                    </CardBody>
                </Card>
                <Modal
                    className="modal-dialog-centered"
                    color="success"
                    isOpen={this.state.isAlertSuccess}
                    >
                    <ModalBody>
                    <div className="modal-body">
                        <Alert color="success">
                        <strong>{t("Admin.Congrat.1")}</strong><br/>{t("Admin.Congrat.2")}
                        </Alert>
                        <strong>{t("Admin.Info.1")}</strong>
                        <br></br>
                        <strong> {t("Admin.Name.2")} </strong> {this.state.admin.first_name} {this.state.admin.last_name}<br/>
                        <strong> {t("Admin.PhoneNumber.2")} </strong> {this.state.admin.cellphone}<br/>
                        <strong> {t("Admin.Username.2")} </strong> {this.state.admin.username}<br/>
                        <strong> {t("Admin.Email.2")} </strong> {this.state.admin.email}
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.closeModal}
                        >
                        {t("Admin.CloseButton.1")}
                        </Button>
                    </div>
                </Modal>
            </Container>
            </>
        );
    }
}

export default withTranslation()(AddAdmin);