import React from 'react';
import PropTypes from 'prop-types';
import Nav from "react-bootstrap/Nav";
import "../../../../main.css";
import {LinkContainer} from "react-router-bootstrap";
import {Redirect} from "react-router-dom";

const pathsAvailableForFacAdmin = ['/staff/structure', '/staff/structure/departments'];
const pathsAvailableForOrgAdmin = [...pathsAvailableForFacAdmin, '/staff/structure/faculties'];
const pathsAvailableForGlobalAdmin = [...pathsAvailableForOrgAdmin, '/staff/structure/organisations'];

const Structure = ({location, authorization}) => {

    const isAvailable=() => {
        const {pathname} = location;
        if (authorization.isGlobalAdmin) {
            return pathsAvailableForGlobalAdmin.includes(pathname);
        }
        if (authorization.isAtLeastOrgAdmin) {
            return pathsAvailableForOrgAdmin.includes(pathname);
        }
        if (authorization.isAtLeastFacAdmin) {
            return pathsAvailableForFacAdmin.includes(pathname);
        }
        return false;
    }

    const getActivePathway = () => {
        const {pathname} = location;
        if (pathname === '/staff/structure') {
            if (authorization.isGlobalAdmin) return "/staff/structure/organisations";
            if (authorization.isAtLeastOrgAdmin) return "/staff/structure/faculties";
            if (authorization.isAtLeastFacAdmin) { return "/staff/structure/departments";
            } else {
                throw new Error("There is lack of credentials to see this section!");
            }
        } else
            return pathname;
    }

    if (!isAvailable()) return <Redirect to="/unauthorized"/>

    const activeKey = getActivePathway();

    return (
        <div className="pt-3 pr-3 pl-3">
            <Nav variant="tabs" fill={true} activeKey={activeKey}>
                <Nav.Item hidden={!authorization.isGlobalAdmin}>
                    <LinkContainer to="/staff/structure/organisations">
                        <Nav.Link eventKey="/staff/structure/organisations" className = "nav-link-ratos">Organisations</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item hidden={!authorization.isAtLeastOrgAdmin}>
                    <LinkContainer to="/staff/structure/faculties">
                        <Nav.Link eventKey="/staff/structure/faculties" className = "nav-link-ratos">Faculties</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item hidden={!authorization.isAtLeastFacAdmin}>
                    <LinkContainer to="/staff/structure/departments">
                        <Nav.Link eventKey="/staff/structure/departments" className = "nav-link-ratos">Departments</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
            <Redirect to={activeKey}/>
        </div>
    );
}

Structure.propTypes = {
    authorization: PropTypes.object.isRequired
};

export default Structure;