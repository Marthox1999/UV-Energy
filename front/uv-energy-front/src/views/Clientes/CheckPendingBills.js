import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button
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
            valor: "", 
            mora: "",
            total: "", 
            reconexion: "",
            path: '',
            listBills: [],
            credentials: cookie.get('notCredentials'),           
        }
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
    SearchInvoice(e){
        e.preventDefault();
        this.referenceInvoice=this.referenceField;
        if (this.state.referenceField === ""){
            this.setState({isAlertEmpty: true})
            return;
        }
        this.setState({isAlertEmpty: false})
        axios.post(c.api + 'sales/searchInvoice',
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
            </Container>
            </>
        );
    }
}

export default withTranslation()(CheckPendingBills);