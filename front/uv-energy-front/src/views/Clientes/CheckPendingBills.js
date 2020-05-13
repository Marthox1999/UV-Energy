import React, { useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
  Alert,
  Modal,
  ModalBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
// core components
import UVHeader from "components/Headers/UVHeader.js";
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

const c = require('../constants')
const cookie = new Cookies();

class CheckPendingBills extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bill : {
                pk_bill: -1,
                start_date: "",
                end_date: "",
                read: 1,
                expedition_date: "",
                expiration_date: "",
                is_paid: true,
                fk_debit_payment: -1,
                fk_meter: -1,
                fk_employee: -1
            },

            bancoSeleccionado: "Banco1",
            referenceInvoice: "",
            valor: "", 
            mora: "",
            interes: "",
            reconexion: "",
            total: "",

            path: '',
            listBills: [],
            credentials: cookie.get('notCredentials'),           
        }
        this.searchInvoice = this.searchInvoice.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.payInvoice = this.payInvoice.bind(this)
    }
    componentDidMount(){
        axios.get(c.api + 'sales/pendingbillList/', {params: { pk_cliente: this.state.credentials.id}, 
                headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
              }
              else{
                this.setState({listBills: response.data})
               /*console.log(this.state.listBills)*/
                 /*console.log(response.config)*/
            }             
        }).catch(error => alert(error))
    }
    sendpdf(key) {
        axios({
            url: c.api + 'sales/generatepdf/',
            method: 'POST',
            params: { pk_bill : key },
            headers: { Authorization : `Token ${this.state.credentials.token}` },
            responseType: 'blob'
        }).then(response => {
            if (response.data.error != null) {
                console.log(response.data.error);
            }
            else {
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            }
        }).catch(error => alert(error))
    }

    /**
     * Axios post para buscar datos, espera un json con data 
     * pero sin cambios en back aun
     *  {    
     *      valor: "", 
     *      mora: "",
     *      total: "", 
     *      reconexion: "",
     *  }
     *  valor: -2 No existe
     *  valor: -1 Está vencida y no se puede pagar
     *  valor: 0 Ya fue pagada
     *  valor>0 /\ reconexion>0 debe pagar todas las facturas y reconexión
     *  valor>0 /\ reconexion<=0 Puede pagar solo esta factura
     * 
     */
    searchInvoice(referenceInvoiceIn){
        this.state.referenceInvoice=referenceInvoiceIn;
        axios.post(c.api + 'sales/searchInvoice/',
            {
                referenceBill:this.state.referenceInvoice
            },
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            this.setState({ valor: response.data.valor, 
                            mora: response.data.mora,
                            total: response.data.total,
                            interes: response.data.interes,
                            reconexion: response.data.reconexion})
        }).catch(error => {
            console.log(error)
            this.setState({ valor: "-2", 
                            mora: "",
                            total: "",
                            interes: "",
                            reconexion: ""})
        })
        
    }

    

    /**
     * Para que un cliente pague una factura no vencida
     * 
     */
    payInvoice(e){
        e.preventDefault()
        axios.post(c.api + 'sales/payInvoiceClient/',
            {
                bank:this.state.bancoSeleccionado,
                referenceBill:this.state.referenceInvoice
            },
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            this.closeModal();
            /* window.location.reload(true);*/
        }).catch(error => {
            console.log(error)                        
            this.closeModal();
        })   
    }


    closeModal(){
        
        this.setState({
            referenceInvoice: "",
            valor: "", 
            mora: "",
            interes: "",
            reconexion: "",
            total: ""
        })
    }

    

    render() {
        const { t } = this.props;
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
                            <font size="5">{t("Bill.MyBills.1")}</font>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light" align="center">
                                <tr>
                                <th scope="col"><font size="2">{t("Bill.Id.1")}</font></th>
                                <th scope="col"><font size="2">{t("Bill.expeditionDate.1")}</font></th>
                                <th scope="col"><font size="2">{t("Bill.expirationDate.1")}</font></th>
                                <th scope="col"><font size="2">{t("Bill.value.1")}</font></th>
                                <th scope="col"><font size="2">{t("Bill.Visualize.1")}</font></th>
                                <th scope="col"><font size="2">{t("Bill.Pay.1")}</font></th>
                                </tr>
                            </thead>
                            <tbody  >
                                {this.state.listBills.map((item, key) => 
                                    
                                    <tr key={'bill-'+ key}>
                                    <td align="center">{item.pk_bill}</td>
                                    <td align="center"> {item.expedition_date} </td>
                                    <td align="center">{item.expiration_date}</td>
                                    <td align="center">{item.value}</td>
                                    <td className="text-center">
                                        <Button
                                            onClick={() => this.sendpdf(item.pk_bill)}
                                            align="center"
                                            className="text-blue"
                                            role="button"
                                            size="md"
                                            color="white"
                                        >
                                            <i className="ni ni-single-copy-04" />
                 
                                        </Button>
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            onClick={() => this.searchInvoice(item.pk_bill)}
                                            align="center"
                                            className="text-blue"
                                            role="button"
                                            size="md"
                                            color="white"
                                        >
                                            <i className="ni ni-credit-card" />
                 
                                        </Button>
                                    </td>
                                    </tr>
                                )}
                            </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
                <Modal
                    className="modal-dialog-centered"
                    color="warning"
                    isOpen={this.state.valor==="-2"}
                    >
                    <ModalBody>
                    <div className="modal-body">
                        <Alert color="warning">
                            <strong>{t("PayBills.Warning.1")}!</strong><br/>
                        </Alert>
                        {t("PayBills.NoFound.1")}
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.closeModal}
                        >
                        {t("PayBills.Close.1")}
                        </Button>
                    </div>
                </Modal>
                <Modal
                    className="modal-dialog-centered"
                    color="warning"
                    isOpen={this.state.valor==="-1"}
                    >
                    <ModalBody>
                    <div className="modal-body">
                        <Alert color="warning">
                            <strong>{t("PayBills.Warning.1")}!</strong><br/>
                        </Alert>
                        {t("PayBills.Expired.1")}
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.closeModal}
                        >
                        {t("PayBills.Close.1")}
                        </Button>
                    </div>
                </Modal>
                <Modal
                    className="modal-dialog-centered"
                    color="info"
                    isOpen={this.state.valor==="0"}
                    >
                    <ModalBody>
                    <div className="modal-body">
                        <Alert color="info">
                            <strong>{t("PayBills.Information.1")}!</strong><br/>
                        </Alert>
                        {t("PayBills.Paid.1")}
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.closeModal}
                        >
                        {t("PayBills.Close.1")}
                        </Button>
                    </div>
                </Modal>
                <Modal
                    className="modal-dialog-centered"
                    color="info"
                    isOpen={parseFloat(this.state.valor)>0 && parseFloat(this.state.reconexion)>0}
                    >
                    <ModalBody>
                    <div className="modal-body">
                        <Alert color="info">
                            <strong>{t("PayBills.Information.1")}!</strong><br/>
                        </Alert>
                        <br></br>
                        {t("PayBills.Reconnection.3")}<br/><br/>
                        {t("PayBills.Value.1")} = $ {this.state.valor} <br/>
                        {t("PayBills.Debt.1")} = $ {this.state.mora} <br/>
                        {t("PayBills.Interest.1")} = $ {this.state.interes} <br/>
                        {t("PayBills.Reconnection.1")} = $ {this.state.reconexion} <br/>
                        {t("PayBills.Total.1")} = $ {this.state.total} <br/>

                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                            color="primary"
                            data-dismiss="modal"
                            type="button"
                            onClick={this.closeModal}
                            >
                            {t("PayBills.Close.1")}
                        </Button>
                    </div>
                </Modal>

                <Modal
                    className="modal-dialog-centered"
                    color="info"
                    isOpen={parseFloat(this.state.valor)>0 && parseFloat(this.state.reconexion)<=0}
                    >
                    <ModalBody>
                    <div className="modal-body">
                        <Alert color="info">
                            <strong>{t("PayBills.Information.1")}!</strong><br/>
                        </Alert>
                        <br></br>

                        
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

                        <br></br>
                        <br></br>
                        
                        {t("PayBills.Value.1")} = $ {this.state.valor} <br/>
                        {t("PayBills.Debt.1")} = $ {this.state.mora} <br/>
                        {t("PayBills.Interest.1")} = $ {this.state.interes} <br/>
                        {t("PayBills.Total.1")} = $ {this.state.total} <br/>

                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                            color="success"
                            data-dismiss="modal"
                            type="button"
                            onClick={this.payInvoice}
                            >
                            {t("PayBills.PayInvoice.1")}
                        </Button>
                        <Button
                            color="primary"
                            data-dismiss="modal"
                            type="button"
                            onClick={this.closeModal}
                            >
                            {t("PayBills.Close.1")}
                        </Button>
                    </div>
                </Modal>
            </Container>
            </>
        );
    }
}

export default withTranslation()(CheckPendingBills);