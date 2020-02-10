import React from 'react';
import {Nav, Navbar, NavDropdown, OverlayTrigger, Tooltip} from "react-bootstrap";
import PropTypes from 'prop-types';
import {FaCompress, FaExpand, FaPlus, FaSync} from 'react-icons/fa';
import "../../../main.css";

const QuestionsNavbar = props => {

    const {view} = props;
    const {authenticated} = props.userInfo;

    return (
        <Navbar variant="light" bg="secondary" expand="lg" className="p-1" disabled = {true}>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto navbar-nav">
                    <NavDropdown title="File" id="file-nav-dropdown" hidden={!authenticated.isAtLeastInstructor}>
                        <NavDropdown.Item href="#action/3.1">Action 1</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Action 2</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="View" id="view-nav-dropdown">
                        <NavDropdown.Item href="#" onClick={() => props.viewChange()}>
                            Change {view ? <FaCompress/> : <FaExpand/>}
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Help" id="help-nav-dropdown">
                        <NavDropdown.Item href="#">About</NavDropdown.Item>
                        <NavDropdown.Item href="#1">Version</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <Nav className="navbar-nav">
                    <div className="d-flex align-items-center">
                        {
                            authenticated.isAtLeastInstructor &&
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="LogoutTooltip">Add new question?</Tooltip>}>
                                <div className="p-0 mr-1">
                                    <button type="button" className="btn btn-success btn-sm"
                                            onClick={() => props.addQuestions()}>
                                        <FaPlus/>&nbsp;New
                                    </button>
                                </div>
                            </OverlayTrigger>
                        }
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="LogoutTooltip">Refresh?</Tooltip>}>
                            <div className="p-0 m-0">
                                <button type="button" className="btn btn-info btn-sm"
                                        onClick={() => props.refreshQuestions()}>
                                    <FaSync/>&nbsp;Refresh
                                </button>
                            </div>
                        </OverlayTrigger>

                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

QuestionsNavbar.propTypes = {
    userInfo: PropTypes.object.isRequired,
    view: PropTypes.bool.isRequired,

    viewChange: PropTypes.func.isRequired,
    addQuestions: PropTypes.func.isRequired,
    refreshQuestions: PropTypes.func.isRequired
};

export default QuestionsNavbar;
