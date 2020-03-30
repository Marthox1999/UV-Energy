import React from "react";
/*import { Link } from "react-router-dom";*/
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
    Marker
  } from "react-leaflet";
  
import 'leaflet/dist/leaflet.css';
import Cookies from 'universal-cookie';

const transformerDone = new L.icon({
    iconUrl: require("assets/img/theme/pointerdone.png"),
    iconSize: new L.point(45,45)
})

const c = require('../constants')
const cookie = new Cookies();

class DeactivateElectricTransformer extends React.Component {
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
        this.modify = this.modify.bind(this);
        this.deactivate = this.deactivate.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModalModify = this.closeModalModify.bind(this);
    }
    componentDidMount(){
        if (typeof this.state.credentials === 'undefined'){
            alert("no token");
            this.props.history.push('/auth/login');
        }
        axios.get(c.api + 'assets/ActiveET',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then(response => {
            if (response.data.count === 0){
                alert("There are not electric transformers registered.")
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
                        alert("Select a substation first")
                    }else{
                        this.setState({modify: !this.state.modify})
                    }

                }else{
                    this.setState({isModalModify: !this.state.isModalModify})
                }
            }else{
                if (this.state.submitClicked === 'deactivate'){
                    if (this.state.electricTransformer.fk_substation === -1){
                        alert("Select a substation first")
                    }else{
                        this.setState({ isAlertSuccess: !this.state.isAlertSuccess})
                    }
                }
            }
        }
    }
    modify(){
        if ((this.state.electricTransformer.tension_level === 0) ||
        (this.state.electricTransformer.reference === "") ||
        (this.state.electricTransformer.long === "") ||
        (this.state.electricTransformer.lat === "") ||
        (this.state.electricTransformer.fk_substation === -1)){
            this.setState({isAlertEmpty: true})
        }else{
            axios.put(c.api + 'assets/ElectricTransformer/'+this.state.electricTransformer.pk_transformers+'/',
                    this.state.electricTransformer,
                    {headers: { Authorization: `Token ${this.state.credentials.token}`}})
            .then( response => {
                if ((this.state.electricTransformer.tension_level === response.data.tension_level) ||
                    (this.state.electricTransformer.reference === response.data.reference) ||
                    (this.state.electricTransformer.long === response.data.long) ||
                    (this.state.electricTran0sformer.lat === response.data.lat) ||
                    (this.state.electricTransformer.fk_substation === response.data.fk_substation)){
                    this.setState({ isAlertEmpty: false,
                                    electricTransformer: response.data});
                }
            }).catch(error => console.log(error.response.data))
        }
        window.location.reload(true);
    }
    deactivate(){
        axios.put(c.api + 'assets/ElectricTransformer/'+this.state.electricTransformer.pk_transformers+'/',
                {
                    pk_transformers: this.state.electricTransformer.pk_transformers,
                    tension_level: this.state.electricTransformer.tension_level,
                    reference: this.state.electricTransformer.reference,
                    long: this.state.electricTransformer.long,
                    lat: this.state.electricTransformer.lat,
                    isActive: false,
                    fk_substation: this.state.electricTransformer.fk_substation
                },
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
                        .then( response => {
                            console.log(response.data)
                            if (!response.data.isActive){
                                alert("falta modal bonito")
                                this.setState({ isAlertEmpty: false,
                                                electricTransformer: response.data});
                            }
                        }).catch(error => console.log(error))
        //window.location.reload(true);
    }
    closeModal(){
        this.setState({ isAlertSuccess: !this.state.isAlertSuccess})
        window.location.reload(true);
    }
    closeModalModify(){
        this.setState({ isModalModify: !this.state.isModalModify})
        window.location.reload(true);
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
                        <font size="5">Deactivate Electric Transformer</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.action}>
                        <h6 className="heading-small text-muted mb-4">
                        General Information
                        </h6>
                        <div className="pl-lg-4">
                            <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>Warning!</strong> There are empty fields!
                            </Alert>
                            <Row>
                            <Col lg="4">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Substation
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="substation"
                                placeholder="substation"
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
                                Reference
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="reference"
                                placeholder="reference"
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
                                Tension Level
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="tension_level"
                                placeholder="tension"
                                type="number"
                                disabled = {this.state.modify}
                                value={this.state.electricTransformer.tension_level}
                                onChange={this.onChangeTensionLevel}
                                />
                            </FormGroup>
                            </Col>
                            </Row>
                            <img 
                                alt="..."
                                src={require("assets/img/theme/pointerdone.png")}
                                style={{height: '35px', width: '35px'}}
                            /> Electric transformers active
                            <p/>
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
                        <div className="text-center">
                            <Row>
                                <Col lg="6">
                                    <Button className="mt-4" name="modify" onClick={()=>this.updateClicked('modify')} color="primary" type="submit">
                                        Modify
                                    </Button>
                                </Col>
                                <Col lg="6">
                                    <Button className="mt-4" name="deactivate" onClick={()=>this.updateClicked('deactivate')} color="primary" type="submit">
                                        Deactivate
                                    </Button>
                                </Col>
                            </Row>
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
                        <Alert color="warning">
                        <strong>Deactivate electric transformer,</strong><br/>are you sure?
                        </Alert>
                        <strong>Information:</strong>
                        <br></br>
                        <strong> No. Transformer: </strong> {this.state.electricTransformer.pk_transformers}<br/>
                        <strong> Reference: </strong> {this.state.electricTransformer.reference}<br/>
                        <strong> Tension Level: </strong> {this.state.electricTransformer.tension_level}<br/>
                        <strong> Substation: </strong> {this.state.listSubstation.map((data, id) => id !== this.state.electricTransformer.fk_substation ? data.name : <p></p>)}
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                    <Button
                        color="danger"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.deactivate}
                        >
                        Deactivate
                        </Button>
                        <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.closeModal}
                        >
                        Close
                        </Button>
                    
                    </div>
            </Modal>
            <Modal
                    className="modal-dialog-centered"
                    color="success"
                    isOpen={this.state.isModalModify}
                    >
                        <ModalBody>
                    <div className="modal-body">
                        <Alert color="primary">
                        <strong>Modify electric transformer</strong>
                        </Alert>
                        <strong>Information:</strong>
                        <br></br>
                        <strong> No. Transformer: </strong> {this.state.electricTransformer.pk_transformers}<br/>
                        <strong> Reference: </strong> {this.state.electricTransformer.reference}<br/>
                        <strong> Tension Level: </strong> {this.state.electricTransformer.tension_level}<br/>
                        <strong> Substation: </strong> {this.state.listSubstation.map((data, id) => id !== this.state.electricTransformer.fk_substation ? data.name : <p></p>)}
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                    <Button
                        color="danger"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.modify}
                        >
                        Modify
                        </Button>
                        <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.closeModalModify}
                        >
                        Close
                        </Button>
                    
                    </div>
            </Modal>
            </Container>
        </>
        );
    }
}

export default DeactivateElectricTransformer;