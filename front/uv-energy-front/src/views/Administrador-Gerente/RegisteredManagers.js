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

class RegistredManagers extends React.Component {
    constructor(props){
        super(props);
        if(this.props.location.state === null){
            this.props = { state:{disabledManager: false, deletedManager: false}}
        }else if(this.props.location.state.disabledManager){
            this.props = { state:{disabledManager: true, deletedManager: false}}
        }else if(this.props.location.state.deletedManager){
            this.props = { state:{disabledManager: false, deletedManager: true}}
        }
        this.state = {
            manager : {
                username: "Username",
                password: "",
                email: "Email",
                first_name: "Name",
                last_name: "Last name",
                is_active: true,
                cellphone: "123",
                position: "MGR"
            },
            listManagers: [],
            isdisabledManager: this.props.state.disabledManager,
            isdeletedManager: this.props.state.deletedManager,
            filter: {
                where: {
                    position: "MGR",
                    is_active: true,
                }
            }
        }
    }
    componentDidMount(){
        axios.get(c.api + 'users/activeManager/')
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert("There aren't any managers registred.")
              }
              else{
                this.setState({listManagers: response.data})
                console.log(this.state.listManagers)
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
                            <h3 className="mb-0">Active Managers</h3>
                            </CardHeader>
                            <br></br>
                            <Alert color="info" isOpen={this.state.isdisabledMAnager}>
                                Manager account was disabled! Please reload the page to see the changes
                            </Alert>
                            <Alert color="info" isOpen={this.state.isdeletedManager}>
                                Manager account was deleted! Please reload the page to see the changes
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
                                {this.state.listManagers.map((item, key) => 
                                    <tr key={'manager-'+key}>
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
                                            onClick={ () => this.props.history.push({pathname: '/admin/RUDDManager', state: { managerID: item.id }}) }
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

export default RegistredManagers;