import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UVAdminNavbar from "components/Navbars/UVAdminNavbar.js";
import SidebarO from "components/Sidebar/SidebarO.js";
import routes from "routes.js";
/*
import adminRoutes from "adminRoutes.js";
import managerRoutes from "managerRoutes.js";
import operatorRoutes from "operatorRoutes.js";
*/

import Cookies from 'universal-cookie';

const cookie = new Cookies();

class Operator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        isVerified: false,
        credentials: cookie.get('notCredentials'),
    };
  };
  componentWillMount(){
    if (typeof this.state.credentials === 'undefined'){
      this.props.history.push({
        pathname: '/auth/login'
      })
    }
    
  }
  componentDidUpdate(e) {
    return routes.map((prop, key) => {
      if (prop.layout === "/operator") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/operator") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
        ) {
          return routes[i].name;
        }
      }
      return "Brand";
  }; 
  render() {
    console.log(this.state)
    return (
      <>
        <SidebarO
        {...this.props}        
          logo={{
            innerLink: "/operator/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
          />
          <UVAdminNavbar/>
          <Switch>
          </Switch>
          <Container fluid>
          </Container>
      </>
    );
  }
}

export default Operator;
