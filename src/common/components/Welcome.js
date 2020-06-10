import React from 'react';
import {FaUserTie} from "react-icons/fa";
import utils from "../../utils/utils";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import LogoWhite from "./LogoWhite";

const Welcome = props => {

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <div className="row">
                <div className="col-12 bg-info">
                    <LogoWhite/>
                    <div className="text-center p-5">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="StaffTooltip">Go to <strong>Staff</strong> portal</Tooltip>}>
                            <a className="btn btn-secondary border pl-5 pr-5 pt-2 pb-2 mr-5" href={`${utils.baseUrl()}/department`}>
                                Staff&nbsp;<FaUserTie style={{ fontSize: '0.75em' }}/>
                            </a>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="StaffTooltip">Go to <strong>Student</strong> portal</Tooltip>}>
                            <a className="btn btn-secondary border pl-5 pr-5 pt-2 pb-2" href={`${utils.baseUrl()}/student`}>
                                Student
                            </a>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
            <div className="row flex-grow-1">
                <div className="col-12 bg-secondary">
                    <h5 className="text-light text-center p-5">Please, choose a module you wanna enter!</h5>
                </div>
            </div>
        </div>
    );
};

Welcome.propTypes = {};

export default Welcome;