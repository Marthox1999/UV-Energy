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
  CardBody,
  Form,
  UncontrolledDropdown,
  Media,
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
    labels: ['Mayo'],
    datasets: [
      {
        label: '',
        backgroundColor: "blue",
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 2,
        data: [5]
      }
    ]
  }


class managerReport extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            info:[],
            date:{
                initYear:'',
                year: '',
                initMonth:'',
                month:'',
            },
            graphType:1,
            reportType:"",
            path: '',
            isAlertEmpty: false,
            isAlertSuccess: false,
            isBadinputs: false,
            credentials: cookie.get('notCredentials'),           
        }
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeInitYear = this.onChangeInitYear.bind(this);
        this.onChangeInitMonth = this.onChangeInitMonth.bind(this);
        this.onChangeReportType = this.onChangeReportType.bind(this);
        this.GenerateReport=this.GenerateReport.bind(this);

    }

    onChangeInitYear(e){
        this.setState({ date: {
            initYear: e.target.value,
            year: this.state.date.year,
            initMonth: this.state.date.initMonth,
            month: this.state.date.month,
                                            }})
    }


    onChangeYear(e){
        this.setState({ date: {
            initYear: this.state.date.initYear,
            year: e.target.value,
            initMonth: this.state.date.initMonth,
            month: this.state.date.month,
                                            }})
    }

    onChangeInitMonth(e){
        this.setState({ date: {
            initYear:this.state.date.initYear,
            year: this.state.date.year,
            initMonth: e.target.value,
            month: this.state.date.month,
                                            }})
    }
  

    onChangeMonth(e){
        this.setState({ date: {
            initYear:this.state.date.initYear,
            year: this.state.date.year,
            initMonth: this.state.date.initMonth,
             month: e.target.value,
                                            }})
    }

    onChangeGraphType(e){
        this.setState({
            graphType: 1,
        })
    }

    onChangeReportType(e){
        this.setState({
            reportType:e.target.value,
        })
    }

    GenerateReport(e){
        e.preventDefault()
        console.log(this.state.credentials.token)
        axios.post(c.api + 'sales/generateReport/', 
            { time_size:"monthly", init_month:this.state.date.initMonth , finish_month: this.state.date.month , 
                        init_year: this.state.date.initYear , finish_year: this.state.date.year, report_type: "bill" },
            {headers: { Authorization: `Token ${this.state.credentials.token}` }
    })
            .then(response => {
                    this.setState({ info: response.data })
                    console.log(response.data)
            }).catch(error => console.log(error.request))
   
    }
    
    render() {
        const { t } = this.props
        let graph;
        if (this.state.graphType) {
        graph = <Bar
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
        }}/>;
        } else {
        graph = <Line
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
        }}/>;
        }

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
                    <Form onSubmit= {(e)=> (this.GenerateReport(e))}>
                        <Row>
                            <Col>
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
                                {console.log(this.state.graphType)}
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem>
                                    {t("Report.Bills.1")}
                                </DropdownItem>
                                <DropdownItem>
                                    {t("Report.Payments.1")}
                                </DropdownItem>
                                <DropdownItem >
                                    {console.log(this.state.graphType)}
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
                            <Col>
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-initYear"
                                >
                                {t("Report.InitYear.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="year"
                                placeholder={t("Report.InitYear.1")}
                                type="number"
                                value={this.state.date.initYear}
                                onChange={this.onChangeInitYear}
                                />
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-initMont"
                                >
                                {t("Report.InitMonth.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="month"
                                placeholder={t("Report.InitMonth.1")}
                                type="number"
                                value={this.state.date.initMonth}
                                onChange={this.onChangeInitMonth}
                                />
                            </FormGroup>
                            </Col>
                            <Col>
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
                                value={this.state.date.year}
                                onChange={this.onChangeYear}
                                />
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-month"
                                >
                                {t("Report.Month.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="month"
                                placeholder={t("Report.Month.1")}
                                type="number"
                                value={this.state.date.month}
                                onChange={this.onChangeMonth}
                                />
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Button className="mt-4" color="primary" type="submit">
                                {t("Report.Generate.1")}
                                </Button>
                            </FormGroup>
                            </Col>

                        </Row>
                    </Form>
                    {console.log(this.state.date)}
                    {console.log(this.state.credentials)}
                    {graph}                        
                    </CardBody>
                </Card>                
            </Container>


                        

            
            
            </>
        );
    }
}

export default withTranslation()(managerReport);