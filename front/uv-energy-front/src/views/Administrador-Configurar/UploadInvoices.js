import React from "react";
import axios from 'axios';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col,
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





class UploadPayments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bank:"",
            invoices:[],
            credentials: cookie.get('notCredentials'),
        }
        this.readFile = this.readFile.bind(this)
        this.sendFile = this.sendFile.bind(this)
    }

    readFile(e){
        e.preventDefault();
        let fileIn = e.target.files[0];
        this.setState({ file: fileIn })
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = reader.result;
            let arrayInvoices = text.split('\n').filter((element)=> element!="");
            this.setState({ 
                bank: fileIn.name,
                invoices: arrayInvoices
            });
        };
        reader.readAsText(e.target.files[0]);
    }

    sendFile (){
        axios.post(c.api + 'sales/payUploadFile/',
            {
                bank:this.state.bank,
                invoices:this.state.invoices,
            },
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            
        }).catch(error => {
            alert(i18n.t("Settings.Error.1"));
            console.log(error)                        
        })   
    }

    render() {
        const { t } = this.props;

        return(
            <>
            <UVHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <font size="5">{t("Settings.Upload.1")}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>

                    <Alert color="warning" isOpen={this.state.bank!="Banco1" && this.state.bank!="MiBanco" && this.state.bank!=""}>
                             {t("Settings.Error.2")}
                        </Alert>

                    <Form>                    

                        <h6 className="heading-small text-muted mb-4">
                            {t("Settings.UploadFile.1")}
                        </h6>

                        <center>
                        <input type="file" onChange={this.readFile} />
                        </center>

                        <br>
                        </br>
                        
                        { this.state.bank==="Banco1" || this.state.bank==="MiBanco"? 
                            <div className="text-center">
                                <Button
                                    color="success"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={this.sendFile}
                                    
                                    >
                                    {t("Settings.UploadFile.1")}
                                </Button>
                            </div> :
                            <div className="text-center">
                                <Button
                                    color="success"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={this.sendFile}
                                    disabled
                                    >
                                    {t("Settings.UploadFile.1")}
                                </Button>
                            </div>
                        }
                        
    
                        
                    </Form>
                    </CardBody>
                </Card>
                
            </Container>
            </>
        );
    }
}


export default withTranslation()(UploadPayments);