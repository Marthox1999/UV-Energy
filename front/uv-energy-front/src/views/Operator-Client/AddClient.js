import React from "react";

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
// core components
import UVHeader from "components/Headers/UVHeader.js";
import Axios from "axios";
import { withTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

const c = require('../constants')
const cookie = new Cookies();

class AddClient extends React.Component {
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
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUsername= this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCellphone = this.onChangeCellphone.bind(this);
        this.AddManager = this.AddManager.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    onChangeFirstName(e){
        this.setState({ user: {
            username: this.state.user.username,
            password: this.state.user.password,
            email: this.state.user.email,
            first_name: e.target.value,
            last_name: this.state.user.last_name,
            is_active: true,
            cellphone: this.state.user.cellphone,
            position: "CLT"
        }})
    }
    onChangeLastName(e){
        this.setState({ user: {
            username: this.state.user.username,
            password: this.state.user.password,
            email: this.state.user.email,
            first_name: this.state.user.first_name,
            last_name: e.target.value,
            is_active: true,
            cellphone: this.state.user.cellphone,
            position: "CLT"
        }})
    }
    onChangeUsername(e){
        this.setState({ user: {
            username: e.target.value,
            password: this.state.user.password,
            email: this.state.user.email,
            first_name: this.state.user.first_name,
            last_name: this.state.user.last_name,
            is_active: true,
            cellphone: this.state.user.cellphone,
            position: "CLT"
        }})
    }
    onChangeEmail(e){
        this.setState({ user: {
            username: this.state.user.username,
            password: this.state.user.password,
            email: e.target.value,
            first_name: this.state.user.first_name,
            last_name: this.state.user.last_name,
            is_active: true,
            cellphone: this.state.user.cellphone,
            position: "CLT"
        }}) 
    }
    onChangePassword(e){
        this.setState({ user: {
            username: this.state.user.username,
            password: e.target.value,
            email: this.state.user.email,
            first_name: this.state.user.first_name,
            last_name: this.state.user.last_name,
            is_active: true,
            cellphone: this.state.user.cellphone,
            position: "CLT"
        }})
    }
    onChangeCellphone(e){
        this.setState({ user: {
            username: this.state.user.username,
            password: this.state.user.password,
            email: this.state.user.email,
            first_name: this.state.user.first_name,
            last_name: this.state.user.last_name,
            is_active: true,
            cellphone: e.target.value.toString(),
            position: "CLT"
        }}) 
    }
    AddManager(e){
        e.preventDefault()
        if ((this.state.user.username === "") ||
            (this.state.user.password === "") ||
            (this.state.user.email === "") ||
            (this.state.user.first_name === "") ||
            (this.state.user.last_name === "") ||
            (this.state.user.cellphone === "")){
            this.setState({isAlertEmpty: true, isAlertSuccess: false, isBadinputs: false})
        }else{
            console.log(this.state.user)
            Axios.post(c.api + 'users/user/', this.state.user,
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
            .then( response => {
                this.setState({ isAlertEmpty: false,
                                isAlertSuccess: true,
                                isBadinputs: false,
                                user: response.data})
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
                        <font size="5">{t("Client.AddClient.1")}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                        <strong>{t("Client.Warning.1")}</strong> {t("Client.EmptyFields.1")}
                    </Alert>
                    <Alert color="warning" isOpen={this.state.isBadinputs}>
                    <strong>{t("Client.Warning.1")}</strong> {t("Client.BadInputs.1")}
                    </Alert>
                    <Form onSubmit={this.AddManager}>
                        <h6 className="heading-small text-muted mb-4">
                        {t("Manager.PersonalInformation.1")}
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                {t("Client.Name.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder={t("Client.Name.1")}
                                type="text"
                                value={this.state.user.first_name}
                                onChange={this.onChangeFirstName}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                {t("Client.LastName.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder={t("Client.LastName.1")}
                                type="text"
                                value={this.state.user.last_name}
                                onChange={this.onChangeLastName}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-id"
                                >
                                {t("Client.Phone.1")}
                                </label>
                                <Input 
                                className="form-control-alternative"
                                id="input-cellphone"
                                placeholder={t("Client.Phone.1")}
                                type={t("Client.Phone.1")}
                                value={this.state.user.cellphone}
                                onChange={this.onChangeCellphone}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <hr className="my-4"></hr>
                        <h6 className="heading-small text-muted mb-4">
                        {t("Client.AccountInformation.1")}
                        </h6>
                        <div className="pl-lg-4"></div>
                        <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-username"
                                >
                                {t("Manager.Username.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder={t("Manager.Username.1")}
                                type="text"
                                value={this.state.user.username}
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
                                Email 
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-email"
                                placeholder="jesse@example.com"
                                type="email"
                                value={this.state.user.email}
                                onChange={this.onChangeEmail}
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
                                {t("Client.Password.1")}
                                </label>
                                <Input 
                                className="form-control-alternative"
                                placeholder={t("Client.Password.1")}
                                type="password" 
                                autoComplete="new-password"
                                value={this.state.user.password}
                                onChange={this.onChangePassword}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit">
                            {t("Client.Add.1")}
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
                        <strong>{t("Client.Congratulations.1")}!</strong><br/>{t("Client.CreateSuccesfull.1")}
                        </Alert>
                        <strong>{t("Client.Information.1")}:</strong>
                        <br></br>
                        <strong> {t("Client.Name.1")}: </strong> {this.state.user.first_name}<br/>
                        <strong> {t("Client.LastName.1")}: </strong> {this.state.user.last_name}<br/>
                        <strong> {t("Client.Phone.1")}: </strong> {this.state.user.cellphone}<br/>
                        <strong> Email: </strong> {this.state.user.email}<br/>
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.closeModal}
                        >
                        {t("Client.Close.1")}
                        </Button>
                    </div>
            </Modal>
            </Container>
            </>
        );
    }
}

export default withTranslation()(AddClient);