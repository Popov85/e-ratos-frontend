import React from 'react';
import {Route} from "react-router-dom";
import Courses from "./Courses";
import Schemes from "./Schemes";
import Themes from "./Themes";
import Questions from "./Questions";
import Resources from "./Resources";
import Groups from "./Groups";
import Complaints from "./Complaints";
import Lms from "./Lms";
import {loginURL} from "../../common/_api/appAPI";
import PropTypes from "prop-types";
import StaffNavbarContainer from "../containers/StaffNavbarContainer";
import StaffHome from "./StaffHome";
import UsersContainer from "../containers/UsersContainer";
import UserEditManager from "./UserEditManager";
import UserEdit from "./UserEdit";
import UserEditContainer from "../containers/UserEditContainer";

const StaffPortal = props => {

    const {logged} = props.security;

    if (!logged) window.location.assign(loginURL);

    return (
        <div>
            <StaffNavbarContainer/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <main>
                            <Route path="/" exact component={StaffHome}/>
                            <Route path="/users" exact component={UsersContainer}/>
                            <Route path="/users/new/" exact component={UserEditContainer}/>
                            <Route path="/users/edit/:staffId" exact component={UserEditManager}/>
                            <Route path="/courses" exact component={Courses}/>
                            <Route path="/schemes" exact component={Schemes}/>
                            <Route path="/themes" exact component={Themes}/>
                            <Route path="/questions" exact component={Questions}/>
                            <Route path="/resources" exact component={Resources}/>
                            <Route path="/groups" exact component={Groups}/>
                            <Route path="/complaints" exact component={Complaints}/>
                            <Route path="/lms" exact component={Lms}/>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

StaffPortal.propTypes = {
    security: PropTypes.object.isRequired
};

export default StaffPortal;