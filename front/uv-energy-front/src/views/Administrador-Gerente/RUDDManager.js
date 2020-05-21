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
  Alert
} from "reactstrap";

import 'leaflet/dist/leaflet.css';
import i18n from '../../i18n.js';
import { withTranslation } from 'react-i18next';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')
const cookie = new Cookies();

class RUDDManager extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.location.state)
        this.state = {
            manager : {
                id: this.props.location.state.managerID,
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                is_active: true,
                cellphone: "",
                position: "MGR"
            },
            managerData: {
                id: this.props.location.state.managerID,
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                is_active: true,
                cellphone: "",
                position: "MGR"
            },
            credentials: cookie.get('notCredentials'),
            managerPassword: "",
            isAlertEmpty: false,
            isAlertSuccess: false,
            isBadinputs: false,
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirsName = this.onChangeFirsName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeCellphone = this.onChangeCellphone.bind(this);

        this.ModfManager = this.ModfManager.bind(this);
        this.SubmitEvent = this.SubmitEvent.bind(this);

    }
    componentDidMount(){
        axios.get(c.api + 'users/user/'+this.state.manager.id+'/',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert(i18n.t("Manager.WrongId.1"))
              }
              else{
                console.log(response.data)
                this.setState({manager: response.data, managerData: response.data})
                console.log(this.state.listManagers)                
            }             
        }).catch(error => alert(error))
    }
    onChangeUsername(e){
        this.setState({ manager: {
                                    id: this.state.manager.id,
                                    username: e.target.value,
                                    password: this.state.manager.password,
                                    email: this.state.manager.email,
                                    first_name: this.state.manager.first_name,
                                    last_name: this.state.manager.last_name,
                                    is_active: true,
                                    cellphone: this.state.manager.cellphone,
                                    position: "MGR"
                                }})
    }
    onChangePassword(e){
        this.setState({ managerPassword: e.target.value })
    }
    onChangeEmail(e){
        this.setState({ manager: {
                                    id: this.state.manager.id,
                                    username: this.state.manager.username,
                                    password: this.state.manager.password,
                                    email: e.target.value,
                                    first_name: this.state.manager.first_name,
                                    last_name: this.state.manager.last_name,
                                    is_active: true,
                                    cellphone: this.state.manager.cellphone,
                                    position: "MGR"
                                }})
    }
    onChangeFirsName(e){
        this.setState({ manager: {
                                    id: this.state.manager.id,
                                    username: this.state.manager.username,
                                    password: this.state.manager.password,
                                    email: this.state.manager.email,
                                    first_name: e.target.value,
                                    last_name: this.state.manager.last_name,
                                    is_active: true,
                                    cellphone: this.state.manager.cellphone,
                                    position: "MGR"
                                }})
    }
    onChangeLastName(e){
        this.setState({ manager: {
                                    id: this.state.manager.id,
                                    username: this.state.manager.username,
                                    password: this.state.manager.password,
                                    email: this.state.manager.email,
                                    first_name: this.state.manager.first_name,
                                    last_name: e.target.value,
                                    is_active: true,
                                    cellphone: this.state.manager.cellphone,
                                    position: "MGR"
                                }})
    }
    onChangeCellphone(e){
        this.setState({ manager: {
                                    id: this.state.manager.id,
                                    username:this.state.manager.username,
                                    password: this.state.manager.password,
                                    email: this.state.manager.email,
                                    first_name: this.state.manager.first_name,
                                    last_name: this.state.manager.last_name,
                                    is_active: true,
                                    cellphone: e.target.value,
                                    position: "MGR"
                                }})
    }
    SubmitEvent(buttonVal){
        this.setState({ isAlertSuccess: true,
            isAlertEmpty: false,
            isBadinputs: false,
        });
        if(buttonVal===1){            
            console.log("Modify")
            if ((this.state.manager.username === "") ||
                (this.state.manager.password === "") ||
                (this.state.manager.email === "") ||
                (this.state.manager.first_name === "") ||
                (this.state.manager.last_name === "") ||
                (this.state.manager.cellphone === "")){

                this.setState({isAlertEmpty: true, isAlertSuccess: false, isBadinputs: false})
            }else{
                console.log(this.state.manager)
                if(this.state.managerPassword !== ""){
                    this.setState({ manager: {
                                            id: this.state.manager.id,
                                            username:this.state.manager.username,
                                            password: this.state.managerPassword,
                                            email: this.state.manager.email,
                                            first_name: this.state.manager.first_name,
                                            last_name: this.state.manager.last_name,
                                            is_active: true,
                                            cellphone: this.state.manager.cellphone,
                                            position: "MGR"
                                        }})
                }
                axios.put(c.api + 'users/user/'+this.state.manager.id+'/',
                        this.state.manager,
                        {headers: { Authorization: `Token ${this.state.credentials.token}`}})
                .then( response => {
                    console.log(response)
                    if ((response.data.password === this.state.managerData.password) ||
                        (response.data.email === this.state.managerData.email) ||
                        (response.data.first_name === this.state.managerData.first_name) ||
                        (response.data.last_name === this.state.managerData.last_name) ||
                        (response.data.cellphone === this.state.managerData.cellphone)
                        ){
                        this.setState({ isAlertSuccess: true,
                                        isAlertEmpty: false,
                                        isBadinputs: false,
                                        managerPassword: "",
                                    });
                    }
                }).catch(error => {
                    console.log(error.response.request)
                    this.setState({ isAlertSuccess: false,
                                    isAlertEmpty: false,
                                    isBadinputs: true})
                })
            }
        }else if(buttonVal === 2){
            //console.log("Disable")
            //console.log(this.state.manager)
            axios.put(c.api + 'users/user/'+this.state.manager.id+'/',
            {
                id: this.state.manager.id,
                username:this.state.manager.username,
                password: this.state.manager.password,
                email: this.state.manager.email,
                first_name: this.state.manager.first_name,
                last_name: this.state.manager.last_name,
                is_active: false,
                cellphone: this.state.manager.cellphone,
                position: "MGR"
            },
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
            .catch(error => console.log(error))

            this.props.history.push({
                pathname: '/admin/RegisteredManagers', state:{disabledManager: true, deletedManager: false}})
                window.location.reload(true);

        }else if(buttonVal === 3){
            console.log("Delete")
            axios.delete(c.api + 'users/user/'+this.state.manager.id+'/')
            .catch(error => console.log(error))

            this.props.history.push({
                pathname: '/admin/RegisteredManagers', state:{disabledManager: false, deletedManager: true}})
                window.location.reload(true);
        }
    }
    ModfManager(e){
        e.preventDefault()
        
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
                        <font size="5">{this.state.manager.first_name} {t("Manager.Information.1")}</font>
                        <br></br>
                        <font size="3">{this.props.location.pathname}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.AddManager}>
                        <h6 className="heading-small text-muted mb-4">
                        {t("Manager.PersonalInformation.1")}
                        </h6>
                        <div className="pl-lg-4">
                        <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>{t("Manager.Warning.1")}</strong> {t("Manager.EmptyFields.1")}!
                            </Alert>
                            <Alert color="warning" isOpen={this.state.isBadinputs}>
                                <strong>{t("Manager.Warning.1")}!</strong> {t("Manager.BadInputs.1")}!
                            </Alert>
                            <Alert color="success" isOpen={this.state.isAlertSuccess}>
                                <strong>{t("Manager.Congratulations.1")}!</strong> {t("Manager.ModifySuccesfull.1")}
                            </Alert>
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                {t("Manager.Name.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder={t("Manager.Name.1")}
                                type="text"
                                value={this.state.manager.first_name}
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
                                {t("Manager.LastName.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder={t("Manager.LastName.1")}
                                type="text"
                                value={this.state.manager.last_name}
                                onChange={this.onChangeLastName}
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
                                {t("Manager.Phone.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-phone-number"
                                placeholder={t("Manager.Phone.1")}
                                type="text"
                                value={this.state.manager.cellphone}
                                onChange={this.onChangeCellphone}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        </div>

                        <hr className="my-4"></hr>
                        <h6 className="heading-small text-muted mb-4">
                        {t("Manager.AccountInformation.1")}
                        </h6>
                        <div className="pl-lg-4">                        
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
                                value={this.state.manager.username}
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
                                value={this.state.manager.email}
                                onChange={this.onChangeEmail}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        {
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
                                className="form-control-alternative"
                                placeholder={t("Admin.Password.1")} 
                                type="password" 
                                autoComplete="new-password"
                                value={this.state.managerPassword}
                                onChange={this.onChangePassword}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        }
                        <div className="text-center">
                            <Button className="mt-4" color="primary" onClick={ () => this.SubmitEvent(1) }>
                            {t("Manager.ModifyManager.1")}
                            </Button>
                            <Button className="mt-4" color="primary" onClick={ () => {if(window.confirm(i18n.t("Manager.ConfirmationDisable.1"))){this.SubmitEvent(2)};} }>
                            {t("Manager.DisabledManager.1")}
                            </Button>
                            <Button className="mt-4" color="primary" onClick={ () => {if(window.confirm(i18n.t("Manager.ConfirmationDelete.1"))){this.SubmitEvent(3)};} }>
                            {t("Manager.DeletedManager.1")}
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

export default withTranslation()(RUDDManager);