import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';

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
const cookie = new Cookies();

class RegisteredOperators extends React.Component {
    constructor(props){
        super(props);
        if(this.props.location.state === null){
            this.props = { state:{disabledOperator: false, deletedOperator: false}}
        }else if(this.props.location.state.disabledOperator){
            this.props = { state:{disabledOperator: true, deletedOperator: false}}
        }else if(this.props.location.state.deletedOperator){
            this.props = { state:{disabledOperator: false, deletedOperator: true}}
        }
        this.state = {
            operator : {
                username: "Username",
                password: "",
                email: "Email",
                first_name: "Name",
                last_name: "Last name",
                is_active: true,
                cellphone: "123",
                position: "OP"
            },
            listOperators: [],
            isdisabledOperator: this.props.state.disabledOperator,
            isdeletedOperator: this.props.state.deletedOperator,
            credentials: cookie.get('notCredentials'),
            filter: {
                where: {
                    position: "OP",
                    is_active: true,
                }
            }
        }
    }
    componentDidMount(){
        console.log(this.state.credentials)
        if(this.state.credentials.position === 'ADMIN'){
            this.setState({path: '/admin/RUDDOperator'})
        }else if(this.state.credentials.position === 'MGR'){
            this.setState({path: '/manager/RUDDOperatorM'})

        }
        axios.get(c.api + 'users/activeOperator/',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert("There aren't any operators registered.")
              }
              else{
                this.setState({listOperators: response.data})
                console.log(this.state.listOperators)
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
                            <font size="5">Active Operators</font>
                            </CardHeader>
                            <Alert color="info" isOpen={this.state.isdisabledOperator}>
                                Operator account was disabled! Please reload the page to see the changes
                            </Alert>
                            <Alert color="info" isOpen={this.state.isdeletedOperator}>
                                Operator account was deleted! Please reload the page to see the changes
                            </Alert>
                            <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                <th scope="col"><font size="2">Id</font></th>
                                <th scope="col"><font size="2">Name</font></th>
                                <th scope="col"><font size="2">Username</font></th>
                                <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listOperators.map((item, key) => 
                                    <tr key={'operator-'+key}>
                                    <td>{item.id}</td>
                                    <th scope="row">
                                        <span className="mb-0 text-sm">
                                        {item.first_name}
                                        </span>
                                    </th>
                                    <td>{item.username}</td>
                                    <td className="text-right">
                                        <Button
                                            className="text-blue"
                                            role="button"
                                            size="md"
                                            color="white"
                                            onClick={ () => this.props.history.push({pathname: this.state.path, state: { operatorID: item.id }}) }
                                        >
                                            <i className="ni ni-settings" />
                                            
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

export default RegisteredOperators;