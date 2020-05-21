import React from "react";
import { Link } from "react-router-dom";
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
    DropdownToggle,
    DropdownItem,
    Row,
    Col,
    DropdownMenu,
    UncontrolledDropdown,
    Media,
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

import { withTranslation } from 'react-i18next';
import i18n from '../../i18n.js';
import Cookies from 'universal-cookie';

const setPoint = new L.icon({
    iconUrl: require("assets/img/theme/transformador.png"),
    iconSize: new L.point(45,45)
})

const transformerDone = new L.icon({
    iconUrl: require("assets/img/theme/pointerdone.png"),
    iconSize: new L.point(45,45)
})

const c = require('../constants')

const cookie = new Cookies();

class AddElectricTransformer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            coord : {
                lat: 3.430283815687804,
                lng: 283.48211288452154,
            },
            electricTransformer : {
                pk_transformers: -1,
                tension_level: 0,
                reference: "",
                long: "",
                lat: "",
                isActive: true,
                fk_substation: -1
            },
            credentials: cookie.get('notCredentials'),
            listSubstation : [],
            transformers: [],
            isAlertEmpty: false,
            isAlertSuccess: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.onChangeReference = this.onChangeReference.bind(this);
        this.onChangeTensionLevel = this.onChangeTensionLevel.bind(this);
        this.getSubstation = this.getSubstation.bind(this);
        this.AddElectricTransformer = this.AddElectricTransformer.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        axios.get(c.api + 'assets/activeSubstation',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.count === 0){
                alert(i18n.t("ETransformer.NoSubstationRegistered.1"))
              }
              else{
                this.setState({listSubstation: response.data})
            }             
        }).catch(error => console.log(error))
        axios.get(c.api + 'assets/ActiveET',
                  {headers: { 'Authorization' : `Token ${this.state.credentials.token}`}})
        .then(response => {
            console.log(response.data)
            if (response.data.length === 0){
                alert(i18n.t("ETransformer.NoETRegistered.1"))
            }else{
                this.setState({transformers: response.data})
            }
        }).catch(error => console.log(error))
    }
    handleClick = (e) => {
        this.setState({ electricTransformer: {
                                                pk_transformers: -1,
                                                tension_level: parseInt(this.state.electricTransformer.tension_level),
                                                reference: this.state.electricTransformer.reference,
                                                long: e.latlng.lng.toString(),
                                                lat: e.latlng.lat.toString(),
                                                isActive: this.state.electricTransformer.isActive,
                                                fk_substation: this.state.electricTransformer.fk_substation
                                            }}, () => console.log(this.state.electricTransformer));
    }
    onChangeReference(e){
        this.setState({ electricTransformer: {
                                                pk_transformers: -1,
                                                tension_level: this.state.electricTransformer.tension_level,
                                                reference: e.target.value,
                                                long: this.state.electricTransformer.long,
                                                lat: this.state.electricTransformer.lat,
                                                isActive: this.state.electricTransformer.isActive,
                                                fk_substation: this.state.electricTransformer.fk_substation
                                            }})
    }
    onChangeTensionLevel(e){
        this.setState({ electricTransformer: {
                                                pk_transformers: -1,
                                                tension_level: e.target.value,
                                                reference: this.state.electricTransformer.reference,
                                                long: this.state.electricTransformer.long,
                                                lat: this.state.electricTransformer.lat,
                                                isActive: this.state.electricTransformer.isActive,
                                                fk_substation: this.state.electricTransformer.fk_substation
                                            }})
    }
    getSubstation(data){
        this.setState({ electricTransformer:{
                                                pk_transformers: -1,
                                                tension_level: this.state.electricTransformer.tension_level,
                                                reference: this.state.electricTransformer.reference,
                                                long: this.state.electricTransformer.long,
                                                lat: this.state.electricTransformer.lat,
                                                isActive: this.state.electricTransformer.isActive,
                                                fk_substation: data.pk_substation
                                            }});
    }
    AddElectricTransformer(e){
        e.preventDefault()
        if ((this.state.electricTransformer.tension_level <= 0) ||
            (this.state.electricTransformer.reference === "") ||
            (this.state.electricTransformer.long === "") ||
            (this.state.electricTransformer.lat === "") ||
            (this.state.electricTransformer.fk_substation === -1)){
            this.setState({isAlertEmpty: true})
        }else{
            if (parseFloat(this.state.electricTransformer.long) === 283.48211288452154  &&
                parseFloat(this.state.electricTransformer.lat) === 3.430283815687804){
                    alert(i18n.t("ETransformer.NoPointChoosen.1"));
                }
            else{
                axios.post(c.api + 'assets/ElectricTransformer/',
                        this.state.electricTransformer,
                        {headers: 
                            { 'Authorization' : `Token ${this.state.credentials.token}`}
                        })
                .then( response => {
                    if (response.data.pk_transformers !== -1){
                        this.setState({ isAlertSuccess: true,
                                        isAlertEmpty: false,
                                        electricTransformer: response.data});
                        
                    }
                }).catch(error => console.log(error))
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
                            <font size="5">{t("ETransformer.AddET.1")}</font>
                            <br></br>
                            <font size="3">{this.props.location.pathname}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.AddElectricTransformer}>
                        <h6 className="heading-small text-muted mb-4">
                        {t("ETransformer.GeneralInfo.1")}
                        </h6>
                        <div className="pl-lg-4">
                            <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>{t("ETransformer.Warning.1")}</strong> {t("ETransformer.EmptyFields.1")}
                            </Alert>
                            <Row>
                            <Col lg="3">
                            <center>
                            <FormGroup>
                                <br></br>
                                <UncontrolledDropdown nav>
                                <DropdownToggle className="dropdown-menu-arrow">
                                <Media className="align-items-center" >
                                    <span className="mb-0 text-sm font-weight-bold">
                                        {t("ETransformer.Substation.1")}  
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle" style={{ background: 'none'}}>
                                    <img
                                        alt="..."
                                        src={require("assets/img/theme/subestacion.svg")}
                                    />
                                    </span>
                                </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                { this.state.listSubstation.length > 0 ?
                                this.state.listSubstation.map((data, id) =>
                                <DropdownItem key={'s-'+id} onClick={()=> this.getSubstation(data)}>
                                    <i className=" ni ni-pin-3" />
                                    <span>{data.name}</span>
                                </DropdownItem>) : 
                                <DropdownItem to="#" tag={Link}>
                                <i className=" ni ni-fat-remove"/>
                                <span>{t("ETransformer.NoSubstation.1")}</span>
                                </DropdownItem>}
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                            </center>
                            </Col>
                            <Col lg="4">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                {t("ETransformer.Reference.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="reference"
                                placeholder={t("ETransformer.Reference.1")}
                                type="text"
                                value={this.state.electricTransformer.reference}
                                onChange={this.onChangeReference}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="4">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                {t("ETransformer.TensionLevel.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="tension_level"
                                placeholder={t("ETransformer.TensionLevel.1")}
                                type="number"
                                value={this.state.electricTransformer.tension_level}
                                onChange={this.onChangeTensionLevel}
                                />
                            </FormGroup>
                            </Col>
                            </Row>
                            <h2>{t("ETransformer.ChoosePoint.1")}</h2>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/transformador.png")}
                                style={{height: '35px', width: '35px'}}
                            /> {t("ETransformer.ETSet.1")}
                            <br/>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/pointerdone.png")}
                                style={{height: '35px', width: '35px'}}
                            />{t("ETransformer.ETActive.1")}
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
                                    {this.state.transformers.map((data, id) =>  
                                    <Marker key={'transformer-'+id} position={[parseFloat(data.lat), parseFloat(data.long)]} icon={transformerDone}>
                                    </Marker>)}
                                    <Marker
                                        onClick={this.handleClick}
                                        position={this.state.coord}
                                        draggable={true}
                                        icon={setPoint}>
                                        <Popup onClick={this.handleClick} position={this.state.coord}>{t("ETransformer.ChoosePoint.1")}<pre>{this.state.electricTransformer.lat}, {this.state.electricTransformer.long}</pre></Popup>
                                    </Marker>
                            </Map>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit">
                                {t("ETransformer.Add.1")}
                            </Button>
                        </div>
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
                        <strong>{t("ETransformer.Congrats.1")}</strong><br/>{t("ETransformer.ETCreated.1")}
                        </Alert>
                        <strong>{t("ETransformer.Information.1")}</strong>
                        <br></br>
                        <strong> {t("ETransformer.NoTransformer.1")}: </strong> {this.state.electricTransformer.pk_transformers}<br/>
                        <strong> {t("ETransformer.Reference.1")}: </strong> {this.state.electricTransformer.reference}<br/>
                        <strong> {t("ETransformer.TensionLevel.1")}: </strong> {this.state.electricTransformer.tension_level}<br/>
                        <strong> {t("ETransformer.Substation.1")}: </strong> {this.state.listSubstation.map((data, id) => data.pk_substation === this.state.electricTransformer.fk_substation ? data.name : "")}
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.closeModal}
                        >
                        {t("ETransformer.Close.1")}
                        </Button>
                    </div>
            </Modal>
            </Container>
        </>
        );
    }
}

export default withTranslation()(AddElectricTransformer);