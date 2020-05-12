import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { withTranslation } from 'react-i18next';
import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  FormGroup,
  Alert,
  CardBody,
  Form,
  UncontrolledDropdown,
  Media,
  Link,
  DropdownToggle,   
  DropdownItem,
  DropdownMenu,
  Input

} from "reactstrap";

import 'leaflet/dist/leaflet.css';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')

const cookie = new Cookies();

const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: "blue",
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

const state2 = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

class managerReport extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            admin : {
                username: "Username",
                password: "",
                email: "Email",
                first_name: "Name",
                last_name: "Last name",
                is_active: true,
                cellphone: "123",
                position: "ADMIN"
            },
            labels: [],
            datasets: [
            {
                label: "",
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: []
            }
            ],
            date:{
                year: 0,
                month:0,
            },
            path: '',
            credentials: cookie.get('notCredentials'),           
        }
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
    }
    componentDidMount(){
   
    }

    onChangeYear(e){
        this.setState({ date: {
                                                year: this.state.date.year,
                                                month: this.state.date.month,
                                            }})
    }
    onChangeMonth(e){
        this.setState({ date: {
                                                year: this.state.date.year,
                                                month: this.state.date.month,
                                            }})
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
                        <h3 className="mb-0">{t("Report.Name.1")}</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <Row>
                            <Col lg="3">
                            <center>
                            <FormGroup>
                                <br></br>
                                <UncontrolledDropdown nav>
                                <DropdownToggle className="dropdown-menu-arrow">
                                <Media className="align-items-center" >
                                    <span className="mb-0 text-sm font-weight-bold">
                                        {t("Report.Type.1")}
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle" style={{ background: 'none'}}>
                                    </span>
                                </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem>
                                    {t("Report.Bills.1")}
                                </DropdownItem>
                                <DropdownItem>
                                    {t("Report.Payments.1")}
                                </DropdownItem>
                                <DropdownItem>
                                    {t("Report.Income.1")}
                                </DropdownItem>
                                <DropdownItem>
                                    {t("Report.Consumption.1")}
                                </DropdownItem>
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                            </center>
                            </Col>
                            <Col lg="3">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-year"
                                >
                                {t("Report.Year.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="year"
                                placeholder={t("Report.Year.1")}
                                type="number"
                                onChange={this.onChangeYear}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="3">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                {t("Report.Month.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="month"
                                placeholder={t("Report.Month.1")}
                                type="number"
                                onChange={this.onChangeMonth}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="3">
                            <FormGroup>
                                <Button className="mt-4" color="primary" type="submit">
                                {t("Report.Generate.1")}
                                </Button>
                            </FormGroup>
                            </Col>

                        </Row>
                    </Form>
                    {/*
                    <Row className="align-items-center">
                        <Col xs="8">
                        <select id="report" className=" btn-white rounded" margin="0.5">
                            <option value="bill">{t("Report.Bills.1")}</option>
                            <option value="income">{t("Report.Income.1")}</option>
                            <option value="payment">{t("Report.Payments.1")}</option>
                            <option value="comsuption">{t("Report.Consumption.1")}</option>
                        </select>
                        </Col>
                        <Col xs="8">
                        </Col>
                    </Row>
                    <Bar
                        data={state}
                        display="none"
                        options={{
                            title:{
                            display:true,
                            text:'Average Rainfall per month',
                            fontSize:15
                            },
                            legend:{
                            display:true,
                            position:'right'
                            }
                        }}
                        />
                        <Line
                        data={state}
                        options={{
                            title:{
                            display:true,
                            text:'Average Rainfall per month',
                            fontSize:15
                            },
                            legend:{
                            display:true,
                            position:'right'
                            }
                        }}
                        />
                        */}
                    </CardBody>
                </Card>                
            </Container>


                        

            
            
            </>
        );
    }
}

export default withTranslation()(managerReport);