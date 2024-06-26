import React from 'react';
import PropTypes from 'prop-types';
import {Button, Navbar} from "react-bootstrap";
import {FaSignOutAlt, FaUserGraduate} from 'react-icons/fa';

const StartNavbar = (props) => {
    const {isLMS} = props.context;
    const {email} = props.userInfo;
    const {isLoggingOut} = props.auth;
    return (
        <Navbar variant="dark" bg="info" expand="lg" className="w-100">
            <Navbar.Brand className="text-light">
                <strong>e-Ratos</strong>&nbsp;<small>session</small>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Navbar.Text className="mr-2">
                    <FaUserGraduate style={{fontSize: '1.25em'}}/>
                    <strong>&nbsp;{email}</strong>
                    {
                        isLMS ?
                            <span><strong>&nbsp;|&nbsp;LMS</strong></span> :
                            <span><strong>&nbsp;|&nbsp;non-LMS</strong></span>
                    }
                </Navbar.Text>
                {
                    !isLoggingOut ?
                        <Button variant="light" size="sm" onClick={() => props.getLoggedOut()} title="Wish to log out?">
                            Logout <FaSignOutAlt/>
                        </Button> :
                        <span className="text-light">Logout..</span>
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

StartNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,

    getLoggedOut: PropTypes.func,
};

export default StartNavbar;