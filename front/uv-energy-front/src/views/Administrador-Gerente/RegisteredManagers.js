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
import i18n from '../../i18n.js';
import { withTranslation } from 'react-i18next';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')
const cookie = new Cookies();

class RegistredManagers extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.location.state===null)
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
            path: '',
            listManagers: [],
            isdisabledManager: this.props.state.disabledManager,
            isdeletedManager: this.props.state.deletedManager,
            credentials: cookie.get('notCredentials'),
        }
    }
    componentDidMount(){
        if(this.state.credentials.position === 'ADMIN'){
            this.setState({path: '/admin/RUDDManager'})
        }else if(this.state.credentials.position === 'MGR'){
            this.setState({path: '/manager/RUDDManagerM'})

        }
        axios.get(c.api + 'users/activeManager/',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert(i18n.t("Manager.NoRegistered.1"))
              }
              else{
                this.setState({listManagers: response.data})
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
                            <font size="5">{t("Manager.ActiveManager.1")}</font>
                            <br></br>
                            <font size="3">{this.props.location.pathname}</font>
                            </CardHeader>
                            <Alert color="info" isOpen={this.state.isdisabledManager}>
                                {t("Manager.DisabledNotification.1")}
                            </Alert>
                            <Alert color="info" isOpen={this.state.isdeletedManager}>
                                {t("Manager.DeletedNotification.1")}
                            </Alert>
                            <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                <th scope="col"><font size="2">Id</font></th>
                                <th scope="col"><font size="2">{t("Manager.Name.1")}</font></th>
                                <th scope="col"><font size="2">{t("Manager.Username.1")}</font></th>
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
                                            className="text-blue"
                                            role="button"
                                            size="md"
                                            color="white"
                                            onClick={ () => this.props.history.push({pathname: this.state.path, state: { managerID: item.id }}) }
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

export default withTranslation()(RegistredManagers);