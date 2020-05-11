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
  Table,
  Alert,
  Modal,
  ModalBody
} from "reactstrap";
// core components

import 'leaflet/dist/leaflet.css';
import Cookies from 'universal-cookie';
import { withTranslation } from 'react-i18next';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')
const cookie = new Cookies();



class SetInvoices extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            residencial: ["416.58715",
                          "446.64775",
                          "548.2377",
                          "592.6894",
                          "711.2273"],
            
            industrial: ["711.2273",
                         "711.2273",
                         "711.2273",
                         "711.2273",
                         "711.2273"],
            
            mora:"0.5",
            reconexion:"50000",
            credentials: cookie.get('notCredentials'),
        }
        this.onChangeStratum = this.onChangeStratum.bind(this);
        this.onChangeMoraReconexion = this.onChangeMoraReconexion.bind(this);
        
    }

    onChangeStratum(e){
        const target = e.target;
        const value = target.value;
        const estrato = target.name[target.name.length-1];
        const tipo = target.name.substring(0, target.name.length-1);
        const temp  = this.state[tipo];
        
        temp[parseInt(estrato,10)]=value;
        this.setState({
            [tipo]: temp
        });
    }

    onChangeMoraReconexion(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]:value
        })
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
                        <font size="5">{t("Settings.SetUpInvoices.1")}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>


                        
                    <Form>
                    
                    

                        <h6 className="heading-small text-muted mb-4">
                            {t("Settings.StratumInformation.1")}
                        </h6>

                        <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                            <th scope="col"><font size="2"></font>
                            </th>
                            <th scope="col"><font size="2">
                                <center>
                                    {t("Settings.Residential.1")}
                                </center></font>
                            </th>
                            <th scope="col"><font size="2">
                                <center>
                                {t("Settings.Industrial.1")}
                                </center></font>
                            </th>
                            
                            </tr>
                        </thead>

                        <tbody>
                            {[...Array(5).keys()].map((indexStratum)=>
                            <tr>
                                <td>
                                    Estrato {indexStratum+1}
                                </td>
                                <td>
                                    <center>
                                        
                                        <Input
                                        required
                                        className="form-control-alternative"
                                        name={"residencial"+indexStratum}
                                        placeholder={t("Settings.Residential.1")}
                                        type="number"
                                        value={this.state.residencial[indexStratum]}
                                        onChange={this.onChangeStratum}
                                        />
                                        
                                    </center>
                                </td>
                                <td>
                                    <center>
                                        
                                        <Input
                                        required
                                        className="form-control-alternative"
                                        name={"industrial"+indexStratum}
                                        placeholder={t("Settings.Industrial.1")}
                                        type="number"
                                        value={this.state.industrial[indexStratum]}
                                        onChange={this.onChangeStratum}
                                        />
                                        
                                    </center>
                                </td>
                            </tr>

                            )}
                        </tbody>
                        </Table>
                    
                    <hr className="my-4"></hr>
                    
                        <h6 className="heading-small text-muted mb-4">
                            {t("Settings.DebtInformation.1")}
                        </h6>

                            <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                            >
                            {t("Settings.DebtPercentage.1")} (%)
                            </label>
                            <Input
                            required
                            className="form-control-alternative"
                            name="mora"
                            placeholder={t("Settings.DebtPercentage.1")}
                            type="number"
                            value={this.state.mora}
                            onChange={this.onChangeMoraReconexion}
                            />
                    
                    
                    <hr className="my-4"></hr>

                    
                        <h6 className="heading-small text-muted mb-4">
                            {t("Settings.ReconnectionInformation.1")}
                        </h6>
                        <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                            >
                            {t("Settings.ReconnectionCost.1")}
                            </label>


                            <Input
                            required
                            className="form-control-alternative"
                            name="reconexion"
                            placeholder={t("Settings.ReconnectionCost.1")}
                            type="number"
                            value={this.state.reconexion}
                            onChange={this.onChangeMoraReconexion}
                            />
                    
                    
                    </Form>
                    </CardBody>
                </Card>
                
            </Container>
            </>
        );
    }
}


export default withTranslation()(SetInvoices);