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

class CheckPaidBills extends React.Component {
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
            path: '',
            listBills: [],
            credentials: cookie.get('notCredentials'),           
        }
    }
    componentDidMount(){
        console.log(this.state.credentials)
        axios.get(c.api + 'sales/paidbillList/', {params: { pk_cliente: this.state.credentials.id}, 
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

export default withTranslation()(CheckPaidBills);