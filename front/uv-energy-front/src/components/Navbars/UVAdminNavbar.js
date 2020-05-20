import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

import { withTranslation } from 'react-i18next';
import i18n from '../../i18n'

const cookie = new Cookies();

class UVAdminNavbar extends React.Component {
  handlelogout = () => {
    cookie.remove('notCredentials', { path: '/' })
  }
  handleClick = (lang) => {
    i18n.changeLanguage(lang)
  }
  render() {
    const { t } = this.props
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <i className="ni ni-world"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <button type="button" className="btn btn-default btn-block" onClick={() => this.handleClick('en')}>English</button>
                  </DropdownItem>
                  <DropdownItem className="noti-title" header tag="div">
                    <button type="button" className="btn btn-default btn-block" onClick={() => this.handleClick('es')}>Español</button>
                  </DropdownItem>
                  <DropdownItem className="noti-title" header tag="div">
                    <button type="button" className="btn btn-default btn-block" onClick={() => this.handleClick('pt')}>Português</button>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                      
              <br></br>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/user.png")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {t("Sidebar.MyAccount.1")}
                      </span>
                    </Media>
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
          </Container>
        </Navbar>
      </>
    );
  }
}

export default withTranslation()(UVAdminNavbar);