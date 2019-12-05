import React from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FaFilm} from "react-icons/fa";
import LogoWhiteTeaching from "../../common/LogoWhiteTeaching";

class StaffHome extends React.Component {

    componentDidMount() {
        document.getElementById('staff-body').className='staff-body-start';
    }

    componentWillUnmount() {
        document.getElementById('staff-body').className='staff-body-normal';
    }

    render() {
        const {staff} = this.props.userInfo.authenticated;

        return (
            <div>
                <div className="row">
                    <div className="col-12 bg-info">
                        <LogoWhiteTeaching/>
                        <div className="text-center mb-3">
                            <div className="text-secondary mt-3 mb-3">
                                <h5>Welcome to {staff.department.name}</h5>
                            </div>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="StaffTooltip">Go to <strong>YT</strong> video</Tooltip>}>
                                <a href='https://www.youtube.com/' target="_blank" className="btn btn-secondary border pl-5 pr-5 pt-2 pb-2" >
                                    Demo&nbsp;<FaFilm style={{ fontSize: '1.5em' }}/>
                                </a>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h5 className="text-secondary text-center p-5">Please, press 'Demo' to watch instructions!</h5>
                    </div>
                </div>
            </div>
        );
    }
}

StaffHome.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default StaffHome;