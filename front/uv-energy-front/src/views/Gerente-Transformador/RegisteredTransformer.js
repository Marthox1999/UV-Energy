import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
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



const transformerDone = new L.icon({
    iconUrl: require("assets/img/theme/pointerdone.png"),
    iconSize: new L.point(45,45)
})

const c = require('../constants')

const cookie = new Cookies();

class RegisteredElectricTransformer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            coord : {
                lat: 3.430283815687804,
                lng: 283.48211288452154,
            },
            credentials: cookie.get('notCredentials'),
            listSubstation : [],
            listTransformers: [],
        }
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
                this.setState({listTransformers: response.data})
            }
        }).catch(error => console.log(error))
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
                            <h3 className="mb-0">{t("ETransformer.AddET.1")}</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    
                        <div className="pl-lg-4">
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
                                    {this.state.listTransformers.map((data, id) =>  
                                    <Marker 
                                        key={'transformer-'+id} 
                                        position={[parseFloat(data.lat), parseFloat(data.long)]} 
                                        icon={transformerDone}>
                                        <Popup >
                                            
                                            <span> 
                                            <strong>{t("ETransformer.NoTransformer.1")}:</strong> {data.pk_transformers}<br/>
                                            <strong>{t("ETransformer.Reference.1")}:</strong> {data.reference}<br/>
                                            <strong>{t("ETransformer.TensionLevel.1")}:</strong> {data.tension_level}<br/>
                                            <strong> {t("ETransformer.Substation.1")}:</strong> {this.state.listSubstation.find(element => element.pk_substation === data.fk_substation).name}
                                            </span>
                                        </Popup>    
                                    </Marker>)}
                            </Map>
                        
                        </div>
                    
                    </CardBody>
                </Card>
            </Container>
        </>
        );
    }
}

export default withTranslation()(RegisteredElectricTransformer);