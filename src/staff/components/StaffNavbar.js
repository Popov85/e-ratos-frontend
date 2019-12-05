import React from 'react';
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import PropTypes from 'prop-types';
import {LinkContainer} from "react-router-bootstrap";
import {FaSignOutAlt, FaUserTie} from 'react-icons/fa';
import "../../../main.css";


const StaffNavbar = (props) => {

    const {authenticated, isLoading, error} = props.userInfo;

    const displayUserInfo =() => {
        if (error) return <span className="text-danger">Error</span>;
        if (isLoading) return <span className="text-warning">Loading...</span>;
        if (authenticated) return authenticated.name+" "+authenticated.surname;
        return "Init...";
    }

    return (
        <Navbar variant="dark" bg="secondary" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand className="text-light">
                    <strong>e-Ratos</strong>&nbsp;<small>staff</small>
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Admin" id="admin-nav-dropdown" hidden={!authenticated.isAtLeastDepAdmin}>
                        <LinkContainer to="/users">
                            <NavDropdown.Item>Staff</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <NavDropdown title="Content" id="content-nav-dropdown">
                        <LinkContainer to="/courses">
                            <NavDropdown.Item>Courses</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/schemes">
                            <NavDropdown.Item>Schemes</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/themes">
                            <NavDropdown.Item>Themes</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/questions">
                            <NavDropdown.Item>Questions</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/resources">
                            <NavDropdown.Item>Resources</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <NavDropdown title="Results" id="results-nav-dropdown">
                        <LinkContainer to="/results">
                            <NavDropdown.Item>Results</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider/>
                        <LinkContainer to="/reports">
                            <NavDropdown.Item>Reports</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <LinkContainer to="/complaints">
                        <Nav.Link>Complaints</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/groups">
                        <Nav.Link>Groups</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/lms">
                        <Nav.Link>LMS</Nav.Link>
                    </LinkContainer>

                    <NavDropdown title="Refs" id="refs-nav-dropdown">
                        <NavDropdown.Item href="#">Open-edX</NavDropdown.Item>
                        <NavDropdown.Item href="#1">e-Gradebook</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="mr-2">
                        <FaUserTie style={{fontSize: '1.25em'}}/> {displayUserInfo()}
                    </Navbar.Text>
                    {
                        !props.security.isLoggingOut ?
                            <Button variant="light" size="sm" onClick={() => props.getLoggedOut()}>
                                Logout <FaSignOutAlt/>
                            </Button> :
                            <span className="text-light">Logout..</span>
                    }
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    );
}

StaffNavbar.propTypes = {
    userInfo: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    getLoggedOut: PropTypes.func
};

export default StaffNavbar;
