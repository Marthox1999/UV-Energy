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
import { textChangeRangeIsUnchanged } from "typescript";

const setPoint = new L.icon({
    iconUrl: require("assets/img/theme/transformador.svg"),
    iconSize: new L.point(30,30)
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
                reference: "aaa111",
                long: "0.0",
                lat: "0.0",
                fk_substation: -1
            },
            listSubstation : [],
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSubstation = this.getSubstation.bind(this);
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
        })
    }
    handleClick = (e) => {
        this.setState({ coord: {lat:e.latlng.lat, lng:e.latlng.lng}});
    }
    handleChange(e){
        const { name, value} = e.target;
        this.setState({
            electricTransformer: {
                [name]: value
            }
        },
        () => {console.log(this.state.electricTransformer)})
    }
    getSubstation(id,data){
        this.setState({ electricTransformer: {pk_substation: id, name: data.name}});
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
                                <DropdownItem key={'s-'+id} onClick={()=> this.getSubstation(id,data)}>
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                <Popup onClick={this.handleClick} position={this.state.coord}>Point: <pre>{JSON.stringify(this.state.coord, null, 2)}</pre></Popup>
                            </Marker>
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