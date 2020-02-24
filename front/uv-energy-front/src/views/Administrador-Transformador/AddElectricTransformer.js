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
    Media
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
    iconUrl: require("assets/img/theme/transformador.svg"),
    iconSize: new L.point(25,25)
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
            listSubstation : []

        }
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount(){
        axios.get(c.api + 'assets/Substation')
        .then( response => {
            console.log(response)
            if( response.data.error != null){
                alert(response.data.error);
              }
              else{
                this.setState({listSubstation: response.data.models})
                console.log(this.state.listSubstation)
            }             
        })
    }
    handleClick = (e) => {
        console.log(e.latlng)
        this.setState({ coord: {lat:e.latlng.lat, lng:e.latlng.lng}});
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
                        <h3 className="mb-0">Agregar Transformador</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                        Informacion General
                        </h6>
                        <div className="pl-lg-4">
                            <FormGroup>
                                <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0">
                                <Media className="align-items-center" >
                                    <span className="mb-0 text-sm font-weight-bold">
                                        Subestación  
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
                                <DropdownItem className="noti-title" header tag="div">
                                    <h6 className="text-overflow m-0">Subestación 1</h6>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-single-02" />
                                    <span>Subestación 1</span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-settings-gear-65" />
                                    <span>Subestación 2</span>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                    <i className="ni ni-user-run" />
                                    <span>Logout</span>
                                </DropdownItem>
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Referencia
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder="reference"
                                type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                Nivel de Tensión
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder="Tensión"
                                type="number"
                                />
                            </FormGroup>
                            <Map
                                id="map-canvas"
                                style={{width: '100%',height: '400px'}}
                                center={[3.430283815687804, 283.48211288452154]}
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
                                <Popup onClick={this.handleClick} position={this.state.coord}>¿Seguro? Punto: <pre>{JSON.stringify(this.state.coord, null, 2)}</pre></Popup>
                            </Marker>
                            </Map>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="button">
                                Agregar
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