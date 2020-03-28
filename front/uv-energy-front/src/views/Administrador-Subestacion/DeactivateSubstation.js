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

const substationDone = new L.icon({
    iconUrl: require("assets/img/theme/substationdone.png"),
    iconSize: new L.point(45,45)
})

const c = require('../constants')
const cookie = new Cookies();

class DeactivateSubstation extends React.Component {
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
            isAlertEmpty: false,
            isAlertSuccess: false,
            isModalModify: false,
            modifySubstation: true,
            submitClicked: '',
        }
        this.setData = this.setData.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.updateClicked = this.updateClicked.bind(this);
        this.action = this.action.bind(this);
        this.deactivate = this.deactivate.bind(this);
        this.modify = this.modify.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModalModify = this.closeModalModify.bind(this);
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
                alert("There are not substations registered");
              }
              else{
                this.setState({listSubstation: response.data}) 
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
                        alert("Select a substation first")
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
                        alert("Select a substation first")
                    }else{
                        this.setState({ isAlertSuccess: true})
                    }
                }
            }
        }
    }


    modify(){
        if ((this.state.substation.name === "") ||
        (this.state.substation.long === "") ||
        (this.state.substation.lat === "")){
            this.setState({isAlertEmpty: true})
        }else{
            axios.put(c.api + 'assets/Substation/'+this.state.substation.pk_substation+'/',
                    this.state.substation,
                    {headers: { Authorization: `Token ${this.state.credentials.token}`}})
            .then( response => {
                if ((this.state.substation.name === response.data.tension_level) ||
                    (this.state.substation.long === response.data.long) ||
                    (this.state.substation.lat === response.data.lat)){
                    this.setState({ isAlertEmpty: false,
                                    substation: response.data});
                }
            }).catch(error => console.log(error.response.data))
        }
        window.location.reload(true);
    }




    deactivate(){
        axios.put(c.api + 'assets/Substation/'+this.state.substation.pk_substation+'/',
                    {   
                        pk_substation: this.state.substation.pk_substation,
                        name: this.state.substation.name,
                        long: this.state.substation.long,
                        lat: this.state.substation.lat,
                        isActive: false,
                    },
                    {headers: { Authorization : `Token ${this.state.credentials.token}`}})
                        .then( response => {
                            console.log(response.data)
                            if (!this.state.substation.isActive){
                                this.setState({ isAlertEmpty: false,
                                                substation: response.data});
                            }
                        }).catch(error => console.log(error))
        window.location.reload(true);
    }
    closeModalModify(){
        this.setState({ isModalModify: !this.state.isModalModify})
        window.location.reload(true);
    }
    closeModal(){
        this.setState({ isAlertSuccess: !this.state.isAlertSuccess})
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
                        <h3 className="mb-0">Deactivate Substation</h3>
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
                                Name
                                </label>
                                <Input
                                className="form-control-alternative"
                                name="name"
                                placeholder="name"
                                type="text"
                                disabled = {this.state.modifySubstation}
                                value={this.state.substation.name}
                                onChange={this.onChangeName}
                                />
                            </FormGroup>
                            </Col>
                            </Row>
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
                                    {this.state.listSubstation.map((data, id) =>  
                                    <Marker 
                                        key={'substation-'+id}
                                        onClick={() => this.setData(data)}
                                        position={[parseFloat(data.lat), parseFloat(data.long)]}
                                        icon={substationDone}>
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
                        <strong>Deactivate electric transformer,</strong><br/>Are you sure?
                        </Alert>
                        <strong>Information:</strong>
                        <br></br>
                        <strong> No. Substation: </strong> {this.state.substation.pk_substation}<br/>
                        <strong> Name: </strong> {this.state.substation.name}
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
                        <strong>Modify substation,</strong><br/>Are you sure?
                        </Alert>
                        <strong>Information:</strong>
                        <br></br>
                        <strong> No. Substation: </strong> {this.state.substation.pk_substation}<br/>
                        <strong> New name: </strong> {this.state.substation.name}
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                    <Button
                        color="danger"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.modify}
                        >
                        Deactivate
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

export default DeactivateSubstation;