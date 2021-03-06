import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { withTranslation, Trans } from 'react-i18next';
import Cookies from 'universal-cookie';

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

const cookie = new Cookies();

class SidebarM extends React.Component {
  state = {
    collapseOpen: false
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            <Trans>{prop.name}</Trans>
          </NavLink>
        </NavItem>
      );
    });
  };

  createManagerLinks = managerRoutes => {
    return managerRoutes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            <Trans>{prop.name}</Trans>
          </NavLink>
        </NavItem>
      );
    });
  };

  createAdminLinks = adminRoutes => {
    return adminRoutes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            <Trans>{prop.name}</Trans>
          </NavLink>
        </NavItem>
      );
    });
  };

  createOperatorLinks = operatorRoutes => {
    return operatorRoutes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            <Trans>{prop.name}</Trans>
          </NavLink>
        </NavItem>
      );
    });
  };
  createSubstationLinks = substationRoutes => {
    return substationRoutes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            <Trans>{prop.name}</Trans>
          </NavLink>
        </NavItem>
      );
    });
  };
  createElectricTransfomerLinks = electricTransformerRoutes => {
    return electricTransformerRoutes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            <Trans>{prop.name}</Trans>
          </NavLink>
        </NavItem>
      );
    });
  };
  createReportLinks = reportRoutes => {
    return reportRoutes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            <Trans>{prop.name}</Trans>
          </NavLink>
        </NavItem>
      );
    });
  };
  handlelogout = () => {
    cookie.remove('notCredentials', { path: '/' })
  }
  render() {
    const { /*bgColor,*/ adminRoutes, managerRoutes, operatorRoutes, substationRoutes, electricTransformerRoutes, reportRoutes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    const { t } = this.props
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem to="/login" tag={Link} onClick={this.handlelogout}>
                    <i className="ni ni-user-run" />
                    <span>{t('Sidebar.Logout.1')}</span>
                  </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            {/* Navigation */}
            <Nav navbar>
              &nbsp;&nbsp;&nbsp;&nbsp;{t("Sidebar.Manager.1")}
              {this.createManagerLinks(managerRoutes)}
              &nbsp;&nbsp;&nbsp;&nbsp;{t("Sidebar.Administrator.1")}
              {this.createAdminLinks(adminRoutes)}
              &nbsp;&nbsp;&nbsp;&nbsp;{t("Sidebar.Operator.1")}
              {this.createOperatorLinks(operatorRoutes)}
              &nbsp;&nbsp;&nbsp;&nbsp;{t("Sidebar.Substation.1")}
              {this.createSubstationLinks(substationRoutes)}
              &nbsp;&nbsp;&nbsp;&nbsp;{t("Sidebar.ElectricTransformer.1")}
              {this.createElectricTransfomerLinks(electricTransformerRoutes)}
              &nbsp;&nbsp;&nbsp;&nbsp;{t("Sidebar.Reports.1")}
              {this.createReportLinks(reportRoutes)}
              </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

SidebarM.defaultProps = {
  adminRoutes: [{}],
  managerRoutes: [{}],
  operatorRoutes: [{}],
  substationRoutes: [{}],
  electricTransformerRoutes: [{}]
};

SidebarM.propTypes = {
  // links that will be displayed inside the component
  adminRoutes: PropTypes.arrayOf(PropTypes.object),
  managerRoutes: PropTypes.arrayOf(PropTypes.object),
  operatorRoutes: PropTypes.arrayOf(PropTypes.object),
  substationRoutes: PropTypes.arrayOf(PropTypes.object),
  electricTransformerRoutes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default  withTranslation()(SidebarM);
