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
  Table,
  Alert,
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
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
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
        if(this.props.location.state === null){
            this.props = { state:{disabledAdmin: false, deletedAdmin: false, reload: false}}
        }else if(this.props.location.state.disabledAdmin){
            this.props = { state:{disabledAdmin: true, deletedAdmin: false, reload: true}}
        }else if(this.props.location.state.deletedAdmin){
            this.props = { state:{disabledAdmin: false, deletedAdmin: true, reload: true}}
        }

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
            path: '',
            listAdmins: [],
            isdisabledAdmin: this.props.state.disabledAdmin,
            isdeletedAdmin: this.props.state.deletedAdmin,
            credentials: cookie.get('notCredentials'),           
        }
    }
    componentDidMount(){
        console.log(this.state.credentials)
        if(this.state.credentials.position === 'ADMIN'){
            this.setState({path: '/admin/RUDDAdmin'})
        }else if(this.state.credentials.position === 'MGR'){
            this.setState({path: '/manager/RUDDAdminM'})

        }
        axios.get(c.api + 'users/activeAdmin/',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert("There are no registered administrators.")
              }
              else{
                this.setState({listAdmins: response.data})
                console.log(this.state.listAdmins)
                //console.log(response.config)
            }             
        }).catch(error => alert(error))
    }
    render() {
        const { t } = this.props
        return(
            <>
            <UVHeader />
            {/* Page content */}
            <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
            
            </>
        );
    }
}

export default withTranslation()(managerReport);