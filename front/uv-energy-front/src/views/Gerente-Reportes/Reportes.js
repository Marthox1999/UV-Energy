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
            data: [],
            date:{
                year: '',
                month:'',
            },
            graphType:0 ,
            path: '',
            isAlertEmpty: false,
            isAlertSuccess: false,
            isBadinputs: false,
            credentials: cookie.get('notCredentials'),           
        }
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
    }
    componentDidMount(){
   
    }

    onChangeYear(e){
        this.setState({ date: {
                                                year: e.target.value,
                                                month: this.state.date.month,
                                            }})
    }
    onChangeMonth(e){
        this.setState({ date: {
                                                year: this.state.date.year,
                                                month: e.target.value,
                                            }})
    }

    onChangeGraphType(e){
        this.setState({
            /*1: barras
              2: linea */
            graphType: 1,
        })
    }
    /*
    GenerateReport(e){
        e.preventDefault()
        if ((this.state.date.month === "") ||
            (this.state.date.year === "")){
            console.log(this.state.date)
            this.setState({isAlertEmpty: true, isAlertSuccess: false, isBadinputs: false})
        }else{
            axios.post(c.api + 'users/user/',

                       {headers: { Authorization: `Token ${this.state.credentials.token}`}})
            .then( response => {
                console.log(response)
                if (response.data.username !== ""){
                    this.setState({ isAlertSuccess: true,
                                    isAlertEmpty: false,
                                    isBadinputs: false,
                                    admin : response.data});
                }
            }).catch(error => {
                console.log(error)
                this.setState({ isAlertSuccess: false,
                                isAlertEmpty: false,
                                isBadinputs: true})
            })
        }
    }
    */


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
                                {console.log(this.state.graphType)}
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem onClick={()=> this.onChangeGraphType()}>
                                    {t("Report.Bills.1")}
                                </DropdownItem>
                                <DropdownItem onClick={()=> this.onChangeGraphType()}>
                                    {t("Report.Payments.1")}
                                </DropdownItem>
                                <DropdownItem onClick={()=> this.onChangeGraphType()}>
                                    {console.log(this.state.graphType)}
                                    {t("Report.Income.1")}
                                </DropdownItem>
                                <DropdownItem onClick={()=> this.onChangeGraphType()}>
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
                                value={this.state.date.year}
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
                                value={this.state.date.month}
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
                    {console.log(this.state.date)}
                    {graph}                        
                    </CardBody>
                </Card>                
            </Container>


                        

            
            
            </>
        );
    }
}

export default withTranslation()(managerReport);