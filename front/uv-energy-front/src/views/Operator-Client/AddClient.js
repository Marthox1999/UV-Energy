import React from "react";
import { Link } from "react-router-dom";

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
  ModalBody,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Media,
  UncontrolledDropdown,
} from "reactstrap";
// core components
import UVHeader from "components/Headers/UVHeader.js";
import Axios from "axios";
import i18n from '../../i18n.js';
import { withTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

const c = require('../constants')
const cookie = new Cookies();

class AddClient extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listET: [],
            listStratum:[1,2,3,4,5,6],
            listCity:[['Bogotá','BOG'],
                      ['Medellín','MED'],
                      ['Cali','CALI'],
                      ['Jamundi','JAM'],
                      ['Barranquilla','B/Q'],
                      ['Cartagena','CART'],
                      ['Cucuta','CUC'],
                      ['Soledad','SOL'],
                      ['Ibague','IBG'],
                      ['Bucaramanga','BCM'], 
                      ['Soacha','SOAC']],
            listUso:[['Residencial', 'RES'],
                 ['Industrial', 'IND']],
            request: {
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                is_active: true,
                cellphone: "",
                position: "CLT",
                address: "",
                stratum: -1,
                city: "",
                use: "",
                pk_transformers: -1,
                client: ""
            },
            selectedET:i18n.t("Sidebar.ElectricTransformer.1"),
            selectedCity:i18n.t("Meter.city.1"),
            selectedUse:i18n.t("Meter.use.1"),
            selectedStratum:i18n.t("Meter.stratum.1"),
            isAlertEmpty: false,
            isAlertSuccess: false,
            isBadinputs: false,
            credentials: cookie.get('notCredentials'),
        }
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUsername= this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCellphone = this.onChangeCellphone.bind(this);
        this.onChangeAddres = this.onChangeAddres.bind(this);
        this.AddClient = this.AddClient.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    /* Agregar ET Activos */
    componentDidMount(){
        Axios.get(c.api + 'assets/ActiveET',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.count === 0){
                alert(i18n.t("ETransformer.NoSubstationRegistered.1"))
              }
              else{
                console.log(response.data)
                this.setState({listET: response.data})
            }             
        }).catch(error => console.log(error))
    }
    onChangeFirstName(e){
        this.setState({ request: {
            username: this.state.request.username,
            password: this.state.request.password,
            email: this.state.request.email,
            first_name: e.target.value,
            last_name: this.state.request.last_name,
            is_active: true,
            cellphone: this.state.request.cellphone,
            position: "CLT",
            address: this.state.request.address,
            stratum: this.state.request.stratum,
            city: this.state.request.city,
            use: this.state.request.use,
            pk_transformers: this.state.request.pk_transformers,
            client: ""
        }})
    }
    onChangeLastName(e){
        this.setState({ request: {
            username: this.state.request.username,
            password: this.state.request.password,
            email: this.state.request.email,
            first_name: this.state.request.first_name,
            last_name: e.target.value,
            is_active: true,
            cellphone: this.state.request.cellphone,
            position: "CLT",
            address: this.state.request.address,
            stratum: this.state.request.stratum,
            city: this.state.request.city,
            use: this.state.request.use,
            pk_transformers: this.state.request.pk_transformers,
            client: ""
        }})
    }
    onChangeUsername(e){
        this.setState({ request: {
            username: e.target.value,
            password: this.state.request.password,
            email: this.state.request.email,
            first_name: this.state.request.first_name,
            last_name: this.state.request.last_name,
            is_active: true,
            cellphone: this.state.request.cellphone,
            position: "CLT",
            address: this.state.request.address,
            stratum: this.state.request.stratum,
            city: this.state.request.city,
            use: this.state.request.use,
            pk_transformers: this.state.request.pk_transformers,
            client: ""
        }})
    }
    onChangeEmail(e){
        this.setState({ request: {
            username: this.state.request.username,
            password: this.state.request.password,
            email: e.target.value,
            first_name: this.state.request.first_name,
            last_name: this.state.request.last_name,
            is_active: true,
            cellphone: this.state.request.cellphone,
            position: "CLT",
            address: this.state.request.address,
            stratum: this.state.request.stratum,
            city: this.state.request.city,
            use: this.state.request.use,
            pk_transformers: this.state.request.pk_transformers,
            client: ""
        }}) 
    }
    onChangePassword(e){
        this.setState({ request: {
            username: this.state.request.username,
            password: e.target.value,
            email: this.state.request.email,
            first_name: this.state.request.first_name,
            last_name: this.state.request.last_name,
            is_active: true,
            cellphone: this.state.request.cellphone,
            position: "CLT",
            address: this.state.request.address,
            stratum: this.state.request.stratum,
            city: this.state.request.city,
            use: this.state.request.use,
            pk_transformers: this.state.request.pk_transformers,
            client: ""
        }})
    }
    onChangeCellphone(e){
        this.setState({ request: {
            username: this.state.request.username,
            password: this.state.request.password,
            email: this.state.request.email,
            first_name: this.state.request.first_name,
            last_name: this.state.request.last_name,
            is_active: true,
            cellphone: e.target.value,
            position: "CLT",
            address: this.state.request.address,
            stratum: this.state.request.stratum,
            city: this.state.request.city,
            use: this.state.request.use,
            pk_transformers: this.state.request.pk_transformers,
            client: ""
        }}) 
    }
    onChangeAddres(e){
        this.setState({ request: {
            username: this.state.request.username,
            password: this.state.request.password,
            email: this.state.request.email,
            first_name: this.state.request.first_name,
            last_name: this.state.request.last_name,
            is_active: true,
            cellphone: this.state.request.cellphone,
            position: "CLT",
            address: e.target.value,
            stratum: this.state.request.stratum,
            city: this.state.request.city,
            use: this.state.request.use,
            pk_transformers: this.state.request.pk_transformers,
            client: ""
        }});
    }
    getET(data){
        this.setState({ 
        request: {
            username: this.state.request.username,
            password: this.state.request.password,
            email: this.state.request.email,
            first_name: this.state.request.first_name,
            last_name: this.state.request.last_name,
            is_active: true,
            cellphone: this.state.request.cellphone,
            position: "CLT",
            address: this.state.request.address,
            stratum: this.state.request.stratum,
            city: this.state.request.city,
            use: this.state.request.use,
            pk_transformers: data.pk_transformers,
            client: ""
        },
        selectedET: `${data.pk_transformers}, ${data.reference}`
        });
    }
    getCity(data){
        this.setState({ 
        request: {
            username: this.state.request.username,
            password: this.state.request.password,
            email: this.state.request.email,
            first_name: this.state.request.first_name,
            last_name: this.state.request.last_name,
            is_active: true,
            cellphone: this.state.request.cellphone,
            position: "CLT",
            address: this.state.request.address,
            stratum: this.state.request.stratum,
            city: data[1],
            use: this.state.request.use,
            pk_transformers: this.state.request.pk_transformers,
            client: ""
        },
        selectedCity: `Ciudad: ${data[0]}`
        });
    }
    getUso(data){
        console.log(data)
        this.setState({ 
            request: {
                username: this.state.request.username,
                password: this.state.request.password,
                email: this.state.request.email,
                first_name: this.state.request.first_name,
                last_name: this.state.request.last_name,
                is_active: true,
                cellphone: this.state.request.cellphone,
                position: "CLT",
                address: this.state.request.address,
                stratum: this.state.request.stratum,
                city: this.state.request.city,
                use: data[1],
                pk_transformers: this.state.request.pk_transformers,
                client: ""
            },
            selectedUse: `Use: ${data[0]}`
            });
    }
    getStratum(data){
        console.log(this.state.request)
        this.setState({ 
            request: {
                username: this.state.request.username,
                password: this.state.request.password,
                email: this.state.request.email,
                first_name: this.state.request.first_name,
                last_name: this.state.request.last_name,
                is_active: true,
                cellphone: this.state.request.cellphone,
                position: "CLT",
                address: this.state.request.address,
                stratum: data,
                city: this.state.request.city,
                use: this.state.request.use,
                pk_transformers: this.state.request.pk_transformers,
                client: ""
            },
            selectedStratum: `Stratum: ${data}`
            });
    }
    AddClient(e){
        console.log(this.state.request)
        e.preventDefault()
        if ((this.state.request.username === "") ||
            (this.state.request.password === "") ||
            (this.state.request.email === "") ||
            (this.state.request.first_name === "") ||
            (this.state.request.last_name === "") ||
            (this.state.request.cellphone === "") ||
            (this.state.request.address === "") ||
            (this.state.request.stratum === -1) ||
            (this.state.request.city === "") ||
            (this.state.request.pk_transformers === -1)){
            this.setState({isAlertEmpty: true, isAlertSuccess: false, isBadinputs: false})
        }else{
            console.log(this.state.request)
            Axios.post(c.api + 'users/createClient/', this.state.request,
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
            .then( response => {
                console.log(response)
                this.setState({request: response.data})
                this.setState({
                    isAlertSuccess: true,
                    isAlertEmpty: false,
                    substation: response.data})
            }).catch(error => {
                console.log(error)
                this.setState({ isAlertSuccess: false,
                                isAlertEmpty: false,
                                isBadinputs: true})
            })
            console.log(this.state.request)
            
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
            <UVHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <font size="5">{t("Client.AddClient.1")}</font>
                        <br></br>
                        <font size="3">{this.props.location.pathname}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                        <strong>{t("Client.Warning.1")}</strong> {t("Client.EmptyFields.1")}
                    </Alert>
                    <Alert color="warning" isOpen={this.state.isBadinputs}>
                    <strong>{t("Client.Warning.1")}</strong> {t("Client.BadInputs.1")}
                    </Alert>
                    <Form onSubmit={this.AddClient}>
                        <h6 className="heading-small text-muted mb-4">
                        {t("Manager.PersonalInformation.1")}
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                {t("Client.Name.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder={t("Client.Name.1")}
                                type="text"
                                value={this.state.request.first_name}
                                onChange={this.onChangeFirstName}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                {t("Client.LastName.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder={t("Client.LastName.1")}
                                type="text"
                                value={this.state.request.last_name}
                                onChange={this.onChangeLastName}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-id"
                                >
                                {t("Client.Phone.1")}
                                </label>
                                <Input 
                                className="form-control-alternative"
                                id="input-cellphone"
                                placeholder={t("Client.Phone.1")}
                                type={t("Client.Phone.1")}
                                value={this.state.request.cellphone}
                                onChange={this.onChangeCellphone}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <hr className="my-4"></hr>
                        <h6 className="heading-small text-muted mb-4">
                        {t("Meter.meter.1")}
                        </h6>
                        <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-username"
                                >
                                {t("Meter.address.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-Adress"
                                placeholder="Adress"
                                type="text"
                                value={this.state.request.address}
                                onChange={this.onChangeAddres}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <br></br>
                                <UncontrolledDropdown nav>
                                <DropdownToggle className="dropdown-menu-arrow">
                                <Media className="align-items-center" >
                                    <span className="mb-0 text-sm font-weight-bold">
                                        {this.state.selectedET}
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
                                { this.state.listET.length > 0 ?
                                this.state.listET.map((data, id) =>
                                <DropdownItem key={'s-'+id} onClick={()=> this.getET(data)}>
                                    <i className=" ni ni-pin-3" />
                                <span>{data.pk_transformers}, {data.reference}</span>
                                </DropdownItem>) : 
                                <DropdownItem to="#" tag={Link}>
                                <i className=" ni ni-fat-remove"/>
                                <span>{t("ETransformer.NoSubstation.1")}</span>
                                </DropdownItem>}
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                            </Col>
                            <Col lg="4">
                            <FormGroup>
                                <br></br>
                                <UncontrolledDropdown nav>
                                <DropdownToggle className="dropdown-menu-arrow">
                                <Media className="align-items-center" >
                                    <span className="mb-0 text-sm font-weight-bold">
                                        {this.state.selectedCity}
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle" style={{ background: 'none'}}>
                                    <img
                                        alt="..."
                                        src={require("assets/img/theme/city.svg")}
                                    />
                                    </span>
                                </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                { this.state.listCity.length > 0 ?
                                    this.state.listCity.map((data, id) =>
                                    <DropdownItem key={'s-'+id} onClick={()=> this.getCity(data)}>
                                        <i className=" ni ni-pin-3" />
                                    <span>{data[0]}, {data[1]}</span>
                                    </DropdownItem>) : 
                                    <DropdownItem to="#" tag={Link}>
                                    <i className=" ni ni-fat-remove"/>
                                    <span>{t("ETransformer.NoSubstation.1")}</span>
                                    </DropdownItem>
                                }
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                            </Col>
                            <Col lg="4">
                            <FormGroup>
                                <br></br>
                                <UncontrolledDropdown nav>
                                <DropdownToggle className="dropdown-menu-arrow">
                                <Media className="align-items-center" >
                                    <span className="mb-0 text-sm font-weight-bold">
                                        {this.state.selectedUse}
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle" style={{ background: 'none'}}>
                                    <img
                                        alt="..."
                                        src={require("assets/img/theme/use.svg")}
                                    />
                                    </span>
                                </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                { this.state.listUso.length > 0 ?
                                    this.state.listUso.map((data, id) =>
                                    <DropdownItem key={'s-'+id} onClick={()=> this.getUso(data)}>
                                        <i className=" ni ni-pin-3" />
                                    <span>{data[0]}</span>
                                    </DropdownItem>) : 
                                    <DropdownItem to="#" tag={Link}>
                                    <i className=" ni ni-fat-remove"/>
                                    <span>{t("ETransformer.NoSubstation.1")}</span>
                                    </DropdownItem>
                                }
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                            </Col>
                            <Col lg="4">
                            <FormGroup>
                                <br></br>
                                <UncontrolledDropdown nav>
                                <DropdownToggle className="dropdown-menu-arrow">
                                <Media className="align-items-center" >
                                    <span className="mb-0 text-sm font-weight-bold">
                                        {this.state.selectedStratum}
                                    </span>
                                    <span className="avatar avatar-sm rounded-circle" style={{ background: 'none'}}>
                                    <img
                                        alt="..."
                                        src={require("assets/img/theme/trade.svg")}
                                    />
                                    </span>
                                </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                { this.state.listStratum.length > 0 ?
                                    this.state.listStratum.map((data, id) =>
                                    <DropdownItem key={'s-'+id} onClick={()=> this.getStratum(data)}>
                                        <i className=" ni ni-pin-3" />
                                    <span>{data}</span>
                                    </DropdownItem>) : 
                                    <DropdownItem to="#" tag={Link}>
                                    <i className=" ni ni-fat-remove"/>
                                    <span>{t("ETransformer.NoSubstation.1")}</span>
                                    </DropdownItem>
                                }
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                            </Col>
                        </Row>
                        <hr className="my-4"></hr>
                        <h6 className="heading-small text-muted mb-4">
                        {t("Client.AccountInformation.1")}
                        </h6>
                        <div className="pl-lg-4"></div>
                        <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-username"
                                >
                                {t("Manager.Username.1")}
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder={t("Manager.Username.1")}
                                type="text"
                                value={this.state.request.username}
                                onChange={this.onChangeUsername}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-email"
                                >
                                Email 
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-email"
                                placeholder="jesse@example.com"
                                type="email"
                                value={this.state.request.email}
                                onChange={this.onChangeEmail}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-password"
                                >
                                {t("Client.Password.1")}
                                </label>
                                <Input 
                                className="form-control-alternative"
                                placeholder={t("Client.Password.1")}
                                type="password" 
                                autoComplete="new-password"
                                value={this.state.request.password}
                                onChange={this.onChangePassword}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit">
                            {t("Client.Add.1")}
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
                        <strong>{t("Client.Congratulations.1")}!</strong><br/>{t("Client.CreateSuccesfull.1")}
                        </Alert>
                        <strong>{t("Client.Information.1")}:</strong>
                        <br></br>
                        <strong> {t("Client.Name.1")}: </strong> {this.state.request.first_name}<br/>
                        <strong> {t("Client.LastName.1")}: </strong> {this.state.request.last_name}<br/>
                        <strong> {t("Client.Phone.1")}: </strong> {this.state.request.cellphone}<br/>
                        <strong> Email: </strong> {this.state.request.email}<br/>
                        <strong> {t("Meter.address.1")}: </strong> {this.state.request.address}<br/>
                        <strong> {t("Meter.stratum.1")}: </strong> {this.state.request.stratum}<br/>
                        <strong> {t("Meter.city.1")}: </strong> {this.state.request.city}<br/>
                        <strong> {t("Meter.use.1")}: </strong> {this.state.request.use}<br/>
                    </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.closeModal}
                        >
                        {t("Client.Close.1")}
                        </Button>
                    </div>
            </Modal>
            </Container>
            </>
        );
    }
}

export default withTranslation()(AddClient);