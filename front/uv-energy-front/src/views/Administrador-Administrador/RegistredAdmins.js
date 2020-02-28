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
        this.readAdmin = this.readAdmin.bind(this);
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
    readAdmin(item){
        this.props.history.push({
            pathname: '/RUDDAdmin',
            state: { adminS: item }
        })
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
                                            onClick={ () => this.props.history.push({pathname: '/admin/RUDDAdmin', state: { adminS: item }}) }
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

export default RegistredAdmins;