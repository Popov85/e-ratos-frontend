import React from 'react';
import PropTypes from 'prop-types';
import {Button, Navbar} from "react-bootstrap";
import {FaSignOutAlt, FaUserGraduate} from 'react-icons/fa';

const StartNavbar = (props) => {
    const {email, lms} = props.panelInfo;
    return (
        <Navbar variant="dark" bg="info" expand="lg">
            <Navbar.Brand className="text-light">
                <strong>e-Ratos</strong>&nbsp;<small>session</small>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="mr-2">
                        <FaUserGraduate style={{fontSize: '1.25em'}}/>
                        <strong>&nbsp;{email}</strong>
                        {
                            lms ? <span><strong>&nbsp;|&nbsp;LMS</strong></span>
                                : <span><strong>&nbsp;|&nbsp;non-LMS</strong></span>
                        }
                    </Navbar.Text>
                    {
                        !props.logout.isLoggingOut ?
                            <Button variant="light" size="sm" onClick={() => props.doLogout()} title="Wish to log out?">
                                Logout <FaSignOutAlt/>
                            </Button>
                            : <span className="text-light">Logout..</span>
                    }
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    );
}

StartNavbar.propTypes = {
    panelInfo: PropTypes.object.isRequired,
    logout: PropTypes.bool,
    doLogout: PropTypes.func,
};

export default StartNavbar;