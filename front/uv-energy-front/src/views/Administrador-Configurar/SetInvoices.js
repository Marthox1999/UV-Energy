import React from "react";

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
// core components
import UVHeader from "components/Headers/UVHeader.js";
import Axios from "axios";
import { withTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

const c = require('../constants')
const cookie = new Cookies();



class SetInvoices extends React.Component {
    
    render() {
        return(
            <>
            <UVHeader />
            <div>
                jejajjaja
            </div>
            </>
        );
    }
}


export default withTranslation()(SetInvoices);