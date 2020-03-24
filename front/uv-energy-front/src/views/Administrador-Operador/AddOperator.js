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
  Alert
} from "reactstrap";
// core components
import UVHeader from "components/Headers/UVHeader.js";
import Axios from "axios";
import Cookies from 'universal-cookie';

const c = require('../constants')
const cookie = new Cookies();

class AddOperator extends React.Component {
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
                position: "OP"
            },
            isAlertEmpty: false,
            isAlertSuccess: false,
            credentials: cookie.get('notCredentials'),
        }
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUsername= this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCellphone = this.onChangeCellphone.bind(this);
        this.AddOperator = this.AddOperator.bind(this);
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
            position: "OP"
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
            position: "OP"
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
            position: "OP"
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
            position: "OP"
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
            position: "OP"
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
            position: "OP"
        }}) 
    }
    AddOperator(e){
        e.preventDefault()
        if ((this.state.user.username === "") ||
            (this.state.user.password === "") ||
            (this.state.user.email === "") ||
            (this.state.user.first_name === "") ||
            (this.state.user.last_name === "") ||
            (this.state.user.cellphone === "")){
            this.setState({isAlertEmpty: true, isAlertSuccess: false})
        }else{
            console.log(this.state.user)
            Axios.post(c.api + 'users/user/', this.state.user,
                       {headers: { Authorization: `Token ${this.state.credentials.token}`}})
            .then( response => {
                this.setState({ isAlertEmpty: false,
                                isAlertSuccess: true,
                    user: {
                        username: "",
                        password: "",
                        email: "",
                        first_name: "",
                        last_name: "",
                        is_active: true,
                        cellphone: "",
                        position: "OP"
                    }})
            }).catch(error => console.log(error))
        }
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
                        <font size="5">Add Operator</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                        <strong>Warning!</strong> There are empty fields!
                    </Alert>
                    <Alert color="success" isOpen={this.state.isAlertSuccess}>
                        <strong>Congratulations!</strong> The opertator was created!
                    </Alert>
                    <Form onSubmit={this.AddOperator}>
                        <h6 className="heading-small text-muted mb-4">
                        Personal Information
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
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder="Name"
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
                                Last Name
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder="Last Name"
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
                                Phone Number
                                </label>
                                <Input 
                                className="form-control-alternative"
                                id="input-cellphone"
                                placeholder="Phone Number"
                                type="number"
                                value={this.state.user.cellphone}
                                onChange={this.onChangeCellphone}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <hr className="my-4"></hr>
                        <h6 className="heading-small text-muted mb-4">
                        Account Information
                        </h6>
                        <div className="pl-lg-4"></div>
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
                                Password
                                </label>
                                <Input 
                                className="form-control-alternative"
                                placeholder="Password" 
                                type="password" 
                                autoComplete="new-password"
                                value={this.state.user.password}
                                onChange={this.onChangePassword}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit">
                                Add
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

export default AddOperator;