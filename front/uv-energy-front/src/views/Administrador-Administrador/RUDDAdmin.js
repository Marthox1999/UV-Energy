import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18n.js';

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

class RUDDAdmin extends React.Component {
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
            adminData: {
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
            adminPassword: "",
            isAlertEmpty: false,
            isAlertSuccess: false,
            isModal: false,
            submitClicked: "",
            isBadinputs: false,
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirsName = this.onChangeFirsName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeCellphone = this.onChangeCellphone.bind(this);

        this.updateClicked = this.updateClicked.bind(this);
        this.accept = this.accept.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.SubmitEvent = this.SubmitEvent.bind(this);

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
                //console.log(response.data)
                this.setState({admin: response.data, adminData: response.data})
            }             
        }).catch(error => alert(error))
    }
    onChangeUsername(e){
        this.setState({ admin: {
                                    id: this.state.admin.id,
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
        this.setState({ adminPassword: e.target.value })
    }
    onChangeEmail(e){
        this.setState({ admin: {
                                    id: this.state.admin.id,
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
                                    id: this.state.admin.id,
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
                                    id: this.state.admin.id,
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
                                    id: this.state.admin.id,
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
    SubmitEvent(buttonVal){
        this.setState({ isAlertSuccess: true,
            isAlertEmpty: false,
            isBadinputs: false,
        });
        if(buttonVal===1){            
            console.log("Modify")
            if ((this.state.admin.username === "") ||
                (this.state.admin.email === "") ||
                (this.state.admin.first_name === "") ||
                (this.state.admin.last_name === "") ||
                (this.state.admin.cellphone === "")){

                this.setState({isAlertEmpty: true, isAlertSuccess: false, isBadinputs: false})
            }else{
                if(this.state.adminPassword !== ""){
                    axios.put(c.api + 'users/user/'+this.state.admin.id+'/',
                        {
                            id: this.state.admin.id,
                            username:this.state.admin.username,
                            password: this.state.adminPassword,
                            email: this.state.admin.email,
                            first_name: this.state.admin.first_name,
                            last_name: this.state.admin.last_name,
                            is_active: true,
                            cellphone: this.state.admin.cellphone,
                            position: "ADMIN"
                        },
                        {headers: { Authorization: `Token ${this.state.credentials.token}`}})

                    .then( response => {
                        //console.log(response)
                        if ((response.data.password === this.state.adminData.password) ||
                            (response.data.email === this.state.adminData.email) ||
                            (response.data.first_name === this.state.adminData.first_name) ||
                            (response.data.last_name === this.state.adminData.last_name) ||
                            (response.data.cellphone === this.state.adminData.cellphone)
                            ){
                            this.setState({ isAlertSuccess: true,
                                            isAlertEmpty: false,
                                            isBadinputs: false,
                                            adminPassword: "",
                                        });
                        }
                    }).catch(error => {
                        //console.log(error.response.request)
                        this.setState({ isAlertSuccess: false,
                                        isAlertEmpty: false,
                                        isBadinputs: true})
                    })
                }else{
                    axios.put(c.api + 'users/user/'+this.state.admin.id+'/',
                            this.state.admin,
                            {headers: { Authorization: `Token ${this.state.credentials.token}`}})

                    .then( response => {
                        //console.log(response)
                        if ((response.data.password === this.state.adminData.password) ||
                            (response.data.email === this.state.adminData.email) ||
                            (response.data.first_name === this.state.adminData.first_name) ||
                            (response.data.last_name === this.state.adminData.last_name) ||
                            (response.data.cellphone === this.state.adminData.cellphone)
                            ){
                            this.setState({ isAlertSuccess: true,
                                            isAlertEmpty: false,
                                            isBadinputs: false,
                                            adminPassword: "",
                                        });
                        }
                    }).catch(error => {
                        //console.log(error.response.request)
                        this.setState({ isAlertSuccess: false,
                                        isAlertEmpty: false,
                                        isBadinputs: true})
                    })
                }                
            }
        }else if(buttonVal === 2){
            //console.log("Disable")
            //console.log(this.state.admin)
            axios.put(c.api + 'users/user/'+this.state.admin.id+'/',
            {
                id: this.state.admin.id,
                username:this.state.admin.username,
                password: this.state.admin.password,
                email: this.state.admin.email,
                first_name: this.state.admin.first_name,
                last_name: this.state.admin.last_name,
                is_active: false,
                cellphone: this.state.admin.cellphone,
                position: "ADMIN"
            },{headers: { 'Authorization' : `Token ${this.state.credentials.token}`}})
            .catch(error => console.log(error))

            this.props.history.push({
                pathname: '/admin/RegisteredAdmins', state:{disabledAdmin: true, deletedAdmin: false, reload: true}})
                window.location.reload(true);

        }else if(buttonVal === 3){
            //console.log("Delete")
            axios.delete(c.api + 'users/user/'+this.state.admin.id+'/',
                         {headers: { 'Authorization' : `Token ${this.state.credentials.token}`}})
            .catch(error => console.log(error))

            this.props.history.push({
                pathname: '/admin/RegisteredAdmins', state:{disabledAdmin: false, deletedAdmin: true, reload: true}})
                window.location.reload(true);
        }
    }
    updateClicked(name){
        this.setState({submitClicked: name,  isModal: !this.state.isModal})
    }
    accept(){
        if(this.state.submitClicked===i18n.t("Admin.Disable.1")){
            this.SubmitEvent(2);
        }else if(this.state.submitClicked===i18n.t("Admin.Delete.1")){
            this.SubmitEvent(3);
        }
    }
    closeModal(){
        this.setState({ isModal: !this.state.isModal})
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
                        <font size="5">{t("Admin.Info.2")} {this.state.admin.first_name}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                            </h6>
                            <div className="pl-lg-4">
                                <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                    <strong>{t("Admin.Warning.1")}</strong> {t("Admin.EmptyFields.1")}
                                </Alert>
                                <Alert color="warning" isOpen={this.state.isBadinputs}>
                                    <strong>{t("Admin.Warning.1")}</strong> {t("Admin.BadInputs.1")}
                                </Alert>
                                <Alert color="success" isOpen={this.state.isAlertSuccess}>
                                    <strong>{t("Admin.Congrat.1")}</strong> {t("Admin.Congrat.3")}
                                </Alert>
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
                                    <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-phone-number"
                                        >
                                        {t("Admin.PhoneNumber.1")}
                                        </label>
                                        <Input
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
                                        className="form-control-alternative"
                                        placeholder={t("Admin.Password.1")}
                                        type="password" 
                                        autoComplete="new-password"
                                        value={this.state.adminPassword}
                                        onChange={this.onChangePassword}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <div className="text-center">
                                    <Button className="mt-4" color="primary" onClick={ () => this.SubmitEvent(1) }>
                                        {t("Admin.ModifyButton.1")}
                                    </Button>
                                    <Button className="mt-4" color="primary" onClick={()=>this.updateClicked(i18n.t("Admin.Disable.1"))}>
                                        {t("Admin.DisableButton.1")}
                                    </Button>
                                    <Button className="mt-4" color="primary" onClick={()=>this.updateClicked(i18n.t("Admin.Delete.1"))}>
                                        {t("Admin.DeleteButton.1")}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Modal
                    className="modal-dialog-centered"
                    color="success"
                    isOpen={this.state.isModal}
                >
                    <ModalBody>
                        <div className="modal-body">
                            <Alert color="warning">
                            <strong>{this.state.submitClicked} {t("Admin.AdminRegister.1")},</strong><br/>{t("Admin.AreYouSure.1")}
                            </Alert>
                            <strong>{t("Admin.Info.1")}</strong>
                            <br></br>
                            <strong> {t("Admin.Id.1")} </strong> {this.state.adminData.id}<br/>
                            <strong> {t("Admin.Name.2")} </strong> {this.state.adminData.name} {this.state.adminData.last_name}<br/>                                                        
                        </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                            color="danger"
                            data-dismiss="modal"
                            type="button"
                            onClick={this.accept}
                            >
                            {t("Admin.SureButton.1")}
                            </Button>
                            <Button
                            color="primary"
                            data-dismiss="modal"
                            type="button"
                            onClick={this.closeModal}
                            >
                            {t("Admin.NoButton.1")}
                        </Button>                    
                    </div>
                </Modal>
            </Container>
            </>
        );
    }
}

export default withTranslation()(RUDDAdmin);