import React from "react";
import axios from 'axios';
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
  
import 'leaflet/dist/leaflet.css';


import { withTranslation } from 'react-i18next';
import i18n from '../../i18n.js';
import Cookies from 'universal-cookie';

const setPoint = new L.icon({
    iconUrl: require("assets/img/theme/substationmove.png"),
    iconSize: new L.point(45,45)
})

const substationDone = new L.icon({
    iconUrl: require("assets/img/theme/substationdone.png"),
    iconSize: new L.point(45,45)
})

const c = require('../constants')

const cookie = new Cookies();

class AddSubstation extends React.Component {
    constructor(props){
        super(props);
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
            isAlertEmpty: false,
            isAlertSuccess: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.AddSubstation = this.AddSubstation.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        axios.get(c.api + 'assets/activeSubstation',
              {headers: { 'Authorization' : `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.length === 0){
                alert(i18n.t("Substation.NoSubstationRegistered.1"))
              }
              else{
                this.setState({listSubstation: response.data}) 
            }             
        }).catch(error => console.log(error))
    }
    handleClick = (e) => {
        this.setState({ substation: {
            pk_substation: -1,
            name: this.state.substation.name,
            long: e.latlng.lng.toString(),
            lat: e.latlng.lat.toString(),
            isActive: this.state.substation.isActive
        }}, () => console.log(this.state.substation));
    }
    onChangeName(e){
        this.setState({ substation: {
            pk_substation: -1,
            name: e.target.value,
            long: this.state.substation.long,
            lat: this.state.substation.lat,
            isActive: this.state.substation.isActive
        }})
    }
    AddSubstation(e){
        
        e.preventDefault()
        if ((this.state.substation.name === "") ||
            (this.state.substation.long === "") ||
            (this.state.substation.lat === "")){
            this.setState({isAlertEmpty: true})
        }else{
            if (parseFloat(this.state.substation.long) === 283.48211288452154  &&
                parseFloat(this.state.substation.lat) === 3.430283815687804){
                    alert(i18n.t("Substation.NoPointChoosen.1"));
            }else{
                axios.post(c.api + 'assets/Substation/',
                    this.state.substation,
                    {headers: { 'Authorization' : `Token ${this.state.credentials.token}`}})
                .then( response => {
                    console.log(response)
                    if (response.data.pk_substation !== -1){
                        this.setState({
                            isAlertSuccess: true,
                            isAlertEmpty: false,
                            substation: response.data});
                    }
                }).catch(
                    error => {
                        alert(i18n.t("Substation.AlreadyExists.1"));
                        console.log(error.response.request.responseText);
                    }
                )
            }
        }
    }

    closeModal(){
        this.setState({ isAlertSuccess: !this.state.isAlertSuccess})
        window.location.reload(true);
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
                        <h3 className="mb-0"> {t("Substation.AddSubstation.1")}</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.AddSubstation}>
                        <h6 className="heading-small text-muted mb-4">
                        {t("Substation.GeneralInfo.1")}
                        </h6>
                        <div className="pl-lg-4">
                            <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>{t("Substation.Warning.1")}</strong> {t("Substation.EmptyFields.1")}
                            </Alert>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                {t("Substation.Name.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="name"
                                placeholder={t("Substation.Name.1")}
                                type="text"
                                value={this.state.substation.name}
                                onChange={this.onChangeName}
                                />
                            </FormGroup>

                            <h2> {t("Substation.ChoosePoint.1")} </h2>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/substationmove.png")}
                                style={{height: '35px', width: '35px'}}
                            /> {t("Substation.SubstationSet.1")}
                            <br/>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/substationdone.png")}
                                style={{height: '35px', width: '35px'}}
                            /> {t("Substation.SubstationActive.1")}
                            <Map
                                id="map-canvas"
                                style={{width: '100%',height: '350px'}}
                                center={[this.state.coord.lat, this.state.coord.lng]}
                                zoom={12}
                                onClick={this.handleClick}>
                                
                                <TileLayer
                                    attribution={'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
                                    url={'http://{s}.tile.osm.org/{z}/{x}/{y}.png'}
                                />
                                    {this.state.listSubstation.map((data, id) =>  
                                    <Marker
                                        key={'substation-'+id}
                                        position={[parseFloat(data.lat), parseFloat(data.long)]}
                                        icon={substationDone}>
                                        <Popup>
                                            <span> {data.name} </span>
                                        </Popup>
                                    </Marker>)}
                                    <Marker
                                        onClick={this.handleClick}
                                        position={this.state.coord}
                                        draggable={true}
                                        icon={setPoint}>
                                        <Popup onClick={this.handleClick} position={this.state.coord}> {t("Substation.ChoosenPoint.1")} <pre>{this.state.substation.lat}, {this.state.substation.long}</pre></Popup>
                                    </Marker>
                            </Map>
                        
                        </div>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit">
                                {t("Substation.Add.1")}
                            </Button>
                        </div>
                    </Form>
                    </CardBody>
                </Card>
                <Modal
                    className="modal-dialog-centered"
                    color="success"
                    isOpen={this.state.isAlertSuccess}
                    >
                    <ModalBody>
                    <div className="modal-body">
                        <Alert color="success">
                        <strong>{t("Substation.Congrats.1")}</strong><br/> {t("Substation.SubstationCreated.1")}
                        </Alert>
                        <strong>{t("Substation.Information.1")}</strong>
                        <br></br>
                        <strong> {t("Substation.NSubstation.1")}: </strong> {this.state.substation.pk_substation}<br/>
                        <strong> {t("Substation.Name.1")}: </strong> {this.state.substation.name}
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.closeModal}
                        >
                        {t("Substation.Close.1")}
                        </Button>
                    </div>
                </Modal>
            </Container>
        </>
        );
    }
}

export default withTranslation()(AddSubstation);