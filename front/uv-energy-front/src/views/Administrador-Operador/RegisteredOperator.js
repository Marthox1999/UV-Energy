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
import { withTranslation, Trans } from 'react-i18next';

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
                alert(i18n.t("Operator.NoRegistered.1"))
              }
              else{
                this.setState({listOperators: response.data})
                console.log(this.state.listOperators)
                console.log(response.config)
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
                            <font size="5">{t("Operator.ActiveOperator.1")}</font>
                            </CardHeader>
                            <Alert color="info" isOpen={this.state.isdisabledOperator}>
                                {t("Operator.DisabledNotification.1")}
                            </Alert>
                            <Alert color="info" isOpen={this.state.isdeletedOperator}>
                                {t("Operator.DeletedNotification.1")}
                            </Alert>
                            <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                <th scope="col"><font size="2">Id</font></th>
                                <th scope="col"><font size="2">{t("Operator.Name.1")}</font></th>
                                <th scope="col"><font size="2">{t("Operator.Username.1")}</font></th>
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

export default withTranslation()(RegisteredOperators);