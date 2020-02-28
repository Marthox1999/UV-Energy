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
  Table,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";

import 'leaflet/dist/leaflet.css';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')

class RegistredAdmins extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            admin : {
                username: "Username",
                password: "",
                email: "Email",
                first_name: "Name",
                last_name: "Last name",
                is_active: true,
                cellphone: "123",
                position: "ADMIN"
            },
            listAdmins: [],
            isAlertEmpty: false,
            isAlertSuccess: false,
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirsName = this.onChangeFirsName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeCellphone = this.onChangeCellphone.bind(this);

        this.AddAdmin = this.AddAdmin.bind(this);
    }
    componentDidMount(){
        axios.get(c.api + 'users/user/?position=ADMIN')
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert("There aren't any admin registred.")
              }
              else{
                this.setState({listAdmins: response.data})
                console.log(this.state.listAdmins)
            }             
        }).catch(error => alert(error))
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
        if ((this.state.admin.username === "Username") ||
            (this.state.admin.password === "") ||
            (this.state.admin.email === "Email") ||
            (this.state.admin.first_name === "Name") ||
            (this.state.admin.last_name === "Last name") ||
            (this.state.admin.cellphone === "123")){
            console.log(this.state.admin)
            this.setState({isAlertEmpty: true, isAlertSuccess: false})
        }else{
            axios.post(c.api + 'users/user/',
                       this.state.admin)
            .then( response => {
                console.log(response)
                if (response.data.username !== "username"){
                    this.setState({ isAlertSuccess: true,
                                    isAlertEmpty: false,
                                    admin : {
                                                username: "Username",
                                                password: "",
                                                email: "Email",
                                                first_name: "Name",
                                                last_name: "Last name",
                                                is_active: true,
                                                cellphone: "123",
                                                position: "ADMIN"
                                            }});
                }
            }).catch(error => console.log(error))
        }
    }
    render() {
        return(
            <>
            <UVHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                            <h3 className="mb-0">Active Admins</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listAdmins.map((item, key) => 
                                    <tr>
                                    <th scope="row">
                                        <span className="mb-0 text-sm">
                                        {item.first_name}
                                        </span>
                                    </th>
                                    <td>{item.username}</td>                                
                                    <td className="text-right">
                                        <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            href="#pablo"
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            >
                                            Action
                                            </DropdownItem>
                                        </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </td>
                                    </tr>
                                )}
                            </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
            </>
        );
    }
}

export default RegistredAdmins;