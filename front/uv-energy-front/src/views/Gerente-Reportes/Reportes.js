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
  Input,
  Alert
} from "reactstrap";

import 'leaflet/dist/leaflet.css';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')

const cookie = new Cookies();


class managerReport extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            info:[],
            data:[],
            labels:[],
            date:{
                initYear:'',
                year: '',
                initMonth:'',
                month:'',
            },
            graphType:1,
            reportType:"",
            reporTime:"",
            path: '',
            disabled:true,
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
        this.onChangeReportTime = this.onChangeReportTime.bind(this);
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

    onChangeReportTime(e){
        this.setState({
            reportTime:e.target.value,
        })
        if(e.target.value=="monthly"){
            this.setState({
                disabled:false
            })
        }
    }

    GenerateReport(e){
        e.preventDefault()
        if (((this.state.date.initYear === "") ||
            (this.state.date.year === ""))){
            this.setState({isAlertEmpty: true, isAlertSuccess: false, isBadinputs: false})

        }else if (((this.state.date.initMonth === "") ||
                    (this.state.date.month === ""))&&
                    this.state.reporTime==="montlhy"){
                    this.setState({isAlertEmpty: true, isAlertSuccess: false, isBadinputs: false})

    /*    }else if (parseInt(this.state.initYear)>parseInt(this.state.year)){
            this.setState({isAlertEmpty: false, isAlertSuccess: false, isBadinputs: true})     

        }else if ((parseInt(this.state.initYear)===parseInt(this.state.year))&&
                    (parseInt(this.state.initMonth)>parseInt(this.state.month))&&
                    (this.state.reporTime==="montlhy")){
                this.setState({isAlertEmpty: false, isAlertSuccess: false, isBadinputs: true})    
    */
        }else{
            axios.post(c.api + 'sales/generateReport/', 
            { time_size:this.state.reportTime, init_month:this.state.date.initMonth , finish_month: this.state.date.month , 
                        init_year: this.state.date.initYear , finish_year: this.state.date.year, report_type: this.state.reportType },
            {headers: { Authorization: `Token ${this.state.credentials.token}` }
            })
            .then(response => {
                if (response.data !== ""){
                    this.setState({ isAlertSuccess: true,
                                    isAlertEmpty: false,
                                    isBadinputs: false});
                
                    this.setState({ info: response.data })
                    this.setState({data : this.state.info["data"]})
                    this.setState({labels : this.state.info["labels"]})
                }
                   /* console.log(this.state.info["data"])
                    console.log(this.state.info["labels"])*/
            }).catch(error => {
                console.log(error)
                this.setState({ isAlertSuccess: false,
                                isAlertEmpty: false,
                                isBadinputs: true})
            })
        }
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
                    <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                        <strong>{t("Admin.Warning.1")}</strong> {t("Admin.EmptyFields.1")}
                    </Alert>
                    <Alert color="warning" isOpen={this.state.isBadinputs}>
                        <strong>{t("Admin.Warning.1")}</strong> {t("Admin.BadInputs.1")}
                    </Alert>
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
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem value="bill" onClick={(e)=> (this.onChangeReportType(e))}>
                                    {t("Report.Bills.1")}
                                </DropdownItem>
                                <DropdownItem value="debit_payments" onClick={(e)=> (this.onChangeReportType(e))}>
                                    {t("Report.BPayments.1")}
                                </DropdownItem>
                                <DropdownItem value="operator_payments" onClick={(e)=> (this.onChangeReportType(e))}>
                                    {t("Report.OPayments.1")}
                                </DropdownItem>
                                <DropdownItem value ="income" onClick={(e)=> (this.onChangeReportType(e))} >
            
                                    {t("Report.Income.1")}
                                </DropdownItem>
                                <DropdownItem  value="consumption" onClick={(e)=> (this.onChangeReportType(e))}>
                                    {t("Report.Consumption.1")}
                                </DropdownItem>
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                            </center>
                            </Col>
                            <Col>
                            <center>
                            <FormGroup>
                                <br></br>
                                <UncontrolledDropdown nav>
                                <DropdownToggle className="dropdown-menu-arrow">
                                <Media className="align-items-center" >
                                    <span className="mb-0 text-sm font-weight-bold">
                                        {t("Report.Period.1")}
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle" style={{ background: 'none'}}>
                                    </span>
                                </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem value="monthly" onClick={(e)=> (this.onChangeReportTime(e))}>
                                    {t("Report.Monthly.1")}
                                </DropdownItem>
                                <DropdownItem value="yearly" onClick={(e)=> (this.onChangeReportTime(e))}>
                                    {t("Report.Yearly.1")}
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
                                disabled={this.state.disabled}
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
                                disabled={this.state.disabled}
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
                    <Bar
                        data={{
                            labels: this.state.labels,
                            datasets: [
                              {
                                label: '',
                                backgroundColor: "blue",
                                borderColor: 'rgba(0,0,0,0)',
                                borderWidth: 2,
                                data: this.state.data,
                              }
                            ]
                          }}
                        display="none"
                        options={{
                            title:{
                            display:true,
                            text:this.state.reportType,
                            fontSize:15
                            },
                            legend:{
                            display:true,
                            position:'right'
                            }
                        }}/>                        
                    </CardBody>
                </Card>                
            </Container>


                        

            
            
            </>
        );
    }
}

export default withTranslation()(managerReport);