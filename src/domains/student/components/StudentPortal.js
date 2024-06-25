import React from 'react';
import {Redirect, Route} from "react-router-dom";
import ProfileContainer from "../../common/containers/ProfileContainer";
import PasswordContainer from "../../common/containers/PasswordContainer";
import PropTypes from "prop-types";
import StudentNavbarContainer from "../containers/StudentNavbarContainer";

const StudentPortal = ({logged, authorized}) => {

    if (logged && !authorized) {
        return <Redirect to="/unauthorized"/>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <StudentNavbarContainer/>
            </div>
            <div className="row">
                <Route path="/student" exact render={() => <Redirect to="/student/results"/>}/>
                <Route path="/student/results" render={() => <div>Results TODO</div>}/>
                <Route path="/student/rating" render={() => <div>Rating TODO</div>}/>
                <Route path="/student/charts" render={() => <div>Charts TODO</div>}/>
                <Route path="/student/profile" exact component={ProfileContainer}/>
                <Route path="/student/profile/password" exact component={PasswordContainer}/>
            </div>
        </div>
    );
}

StudentPortal.propTypes = {
    logged: PropTypes.bool.isRequired,
    authorized: PropTypes.bool.isRequired
};

export default StudentPortal;