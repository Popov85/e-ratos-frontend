import React from 'react';
import {Nav, Navbar, NavDropdown, OverlayTrigger, Tooltip} from "react-bootstrap";
import PropTypes from 'prop-types';
import {LinkContainer} from "react-router-bootstrap";
import {FaSignOutAlt} from 'react-icons/fa';
import "../../../../main.css";

const StaffNavbar = (props) => {

    const {authorization} = props.auth;

    const {name, surname} = props.userInfo;

    const displayUserInfo = () => {
        return name + " " + surname;
    }

    return (
        <div className="container-fluid p-0">
            <Navbar variant="dark" bg="secondary" expand="lg">
                <LinkContainer to="/staff">
                    <Navbar.Brand className="text-light">
                        <strong>e-Ratos</strong>&nbsp;<small>staff</small>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto navbar-nav">
                        <NavDropdown title="Admin" id="admin-nav-dropdown" hidden={!authorization.isAtLeastDepAdmin}>
                            <LinkContainer to="/staff/users">
                                <NavDropdown.Item>Staff</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/staff/structure" hidden={!authorization.isAtLeastFacAdmin}>
                                <NavDropdown.Item>Structure</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>

                        <NavDropdown title="Content" id="content-nav-dropdown">
                            <LinkContainer to="/staff/courses">
                                <NavDropdown.Item>Courses</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/staff/schemes">
                                <NavDropdown.Item>Schemes</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/staff/themes">
                                <NavDropdown.Item>Themes</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/staff/resources">
                                <NavDropdown.Item>Resources</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/staff/helps">
                                <NavDropdown.Item>Helps</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        <NavDropdown title="Reports" id="results-nav-dropdown">
                            <LinkContainer to="/staff/report/on-content">
                                <NavDropdown.Item>On content</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider/>
                            <LinkContainer to="/staff/report/on-results">
                                <NavDropdown.Item>On results</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        <LinkContainer to="/staff/results">
                            <Nav.Link>Results</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/staff/complaints">
                            <Nav.Link>Complaints</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/staff/groups">
                            <Nav.Link>Groups</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/staff/lms">
                            <Nav.Link>LMS</Nav.Link>
                        </LinkContainer>

                        <NavDropdown title="Refs" id="refs-nav-dropdown">
                            <NavDropdown.Item href="https://openedx.org/">Open-edX</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>

                    <Nav className="navbar-nav">
                        <div className="d-flex align-items-center">
                            <NavDropdown title={displayUserInfo()} id="user-nav-dropdown" className="mr-2">
                                <LinkContainer to="/staff/profile">
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

StaffNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,

    getLoggedOut: PropTypes.func.isRequired
};

export default StaffNavbar;
