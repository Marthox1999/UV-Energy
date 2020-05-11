import React from "react";
/*import { Link } from "react-router-dom";*/
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
    Alert,
  } from "reactstrap";

import L from 'leaflet';

// core components
import UVHeader from "components/Headers/UVHeader.js";


// map
import {
    Map,
    TileLayer,
    Marker
  } from "react-leaflet";
  
import 'leaflet/dist/leaflet.css';
import Cookies from 'universal-cookie';
import i18n from '../../i18n.js';
import { withTranslation } from 'react-i18next';

const transformerDone = new L.icon({
    iconUrl: require("assets/img/theme/pointerdone.png"),
    iconSize: new L.point(45,45)
})

const c = require('../constants')
const cookie = new Cookies();

class ModifyElectricTransformer extends React.Component {
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
            isModalModify: false,
            modify: true,
            submitClicked: '',
        }
        this.setData = this.setData.bind(this);
        this.updateClicked = this.updateClicked.bind(this);
        this.onChangeReference = this.onChangeReference.bind(this);
        this.onChangeTensionLevel = this.onChangeTensionLevel.bind(this);
        this.getSubstation = this.getSubstation.bind(this);
        this.action = this.action.bind(this);
    }
    componentDidMount(){
        if (typeof this.state.credentials === 'undefined'){
            alert("no token");
            this.props.history.push('/auth/login');
        }
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
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then(response => {
            if (response.data.count === 0){
                alert(i18n.t("ETransformer.NoETRegistered.1"))
            }else{
                this.setState({transformers: response.data})
            }
        }).catch(error => console.log(error.response))
    }
    setData = (data) => {
        this.setState({electricTransformer: data, modifyReference: true, modifySubstation: true, modifyTensionLevel: true})
    }
    onChangeReference(e){
        this.setState({ electricTransformer: {
                                                pk_transformers: this.state.electricTransformer.pk_transformers,
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
                                                pk_transformers: this.state.electricTransformer.pk_transformers,
                                                tension_level: e.target.value,
                                                reference: this.state.electricTransformer.reference,
                                                long: this.state.electricTransformer.long,
                                                lat: this.state.electricTransformer.lat,
                                                isActive: this.state.electricTransformer.isActive,
                                                fk_substation: this.state.electricTransformer.fk_substation
                                            }})
    }
    onChangeSubstation(e){
        this.setState({ electricTransformer: {
                                                pk_transformers: this.state.electricTransformer.pk_transformers,
                                                tension_level: this.state.electricTransformer.tension_level,
                                                reference: this.state.electricTransformer.reference,
                                                long: this.state.electricTransformer.long,
                                                lat: this.state.electricTransformer.lat,
                                                isActive: this.state.electricTransformer.isActive,
                                                fk_substation: e.target.value,
                                            }})        
    }
    getSubstation(data){
        this.setState({ electricTransformer:{
                                                pk_transformers: this.state.electricTransformer.pk_transformers,
                                                tension_level: this.state.electricTransformer.tension_level,
                                                reference: this.state.electricTransformer.reference,
                                                long: this.state.electricTransformer.long,
                                                lat: this.state.electricTransformer.lat,
                                                isActive: this.state.electricTransformer.isActive,
                                                fk_substation: data.pk_substation
                                            }});
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
                if (this.state.modify){
                    if (this.state.electricTransformer.fk_substation === -1){
                        alert(i18n.t("ETransformer.SelectSubstation.1"))
                    }else{
                        this.setState({modify: !this.state.modify})
                    }

                }else{
                    this.setState({isModalModify: !this.state.isModalModify})
                }
            }else{
                if (this.state.submitClicked === 'deactivate'){
                    if (this.state.electricTransformer.fk_substation === -1){
                        alert(i18n.t("ETransformer.SelectSubstation.1"))
                    }else{
                        this.setState({ isAlertSuccess: !this.state.isAlertSuccess})
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
                        <h3 className="mb-0">{t("ETransformer.ModifyET.1")}</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.action}>
                        <h6 className="heading-small text-muted mb-4">
                        {t("ETransformer.GeneralInfo.1")}
                        </h6>
                        <div className="pl-lg-4">
                            <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>{t("ETransformer.Warning.1")}</strong>{t("ETransformer.EmptyFields.1")}
                            </Alert>
                            <Row>
                            <Col lg="4">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                {t("ETransformer.Substation.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="substation"
                                placeholder={t("ETransformer.Substation.1")}
                                type="text"
                                disabled = {true}
                                value={this.state.electricTransformer.fk_substation}
                                onChange={this.onChangeSubstation}
                                />
                            </FormGroup>
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
                                maxLength="8"
                                disabled = {this.state.modify}
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
                                name={t("ETransformer.TensionLevel.1")}
                                placeholder="tension"
                                type="number"
                                disabled = {this.state.modify}
                                value={this.state.electricTransformer.tension_level}
                                onChange={this.onChangeTensionLevel}
                                />
                            </FormGroup>
                            </Col>
                            </Row>
                            <h2>{t("ETransformer.ChoosePoint.1")}</h2>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/pointerdone.png")}
                                style={{height: '35px', width: '35px'}}
                            /> {t("ETransformer.ETActive.1")}
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
                                    <Marker 
                                        key={'transformer-'+id}
                                        onClick={() => this.setData(data)}
                                        position={[parseFloat(data.lat), parseFloat(data.long)]}
                                        icon={transformerDone}>
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

export default withTranslation()(ModifyElectricTransformer);