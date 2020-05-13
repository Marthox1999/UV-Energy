import React from "react";
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Alert,
} from "reactstrap";
// core components

import 'leaflet/dist/leaflet.css';
import Cookies from 'universal-cookie';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18n.js';

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
            
            mora:"1",
            credentials: cookie.get('notCredentials'),
            isInvalidNumber: false
        }
        this.onChangeStratum = this.onChangeStratum.bind(this);
        this.getInitState = this.getInitState.bind(this);
        this.checkNumbers = this.checkNumbers.bind(this);
    }

    

    onChangeStratum(e){
        const target = e.target;
        const value = target.value;
        const estrato = target.name[target.name.length-1];
        const tipo = target.name.substring(0, target.name.length-1);
        const temp  = this.state[tipo];
        
        temp[parseInt(estrato,10)]=value;
        this.setState({
            [tipo]: temp,
            isInvalidNumber: false
        });
    }
    getInitState(){
        let obj = new Object();
        obj.residencial=["416.58715",
                             "446.64775",
                             "548.2377",
                             "592.6894",
                             "711.2273"];
        obj.industrial=["711.2273",
                            "711.2273",
                            "711.2273",
                            "711.2273",
                            "711.2273"];
        obj.mora="1";
        obj.isInvalidNumber=false;
        
        return obj;
    }

    checkNumbers(){
        let isNumber = (number) =>  /^(\d+(\.\d+)?|\.\d+)$/.test(number);
        let numeroResidencial = this.state.residencial.every(isNumber)
        let numeroIndustrial = this.state.industrial.every(isNumber);
        
        //Si alguno no es número
        if(!(isNumber(this.state.mora) && numeroResidencial && numeroIndustrial)){
            this.setState({
                isInvalidNumber:true
            })
            return false;
        }
        this.setState({
            isInvalidNumber:false
        })
        return true;
    }
    SubmitEvent(buttonVal){
        //Si buttonVal es 1
        if(buttonVal===1){
            this.setState(this.getInitState());
            return;
        }
        //Si buttonVal es 2
        //Verificar que sean números, si alguno no lo es entonces no post
        if(!this.checkNumbers()){
            return;
        }
        axios.post(c.api + 'sales/generateInvoices/',
            {
                residencial: this.state.residencial,
                industrial: this.state.industrial,
                mora:this.state.mora,
            },      
            {headers: { 'Authorization' : `Token ${this.state.credentials.token}`}})
        .then( response => {
            this.setState(this.getInitState());
            alert(response.data);
        }).catch(
            error => {
                alert(i18n.t("Settings.Error.1"));
                console.log(error.response.request.responseText);
            }
        )        
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
                        
                        <Alert color="warning" isOpen={this.state.isInvalidNumber}>
                             {t("Settings.Invalid.1")}
                        </Alert>
                            {/**
                         * Tabla de estratos
                         */}
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
                                    {t("Settings.Stratum.1")} {indexStratum+1}
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
                        {/**
                         * Porcentaje de mora
                         */}
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

                        <div className="text-center">
                            <Button className="mt-4" color="primary" onClick={ () => this.SubmitEvent(1) }>
                                {t("Settings.Default.1")}
                            </Button>
                            <Button className="mt-4" color="primary" onClick={ () => this.SubmitEvent(2) }>
                                {t("Settings.GenerateInvoices.1")}
                            </Button>
                        </div>
                    
                    </Form>
                    </CardBody>
                </Card>
                
            </Container>
            </>
        );
    }
}


export default withTranslation()(SetInvoices);