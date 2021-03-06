import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { withTranslation } from 'react-i18next';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import 'leaflet/dist/leaflet.css';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')
const cookie = new Cookies();

class RUDDOperatorM extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.location.state)
        this.state = {
            operator : {
                id: this.props.location.state.operatorID,
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                is_active: true,
                cellphone: "",
                position: "OP"
            },
            credentials: cookie.get('notCredentials'),        
        }    
    }
    componentDidMount(){
        axios.get(c.api + 'users/user/'+this.state.operator.id+'/',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert("Wrong Id")
              }
              else{
                this.setState({operator: response.data})
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
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">{t("Admin.Info.2")} {this.state.operator.first_name}</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.AddOperator}>
                        <h6 className="heading-small text-muted mb-4">
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                    >
                                    {t("General.Name.1")}
                                    </label>
                                    <Input
                                    readOnly
                                    className="form-control-alternative"
                                    id="input-first-name"
                                    placeholder={t("General.Name.1")}
                                    type="text"
                                    value={this.state.operator.first_name}
                                    />
                                </FormGroup>
                                </Col>
                                <Col lg="6">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-last-name"
                                    >
                                    {t("General.Last_name.1")}
                                    </label>
                                    <Input
                                    readOnly
                                    className="form-control-alternative"
                                    id="input-last-name"
                                    placeholder={t("General.Last_name.1")}
                                    type="text"
                                    value={this.state.operator.last_name}
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
                                    {t("General.Phone.1")}
                                    </label>
                                    <Input
                                    readOnly
                                    className="form-control-alternative"
                                    id="input-phone-number"
                                    placeholder={t("General.Phone.1")}
                                    type="text"
                                    value={this.state.operator.cellphone}
                                    />
                                </FormGroup>
                                </Col>
                            </Row>
                        </div>

                        <hr className="my-4"></hr>
                        <h6 className="heading-small text-muted mb-4">
                        {t("General.Account_info.1")}
                        </h6>
                        <div className="pl-lg-4">                        
                            <Row>
                                <Col lg="6">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                    >
                                    {t("General.Username.1")}
                                    </label>
                                    <Input
                                    readOnly
                                    className="form-control-alternative"
                                    id="input-username"
                                    placeholder={t("General.Username.1")}
                                    type="text"                                
                                    value={this.state.operator.username}
                                    />
                                </FormGroup>
                                </Col>
                                <Col lg="6">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-email"
                                    >
                                    {t("General.Email.1")}
                                    </label>
                                    <Input
                                    readOnly
                                    className="form-control-alternative"
                                    id="input-email"
                                    placeholder={t("General.EmailExample.1")}
                                    type="email"
                                    value={this.state.operator.email}
                                    />
                                </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                    </CardBody>
                </Card>
            </Container>
            </>
        );
    }
}

export default withTranslation()(RUDDOperatorM);