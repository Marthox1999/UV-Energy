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
  
import 'leaflet/dist/leaflet.css';

const setPoint = new L.icon({
    iconUrl: require("assets/img/theme/transformador.png"),
    iconSize: new L.point(45,45)
})

const transformerDone = new L.icon({
    iconUrl: require("assets/img/theme/pointerdone.png"),
    iconSize: new L.point(45,45)
})

const c = require('../constants')

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
                tension_level: -1,
                reference: '',
                long: -1,
                lat: -1,
                fk_substation: -1
            },
            listSubstation : [],
            transformers: [],
            isAlertEmpty: false,
            isAlertSuccess: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.getSubstation = this.getSubstation.bind(this);
        this.AddElectricTransformer = this.AddElectricTransformer.bind(this);
    }
    componentDidMount(){
        axios.get(c.api + 'assets/Substation')
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
              }
              else{
                this.setState({listSubstation: response.data})
            }             
        }).catch(error => alert(error))
        axios.get(c.api + 'assets/ElectricTransformer')
        .then(response => {
            if (response.data <= 0){
                alert("No hay transformadores registrados.")
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
                                                long: e.latlng.lng,
                                                lat: e.latlng.lat,
                                                fk_substation: this.state.electricTransformer.fk_substation
                                            }});
    }
    getSubstation(data){
        this.setState({ electricTransformer:{
                                                pk_transformers: -1,
                                                tension_level: -1,
                                                reference: '',
                                                long: this.state.electricTransformer.long,
                                                lat: this.state.electricTransformer.lat,
                                                fk_substation: data.pk_substation
                                            }});
    }
    AddElectricTransformer(e){
        this.setState({ electricTransformer:{
            pk_transformers: -1,
            tension_level: parseInt(e.target.tension_level.value),
            reference: e.target.reference.value,
            long: this.state.electricTransformer.long,
            lat: this.state.electricTransformer.lat,
            fk_substation: this.state.electricTransformer.fk_substation
        }});
        if ((this.state.electricTransformer.tension_level === -1) ||
            (this.state.electricTransformer.reference === '') ||
            (this.state.electricTransformer.long === -1) ||
            (this.state.electricTransformer.lat === -1) ||
            (this.state.electricTransformer.fk_substation === -1)){
            console.log(this.state.electricTransformer)
            this.setState({isAlertEmpty: true})
        }else{
            axios.post(c.api + 'assets/ElectricTransformer/',
                       this.state.electricTransformer)
            .then( response => {
                if (response.data.pk_transformers !== -1){
                    this.setState({ isAlertSuccess: true, isAlertEmpty: false});
                }
            }).catch(error => console.log(error))
        }
        e.preventDefault()
    }
    render() {
        return(
        <>
        <UVHeader/>
            <Container className="mt--7" fluid>
            <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">Add Electric Transformer</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.AddElectricTransformer}>
                        <h6 className="heading-small text-muted mb-4">
                        General Information
                        </h6>
                        <div className="pl-lg-4">
                            <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>Warning!</strong> There are empty fields!
                            </Alert>
                            <Alert color="success" isOpen={this.state.isAlertSuccess}>
                                <strong>Congratulations!</strong> The electric transformer was created!
                            </Alert>
                            <FormGroup>
                                <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0">
                                <Media className="align-items-center" >
                                    <span className="mb-0 text-sm font-weight-bold">
                                        Substation  
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
                                <span>There aren't substations</span>
                                </DropdownItem>}
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Reference
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="reference"
                                placeholder="reference"
                                type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                Tension Level
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="tension_level"
                                placeholder="tension"
                                type="number"
                                />
                            </FormGroup>
                            <h2>Choose the point for the electric transformer</h2>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/transformador.png")}
                                style={{height: '35px', width: '35px'}}
                            /> Electric transformer to set
                            <br/>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/pointerdone.png")}
                                style={{height: '35px', width: '35px'}}
                            /> Electric transformers active
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
                                    <Marker
                                        onClick={this.handleClick}
                                        position={this.state.coord}
                                        draggable={true}
                                        icon={setPoint}>
                                        <Popup onClick={this.handleClick} position={this.state.coord}>Point choosen: <pre>{this.state.electricTransformer.lat}, {this.state.electricTransformer.long}</pre></Popup>
                                    </Marker>
                                    {this.state.transformers.map((data, id) =>  
                                    <Marker key={'transformer-'+id} position={[parseFloat(data.lat), parseFloat(data.long)]} icon={transformerDone}>
                                        <Popup>
                                            <span> {data.name} </span>
                                        </Popup>
                                    </Marker>)}
                            </Map>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit">
                                Add
                            </Button>
                        </div>
                        </div>
                    </Form>
                    </CardBody>
                </Card>
            </Container>
        </>
        );
    }
}

export default AddElectricTransformer;