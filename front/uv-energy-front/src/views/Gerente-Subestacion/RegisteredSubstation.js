import React from "react";
import axios from 'axios';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Alert
  } from "reactstrap";

import L from 'leaflet';

// core components
import UVHeader from "components/Headers/UVHeader.js";


// map
import {
    Map,
    TileLayer,
    Marker,
    Popup
  } from "react-leaflet";

import { withTranslation } from 'react-i18next';
import i18n from '../../i18n.js';
import Cookies from 'universal-cookie';



const substationDone = new L.icon({
    iconUrl: require("assets/img/theme/substationdone.png"),
    iconSize: new L.point(45,45)
})

const c = require('../constants')

const cookie = new Cookies();

class RegisteredSubstation extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.location)
        this.state = {
            coord : {
                lat: 3.430283815687804,
                lng: 283.48211288452154,
            },
            substation: {
                pk_substation: -1,
                name: "",
                long: "",
                lat: "",
                isActive: true
            },
            credentials: cookie.get('notCredentials'),
            listSubstation : [],
            listTransformers: [],
            isAlertEmpty: false,
            isAlertSuccess: false,
            isModalModify: false,
            isModalConfirm: false,
            modifySubstation: true,
            submitClicked: '',
        }
        this.setData = this.setData.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.updateClicked = this.updateClicked.bind(this);
        this.action = this.action.bind(this);
    }
    componentDidMount(){
        if (typeof this.state.credentials === 'undefined'){
            alert("no token");
            this.props.history.push('/auth/login');
        }
        axios.get(c.api + 'assets/activeSubstation',
              {headers: { Authorization : `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.length === 0){
                alert(i18n.t("Substation.NoSubstationRegistered.1"))
              }
              else{
                this.setState({listSubstation: response.data}) 
                console.log(this.state.listSubstation)
            }             
        }).catch(error => console.log(error))

        axios.get(c.api + 'assets/ActiveET',
              {headers: { Authorization : `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.length > 0){
                this.setState({listTransformers: response.data})
            }             
        }).catch(error => console.log(error))
    }
    setData = (data) => {
        this.setState({substation: data, modifySubstation: true})
    }

    onChangeName(e){
        this.setState({ substation: {
            pk_substation: this.state.substation.pk_substation,
            name: e.target.value,
            long: this.state.substation.long,
            lat: this.state.substation.lat,
            isActive: this.state.substation.isActive
        }})
    }
    updateClicked(name){
        this.setState({submitClicked: name})
    }
    action(e){
        e.preventDefault()
        if(this.state.submitClicked === ''){
            alert("que haces aqui 0-0")
        }
        else{
            if (this.state.submitClicked === 'modify'){
                if (this.state.modifySubstation){
                    if (this.state.substation.name === ""){
                        alert(i18n.t("Substation.SelectSubstation.1"))
                    }else{
                        this.setState({
                            modifySubstation: !this.state.modifySubstation
                        })
                    }
                }else{
                    this.setState({isModalModify: !this.state.isModalModify})
                }
            }else{
                if (this.state.submitClicked === 'deactivate'){
                    if (this.state.substation.name === ""){
                        alert(i18n.t("Substation.SelectSubstation.1"))
                    }else{
                        this.setState({ isAlertSuccess: true})
                    }
                }
            }
        }
    }
    render() {
        const { t } = this.props
        return(
        <>
        <UVHeader/>
            <Container className="mt--7" fluid>
            <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <font size="5">{t("Substation.Registered.1")}</font>
                        <br></br>
                        <font size="3">{this.props.location.pathname}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.action}>
                        <h6 className="heading-small text-muted mb-4">
                        {t("Substation.GeneralInfo.1")}
                        </h6>
                        <div className="pl-lg-4">
                            <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>{t("Substation.Warning.1")}</strong> {t("Substation.EmptyFields.1")}
                            </Alert>
                            <Row>
                            <Col lg="4">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                {t("Substation.Name.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="name"
                                placeholder={t("Substation.Name.1")}
                                type="text"
                                disabled = {this.state.modifySubstation}
                                value={this.state.substation.name}
                                onChange={this.onChangeName}
                                />
                            </FormGroup>
                            <h2> {t("Substation.ChoosePoint.1")} </h2>
                            </Col>
                            </Row>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/pointerdone.png")}
                                style={{height: '35px', width: '35px'}}
                            /> {t("Substation.SubstationActive.1")}
                            <Map
                                id="map-canvas"
                                style={{width: '100%',height: '350px'}}
                                center={[this.state.coord.lat, this.state.coord.lng]}
                                zoom={12}
                                onClick={this.handleClick}>
                                >
                                <TileLayer
                                    attribution={'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
                                    url={'http://{s}.tile.osm.org/{z}/{x}/{y}.png'}
                                />
                                    {this.state.listSubstation.map((data, id) =>  
                                    <Marker 
                                        key={'substation-'+id}
                                        onClick={() => this.setData(data)}
                                        position={[parseFloat(data.lat), parseFloat(data.long)]}
                                        icon={substationDone}>
                                    </Marker>)}
                            </Map>
                        </div>
                    </Form>
                    </CardBody>
                </Card>                   
            </Container>
        </>
        );
    }
}

export default withTranslation()(RegisteredSubstation);