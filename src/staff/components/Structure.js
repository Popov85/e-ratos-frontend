import React from 'react';
import PropTypes from 'prop-types';
import Nav from "react-bootstrap/Nav";

import "../../../main.css";
import {LinkContainer} from "react-router-bootstrap";
import {Redirect} from "react-router-dom";

const pathsAvailableForFacAdmin = ['/structure', '/structure/departments'];
const pathsAvailableForOrgAdmin = [...pathsAvailableForFacAdmin, '/structure/faculties'];
const pathsAvailableForGlobalAdmin = [...pathsAvailableForOrgAdmin, '/structure/organisations'];

const Structure = (props) => {

    const isAvailable=() => {
        const {pathname} = props.location;
        const {authenticated} = props.userInfo;
        if (authenticated.isGlobalAdmin) {
            return pathsAvailableForGlobalAdmin.includes(pathname);
        }
        if (authenticated.isAtLeastOrgAdmin) {
            return pathsAvailableForOrgAdmin.includes(pathname);
        }
        if (authenticated.isAtLeastFacAdmin) {
            return pathsAvailableForFacAdmin.includes(pathname);
        }
        return false;
    }

    const getActivePathway = () => {
        const {pathname} = props.location;
        const {authenticated} = props.userInfo;
        if (pathname === '/structure') {
            if (authenticated.isGlobalAdmin) return "/structure/organisations";
            if (authenticated.isAtLeastOrgAdmin) return "/structure/faculties";
            if (authenticated.isAtLeastFacAdmin) { return "/structure/departments";
            } else {
                throw new Error("There is lack of credentials to see this section!");
            }
        } else
            return pathname;
    }

    if (!isAvailable()) return <Redirect to='/protected'/>
    const activeKey = getActivePathway();
    const {authenticated} = props.userInfo;
    return (
        <div className="pt-3 pr-3 pl-3">
            <Nav variant="tabs" fill={true} activeKey={activeKey}>
                <Nav.Item hidden={!authenticated.isGlobalAdmin}>
                    <LinkContainer to="/structure/organisations">
                        <Nav.Link eventKey="/structure/organisations" className = "nav-link-ratos">Organisations</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item hidden={!authenticated.isAtLeastOrgAdmin}>
                    <LinkContainer to="/structure/faculties">
                        <Nav.Link eventKey="/structure/faculties" className = "nav-link-ratos">Faculties</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item hidden={!authenticated.isAtLeastFacAdmin}>
                    <LinkContainer to="/structure/departments">
                        <Nav.Link eventKey="/structure/departments" className = "nav-link-ratos">Departments</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
            <Redirect to={activeKey}/>
        </div>
    );
}

Structure.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default Structure;