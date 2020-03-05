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
  Alert
} from "reactstrap";

import 'leaflet/dist/leaflet.css';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')

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
        axios.get(c.api + 'users/user/'+this.state.manager.id+'/')
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert("Wrong Id")
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
                        this.state.manager)
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
            })
            .catch(error => console.log(error))

            this.props.history.push({
                pathname: '/admin/RegisteredManagers', state:{disabledManager: true, deletedManager: false}})

        }else if(buttonVal === 3){
            console.log("Delete")
            axios.delete(c.api + 'users/user/'+this.state.manager.id+'/')
            .catch(error => console.log(error))

            this.props.history.push({
                pathname: '/admin/RegisteredManagers', state:{disabledManager: false, deletedManager: true}})
        }
    }
    ModfManager(e){
        e.preventDefault()
        
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
                        <h3 className="mb-0">{this.state.manager.first_name} Information</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.AddManager}>
                        <h6 className="heading-small text-muted mb-4">
                        </h6>
                        <div className="pl-lg-4">
                            <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>Warning!</strong> There are empty fields!
                            </Alert>
                            <Alert color="warning" isOpen={this.state.isBadinputs}>
                                <strong>Warning!</strong> Wrong information on fields!
                            </Alert>
                            <Alert color="success" isOpen={this.state.isAlertSuccess}>
                                <strong>Congratulations!</strong> The Manager was modified!
                            </Alert>
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
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder="Name"
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
                                Last Name
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder="Last Name"
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
                                Phone Number
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-phone-number"
                                placeholder="Phone Number"
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
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Username"
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
                                className="form-control-alternative"
                                placeholder="Password" 
                                type="password" 
                                autoComplete="new-password"
                                value={this.state.managerPassword}
                                onChange={this.onChangePassword}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" onClick={ () => this.SubmitEvent(1) }>
                                Modify Information
                            </Button>
                            <Button className="mt-4" color="primary" onClick={ () => {if(window.confirm('Disable Manager?')){this.SubmitEvent(2)};} }>
                                Disable Manager
                            </Button>
                            <Button className="mt-4" color="primary" onClick={ () => {if(window.confirm('Delete Manager?')){this.SubmitEvent(3)};} }>
                                Delete Register
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

export default RUDDManager;