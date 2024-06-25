import React from 'react';
import {Nav, Navbar, NavDropdown, OverlayTrigger, Tooltip} from "react-bootstrap";
import PropTypes from 'prop-types';
import {LinkContainer} from "react-router-bootstrap";
import {FaSignOutAlt} from 'react-icons/fa';
import "../../../../main.css";

const StudentNavbar = (props) => {

    const {name, surname} = props.userInfo;

    const displayUserInfo = () => {
        return name + " " + surname;
    }

    return (
        <div className="container-fluid p-0">
            <Navbar variant="dark" bg="secondary" expand="lg">
                <LinkContainer to="/student">
                    <Navbar.Brand className="text-light">
                        <strong>e-Ratos</strong>&nbsp;<small>student</small>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto navbar-nav">

                        <LinkContainer to="/student/results">
                            <Nav.Link>Results</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/student/rating">
                            <Nav.Link>Rating</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/student/charts">
                            <Nav.Link>Charts</Nav.Link>
                        </LinkContainer>

                        <NavDropdown title="Refs" id="refs-nav-dropdown">
                            <NavDropdown.Item href="https://openedx.org/">Open-edX</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>

                    <Nav className="navbar-nav">
                        <div className="d-flex align-items-center">
                            <NavDropdown title={displayUserInfo()} id="user-nav-dropdown" className="mr-2">
                                <LinkContainer to="/student/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>

                            {
                                !props.auth.isLoggingOut ?
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="LogoutTooltip">Logout?</Tooltip>}>
                                        <div className="p-0 m-0">
                                            <button type="button" className="btn btn-light btn-sm"
                                                    onClick={() => props.getLoggedOut()}>
                                                Logout <FaSignOutAlt/>
                                            </button>
                                        </div>
                                    </OverlayTrigger> :
                                    <span className="text-light">Logout..</span>
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

StudentNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,

    getLoggedOut: PropTypes.func.isRequired
};

export default StudentNavbar;
