import React from "react";
import axios from 'axios';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Alert,
} from "reactstrap";
// core components

import 'leaflet/dist/leaflet.css';
import Cookies from 'universal-cookie';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18n.js';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')
const cookie = new Cookies();





class SetInvoices extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file:"",
            content:"",
            credentials: cookie.get('notCredentials'),
        }
        this.readFile = this.readFile.bind(this)
    }

    readFile = (e) => {
        e.preventDefault();
        let fileIn = e.target.files[0];
        this.setState({ file: fileIn })
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = reader.result;
          
          console.log(text);
          this.setState({ content: text });
        };
        reader.readAsText(e.target.files[0]);
        console.log("Esperemos")
        console.log(this.state)
    }

    render() {
        const { t } = this.props;
        var htmlContent = '<label for="myfile">Select a file:</label><input type="file" id="myfile" name="myfile">'

        return(
            <>
            <UVHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <font size="5">{t("Settings.Upload.1")}</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>


                        
                    <Form>
                    
                    

                        <h6 className="heading-small text-muted mb-4">
                            {t("Settings.UploadFile.1")}
                        </h6>
                        <input type="file" onChange={this.readFile} />
                        
                    </Form>
                    </CardBody>
                </Card>
                
            </Container>
            </>
        );
    }
}


export default withTranslation()(SetInvoices);