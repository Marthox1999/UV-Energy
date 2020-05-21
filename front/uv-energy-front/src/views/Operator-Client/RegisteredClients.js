import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { withTranslation } from 'react-i18next';

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

class RegisteredClients extends React.Component {
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
                position: "OP"
            },
            path: '',
            listAdmins: [],
            isdisabledAdmin: this.props.state.disabledAdmin,
            isdeletedAdmin: this.props.state.deletedAdmin,
            credentials: cookie.get('notCredentials'),           
        }
    }
    componentDidMount(){
        console.log(this.state.credentials)
        if(this.state.credentials.position === 'ADMIN'){
            this.setState({path: '/admin/RUDDAdmin'})
        }else if(this.state.credentials.position === 'MGR'){
            this.setState({path: '/manager/RUDDAdminM'})
        }else if(this.state.credentials.position === 'OP'){
            this.setState({path: '/operator/RUDDClient'})
        }
        axios.get(c.api + 'users/activeClient/',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert("There are no registered clients.")
              }
              else{
                this.setState({listAdmins: response.data})
                console.log(this.state.listAdmins)
                //console.log(response.config)
            }             
        }).catch(error => alert(error))
    }
    render() {
        const { t } = this.props
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
                            <font size="5">{t("Client.ActiveClient.1")}</font>
                            <br></br>
                            <font size="3">{this.props.location.pathname}</font>
                            </CardHeader>
                            <Alert color="info" isOpen={this.state.isdisabledAdmin}>
                                {t("Client.DisabledClient.1")}
                            </Alert>
                            <Alert color="info" isOpen={this.state.isdeletedAdmin}>
                                {t("Client.DeletedClient.1")}
                            </Alert>
                            <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                <th scope="col"><font size="2">{t("Admin.Id.2")}</font></th>
                                <th scope="col"><font size="2">{t("Admin.Name.1")}</font></th>
                                <th scope="col"><font size="2">{t("Admin.Username.1")}</font></th>
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

                                            className="text-blue"
                                            role="button"
                                            size="md"
                                            color="white"
                                            onClick={ () => this.props.history.push({pathname: this.state.path, state: { adminID: item.id }}) }
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

export default withTranslation()(RegisteredClients);