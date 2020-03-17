import React from "react";
import { Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UVAdminNavbar from "components/Navbars/UVAdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
/*
import routes from "routes.js";
import adminRoutes from "adminRoutes.js";
import managerRoutes from "managerRoutes.js";
import operatorRoutes from "operatorRoutes.js";
*/
class Client extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        isVerified: false,
        credentials:this.props.location.state.notCredentials
    };
  };
  render() {
    console.log(this.state)
    return (
      <>
        <Sidebar/>
        <div className="main-content" ref="mainContent">
          <UVAdminNavbar/>
          <Switch/>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Client;
