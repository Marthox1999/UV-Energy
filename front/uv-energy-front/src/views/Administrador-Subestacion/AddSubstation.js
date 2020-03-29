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
    }
    componentDidMount(){
        axios.get(c.api + 'assets/activeSubstation',
              {headers: { 'Authorization' : `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.count === 0){
                alert("There are not substations registered");
              }
              else{
                console.log(response)
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
        console.log(this.state.substation)
        e.preventDefault()
        if ((this.state.substation.name === "") ||
            (this.state.substation.long === "") ||
            (this.state.substation.lat === "")){
            console.log(this.state.substation)
            this.setState({isAlertEmpty: true})
        }else{
            axios.post(c.api + 'assets/Substation/',
                       this.state.substation,
                       {headers: { 'Authorization' : `Token ${this.state.credentials.token}`}})
            .then( response => {
                console.log(response.error)
                if (response.data.pk_substation !== -1){
                    this.setState({
                        isAlertSuccess: true,
                        isAlertEmpty: false,
                        substation: {
                            pk_substation: -1,
                            name: "",
                            long: "",
                            lat: "",
                            isActive: true
                        }});
                }
            }).catch(error => console.log(error.response.request.responseText))
        }
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
                        <h3 className="mb-0">Add Substation</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.AddSubstation}>
                        <h6 className="heading-small text-muted mb-4">
                        General Information
                        </h6>
                        <div className="pl-lg-4">
                            <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>Warning!</strong> There are empty fields!
                            </Alert>
                            <Alert color="success" isOpen={this.state.isAlertSuccess}>
                                <strong>Congratulations!</strong> The substation was created!
                            </Alert>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                Name
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="name"
                                placeholder="name"
                                type="text"
                                value={this.state.substation.name}
                                onChange={this.onChangeName}
                                />
                            </FormGroup>

                            <h2>Choose the point for the electric transformer</h2>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/substationmove.png")}
                                style={{height: '35px', width: '35px'}}
                            /> Substation to set
                            <br/>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/substationdone.png")}
                                style={{height: '35px', width: '35px'}}
                            /> Substations active
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
                                        <Popup onClick={this.handleClick} position={this.state.coord}>Point choosen: <pre>{this.state.substation.lat}, {this.state.substation.long}</pre></Popup>
                                    </Marker>
                            </Map>
                        
                        </div>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit">
                                Add
                            </Button>
                        </div>
                    </Form>
                    </CardBody>
                </Card>
            </Container>
        </>
        );
    }
}

export default AddSubstation;