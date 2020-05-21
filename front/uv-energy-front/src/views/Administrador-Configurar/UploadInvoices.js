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
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
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
            bancoSeleccionado:"",
            invoices:[],
            downloadFile:"",
            isAlerNoSelected:false,
            credentials: cookie.get('notCredentials'),
            
        }

        this.readFile = this.readFile.bind(this)
        this.sendFile = this.sendFile.bind(this)
        this.downloadFile = this.downloadFile.bind(this)
    }

    readFile(e){
        e.preventDefault();
        let fileIn = e.target.files[0];
        this.setState({ file: fileIn })
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = reader.result;
            let arrayInvoices = text.split('\n').filter((element)=> element!=="");
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
            alert(response.data)
        }).catch(error => {
            alert(i18n.t("Settings.Error.1"));
            console.log(error)                        
        })   
    }
    /**
     * Recibo 
     * downloadFile:"0" falla en descarga
     * downloadFile:"1" exito en descarga
     */
    downloadFile (){
        if(this.state.bancoSeleccionado===""){
            this.setState({
                isAlerNoSelected:true
            })
            return;
        }
        this.setState({
            isAlerNoSelected:false
        })

        axios.post(c.api + 'sales/downloadFile/',
            {
                selectedBank:this.state.bancoSeleccionado
            },
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if (response.data.error != null) {
                console.log(response.data.error);
            }
            else {
                if (response.data === "no hay pagos registrados en ese banco."){
                    alert(response.data)
                }else{
                    const file = new Blob([response.data]);
                    const fileURL = URL.createObjectURL(file);
                    const link = document.createElement('a');
                    link.href = fileURL;
                    link.setAttribute('download',this.state.bancoSeleccionado);
                    document.body.appendChild(link);
                    link.click();
                }
            }
        }).catch(error => {
            this.setState({
                downloadFile:"0"
            })
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
                        <br></br>
                        <font size="3">{this.props.location.pathname}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>

                    <Alert color="warning" isOpen={this.state.bank!=="Banco1.txt" && this.state.bank!=="MiBanco.txt" && this.state.bank!==""}>
                        {t("Settings.Error.2")}
                    </Alert>

                    <Alert color="info" isOpen={this.state.isAlerNoSelected}>
                        {t("Settings.Error.3")}
                    </Alert>

                    <Alert color="warning" isOpen={this.state.downloadFile==="0"}>
                        {t("Settings.EmptyBank.1")}
                    </Alert>

                    <Alert color="success" isOpen={this.state.downloadFile==="1"}>
                        {t("Settings.Success.1")}
                    </Alert>

                    <UncontrolledDropdown nav>
                        <DropdownToggle className="dropdown-menu-arrow">
                        
                                {t("PayBills.SelectBank.1")}  
                            
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={()=>this.state.bancoSeleccionado="Banco1"}>
                                Banco1
                            </DropdownItem>
                            <DropdownItem onClick={()=>this.state.bancoSeleccionado="MiBanco"}>
                                MiBanco
                            </DropdownItem>
                            
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <br>
                    </br>
                    
                    <div className="text-center">
                        <Button
                            color="success"
                            data-dismiss="modal"
                            type="button"
                            onClick={this.downloadFile}
                            >
                            {t("Settings.Download.1")}
                        </Button>
                    </div> 


                    <hr className="my-4"></hr>

                    <Form>                    

                        <h6 className="heading-small text-muted mb-4">
                            {t("Settings.UploadFile.1")}
                        </h6>

                        <center>
                        <input type="file" onChange={this.readFile} />
                        </center>

                        <br>
                        </br>
                        
                        { this.state.bank==="Banco1.txt" || this.state.bank==="MiBanco.txt"? 
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