import React from "react";

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
  Alert,
  Modal,
  ModalBody
} from "reactstrap";
// core components
import UVHeader from "components/Headers/UVHeader.js";
import Axios from "axios";
import { withTranslation, Trans } from 'react-i18next';
import Cookies from 'universal-cookie';

const c = require('../constants')
const cookie = new Cookies();

class PayWithInvoice extends React.Component {
    constructor(props){
        super(props);
        this.state={
            referenceField: "",
            isAlertEmpty: false,
            referenceInvoice: "",
            valor: "", 
            mora: "",
            total: "", 
            reconexion: "",
            credentials: cookie.get('notCredentials'),
        }
        this.onChangeState = this.onChangeState.bind(this)
        this.SearchInvoice = this.SearchInvoice.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.payReconnection = this.payReconnection.bind(this)
        this.payInvoice = this.payInvoice.bind(this)
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
    SearchInvoice(e){
        e.preventDefault();
        this.referenceInvoice=this.referenceField;
        if (this.state.referenceField === ""){
            this.setState({isAlertEmpty: true})
            return;
        }
        this.setState({isAlertEmpty: false})
        Axios.post(c.api + 'sales/searchInvoice',
            {
                referenceBill:this.state.referenceInvoice
            },
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            this.setState(response.data)
        }).catch(error => {
            console.log(error)
            this.setState({ valor: "12", 
                            mora: "1",
                            total: "34013", 
                            reconexion: "0"})
        })
        
    }
    /**
     * Para pagar la factura y todas la facturas asociadas al cliente
     * 
     */
    payReconnection(){
        
        this.referenceInvoice=this.referenceField;
        if (this.state.referenceField === ""){
            this.setState({isAlertEmpty: true})
            return;
        }
        this.setState({isAlertEmpty: false})
        Axios.post(c.api + 'sales/payReconnection',
            {
                referenceBill:this.state.referenceInvoice
            },
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            this.closeModal();
        }).catch(error => {
            console.log(error)                        
            this.closeModal();
        })
        
    }

    /**
     * Para pagar una factura no vencida
     * 
     */
    payInvoice(){
        
        this.referenceInvoice=this.referenceField;
        if (this.state.referenceField === ""){
            this.setState({isAlertEmpty: true})
            return;
        }
        this.setState({isAlertEmpty: false})
        Axios.post(c.api + 'sales/payAnInvoice',
            {
                referenceBill:this.state.referenceInvoice
            },
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            this.closeModal();
        }).catch(error => {
            console.log(error)                        
            this.closeModal();
        })
        
    }


    closeModal(){
        
        this.setState({
            isAlertEmpty: false,
            referenceInvoice: "",
            valor: "", 
            mora: "",
            total: "", 
            reconexion: ""
        })
    }
    onChangeState(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]:value
        })
    }

    render(){
        const { t } = this.props
        return(
            <>
            <UVHeader />

            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <font size="5">{t("PayBills.PayWithInvoices.1")}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>

                    <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                        <strong>{t("PayBills.Warning.1")}</strong> {t("PayBills.EmptyFields.1")}
                    </Alert>

                    <Form onSubmit={this.SearchInvoice}>
                        <h6 className="heading-small text-muted mb-4">
                        {t("PayBills.EnterReferenceInvoice.1")}
                        </h6>
                        <div className="pl-lg-4">
                        
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                {t("PayBills.Reference.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="referenceField"
                                id="input-first-name"
                                placeholder={t("PayBills.Reference.1")}
                                type="text"
                                value={this.state.referenceField}
                                onChange={this.onChangeState}
                                />
                            </FormGroup>
                            <div className="text-center">
                                <Button className="mt-4" color="primary" type="submit">
                                {t("PayBills.Search.1")}
                                </Button>
                            </div>
                        
                        </div>
                    </Form>
                    </CardBody>
                </Card>
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
                        {t("PayBills.Reconnection.2")}<br/><br/>
                        {t("PayBills.Value.1")} = $ {this.state.valor} <br/>
                        {t("PayBills.Debt.1")} = $ {this.state.mora} <br/>
                        {t("PayBills.Reconnection.1")} = $ {this.state.reconexion} <br/>
                        {t("PayBills.Total.1")} = $ {this.state.total} <br/>

                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                            color="success"
                            data-dismiss="modal"
                            type="button"
                            onClick={this.payReconnection}
                            >
                            {t("PayBills.PayReconnection.1")}
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
                        
                        {t("PayBills.Value.1")} = $ {this.state.valor} <br/>
                        {t("PayBills.Debt.1")} = $ {this.state.mora} <br/>
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

export default withTranslation()(PayWithInvoice);
