import React from "react";

// reactstrap components
// core components
import UVHeader from "components/Headers/UVHeader.js";
import { withTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

/*const c = require('../constants')*/
const cookie = new Cookies();

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                is_active: true,
                cellphone: "",
                position: "CLT"
            },
            isAlertEmpty: false,
            isAlertSuccess: false,
            isBadinputs: false,
            credentials: cookie.get('notCredentials'),
        }
    }            
    render() {
        return(
            <>
            <UVHeader />
            </>
        );
    }
}

export default withTranslation()(HomePage);