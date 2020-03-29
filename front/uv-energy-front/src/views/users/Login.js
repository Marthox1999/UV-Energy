import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import {
  Button, Card, CardBody, FormGroup, Form, Input,
  InputGroupAddon, InputGroupText, InputGroup,
  Row, Col
} from 'reactstrap';
import Recaptcha from 'react-recaptcha';
import axios from 'axios';
import Cookies from 'universal-cookie';

import i18n from '../../i18n'

const cookie = new Cookies();
const c = require('../constants')

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVerified: false,
      credentials:{
        username: '',
        password: ''
      }
    }
  }

  handleClick = (lang) => {
    i18n.changeLanguage(lang)
  }

  verifyCallback = (response) => {
    if(response) {
      this.setState({
        isVerified:true
      })
    }
  };

  recaptchaLoaded = () => {
    console.log('captcha succesfully loaded')
  }

  onChangeUsername = (event) => {
    this.setState({
      credentials:{
        username: event.target.value,
        password: this.state.credentials.password
      }
    })
  }

  onChangePassword = (event) => {
    this.setState({
      credentials:{
        username: this.state.credentials.username,
        password: event.target.value
      }
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    
    if(this.state.isVerified) {
      if(this.state.credentials.username === '' &&
         this.state.credentials.password === '') {
           alert('Please fill out the username and password fields')
         }
      else if(this.state.credentials.username === '') {
        alert('Please fill out the username field')
      }
      else if(this.state.credentials.password === '') {
        alert('Please fill out the password field')
      }else {
        axios.post(
          c.api + 'users/auth/' , this.state.credentials
        ).then(
          response => {
            if(Object.prototype.hasOwnProperty.call(response.data, 'notCredentials')) {
              cookie.set('notCredentials',response.data.notCredentials, { path: '/' });
              if(response.data.notCredentials.position === "ADMIN"){
                this.props.history.push({
                  pathname: '/admin/index'
                })
              } else if (response.data.notCredentials.position === "MGR"){
                this.props.history.push({
                  pathname: '/manager/index'
                })
              } else if (response.data.notCredentials.position === "OP"){
                this.props.history.push({
                  pathname: '/operator/index'
                })
              } else if (response.data.notCredentials.position === "CLR"){
                this.props.history.push({
                  pathname: '/client/index'
                })
              }
            }else {
              alert("Invalid Credentials")
            }
          }
        )
      }
    }else{
      alert('please verify the captcha')
    }
  }

  render() {
    const { t } = this.props
    return (
      <>
        <Col lg='5' md='7'>
          <Card className='bg-secondary shadow border-0'>
            <CardBody className='px-lg-5 py-lg-5'>
              <div className='text-center text-muted mb-4'>
                <small>{t("Login.Sign_credentials.1")}</small>
              </div>
              <Form role='form' id='log-in_form'>
                <FormGroup className='mb-3'>
                  <InputGroup className='input-group-alternative'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='ni ni-single-02' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder={t("Login.Username.1")} type='username' autoComplete='username' 
                    value={this.state.credentials.username} onChange={this.onChangeUsername}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className='input-group-alternative'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='ni ni-lock-circle-open' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder={t("Login.Password.1")} type='password' autoComplete='new-password'
                    onChange={this.onChangePassword} value={this.state.credentials.password}/>
                  </InputGroup>
                </FormGroup>
                <div className='text-center'>
                  <Recaptcha
                    sitekey='6Lf_dt0UAAAAACDDGt8MhMEL_YhFj1F1U60dgFh1'
                    render='explicit'
                    onloadCallback={this.recaptchaLoaded}
                    verifyCallback={this.verifyCallback}
                  />
                  <Button className='my-4' color='primary' onClick={this.handleLogin}>
                    {t("Login.Log_in.1")}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className='mt-3'>
            <Col xs='6'>
              <a
                className='text-light'
                href='/auth/register'
              >
                <small>{t("Login.Create_account.1")}</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default withTranslation()(Login)
