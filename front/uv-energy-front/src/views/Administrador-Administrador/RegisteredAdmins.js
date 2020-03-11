import React from "react";
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Table,
  Alert,
} from "reactstrap";

import 'leaflet/dist/leaflet.css';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')

class RegisteredAdmins extends React.Component {
    constructor(props){
        super(props);
        if(this.props.location.state === null){
            this.props = { state:{disabledAdmin: false, deletedAdmin: false, reload: false}}
        }else if(this.props.location.state.disabledAdmin){
            this.props = { state:{disabledAdmin: true, deletedAdmin: false, reload: true}}
        }else if(this.props.location.state.deletedAdmin){
            this.props = { state:{disabledAdmin: false, deletedAdmin: true, reload: true}}
        }

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
            credentials: this.props.location.state.credentials,
            listAdmins: [],
            isdisabledAdmin: this.props.state.disabledAdmin,
            isdeletedAdmin: this.props.state.deletedAdmin,
            filter: {
                where: {
                    position: "ADMIN",
                    is_active: true,
                }
            }
        }
    }
    componentDidMount(){
        axios.get(c.api + 'users/activeAdmin/',
                 {headers: { 'Authorization' : `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert("There are no registered administrators.")
              }
              else{
                this.setState({listAdmins: response.data})
                console.log(this.state.listAdmins)
                console.log(response.config)
            }             
        }).catch(error => alert(error))
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
                            <br></br>
                            <Alert color="info" isOpen={this.state.isdisabledAdmin}>
                                Admin account was disabled!
                            </Alert>
                            <Alert color="info" isOpen={this.state.isdeletedAdmin}>
                                Admin account was deleted!
                            </Alert>
                            <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listAdmins.map((item, key) => 
                                    <tr key={'admin-'+key}>
                                    <td>{item.id}</td>
                                    <th scope="row">
                                        <span className="mb-0 text-sm">
                                        {item.first_name}
                                        </span>
                                    </th>
                                    <td>{item.username}</td>
                                    <td className="text-right">
                                        <Button
                                            className="btn-icon-only text-light"
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={ () => this.props.history.push({pathname: '/admin/RUDDAdmin', state: { adminID: item.id }}) }
                                        >
                                            <i className="fas fa-ellipsis-v" />
                                            
                                        </Button>
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

export default RegisteredAdmins;