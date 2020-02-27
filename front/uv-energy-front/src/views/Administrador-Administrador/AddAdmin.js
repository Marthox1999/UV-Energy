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
  Col
} from "reactstrap";
// core components
import UVHeader from "components/Headers/UVHeader.js";


class AddAdmin extends React.Component {
    render() {
        return(
            <>
            <UVHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">Add Admin</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                        Personal Information
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-id-number"
                                >
                                ID Number
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-id-number"
                                placeholder="ID Number"
                                type="number"
                                />
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Name
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder="Name"
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                Last Name
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder="Last Name"
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-phone-number"
                                >
                                Phone Number
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-phone-number"
                                placeholder="Phone Number"
                                type="number"
                                />
                            </FormGroup>
                            </Col>

                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-address"
                                >
                                Address
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-address"
                                placeholder="Adress"
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-date-birth"
                                >
                                Date of birth
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-date birth"
                                placeholder=""
                                type="date"
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        </div>

                        <h6 className="heading-small text-muted mb-4">
                        Payment Information
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-bank"
                                >
                                Bank
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-bank"
                                placeholder="Bank"
                                type="text"
                                />
                            </FormGroup>
                            </Col>

                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-account-type"
                                >
                                Account Type
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-account-type"
                                placeholder="Account type"
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-account-number"
                                >
                                Account Number
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-account-number"
                                placeholder="Account Number"
                                type="text"
                                />
                            </FormGroup>
                            </Col>

                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-salary"
                                >
                                Salary
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-salary"
                                placeholder="Salary"
                                type="number"
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        </div>

                        <h6 className="heading-small text-muted mb-4">
                        Account Information
                        </h6>
                        <div className="pl-lg-4">                        
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-username"
                                >
                                Username
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Username"
                                type="text"
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
                                Contrasena
                                </label>
                                <Input 
                                className="form-control-alternative"
                                placeholder="Password" 
                                type="password" 
                                autoComplete="new-password"/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="button">
                                Add
                            </Button>
                        </div>
                        </div>
                    </Form>
                    </CardBody>
                </Card>
            </Container>
            </>
        );
    }
}

export default AddAdmin;