import React from 'react';
import {Redirect, Route} from "react-router-dom";
import Groups from "./Groups";
import Complaints from "./Complaints";
import StaffNavbarContainer from "../containers/StaffNavbarContainer";
import UsersContainer from "../containers/UsersContainer";
import ResultsContainer from "../containers/ResultsContainer";
import ProfileContainer from "../containers/ProfileContainer";
import PasswordContainer from "../containers/PasswordContainer";
import ReportOnContentContainer from "../containers/ReportOnContentContainer";
import ReportOnResultsContainer from "../containers/ReportOnResultsContainer";
import StructureContainer from "../containers/StructureContainer";
import OrganisationsContainer from "../containers/OrganisationsContainer";
import FacultiesContainer from "../containers/FacultiesContainer";
import DepartmentsContainer from "../containers/DepartmentsContainer";
import CoursesContainer from "../containers/CoursesContainer";
import ThemesContainer from "../containers/ThemesContainer";
import LmsContainer from "../containers/LmsContainer";
import QuestionsMcqContainer from "../containers/QuestionsMcqContainer";
import ResourcesContainer from "../containers/ResourcesContainer";
import HelpsContainer from "../containers/HelpsContainer";
import SchemesContainer from "../containers/SchemesContainer";
import PropTypes from "prop-types";
import ResultsViewerManager from "./ResultsViewerManager";

const StaffPortal = ({logged, authorized}) => {

    if (logged && !authorized) {
        return <Redirect to="/unauthorized"/>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <StaffNavbarContainer/>
            </div>
            <div className="row">
                <Route path="/staff" exact render={() => <Redirect to="/staff/courses" />} />
                <Route path="/staff/users" exact component={UsersContainer}/>
                <Route path="/staff/structure" component={StructureContainer}/>
                <Route path="/staff/structure/organisations" exact component={OrganisationsContainer}/>
                <Route path="/staff/structure/faculties" exact component={FacultiesContainer}/>
                <Route path="/staff/structure/departments" exact component={DepartmentsContainer}/>
                <Route path="/staff/courses" exact component={CoursesContainer}/>
                <Route path="/staff/schemes" exact component={SchemesContainer}/>
                <Route path="/staff/themes" exact component={ThemesContainer}/>
                <Route path="/staff/themes/:themeId/questions-mcq" exact component={QuestionsMcqContainer}/>
                <Route path="/staff/resources" exact component={ResourcesContainer}/>
                <Route path="/staff/helps" exact component={HelpsContainer}/>
                <Route path="/staff/groups" exact component={Groups}/>
                <Route path="/staff/complaints" exact component={Complaints}/>
                <Route path="/staff/lms" exact component={LmsContainer}/>
                <Route path="/staff/results" exact component={ResultsContainer}/>
                <Route path="/staff/results/details/:resultId" exact component={ResultsViewerManager}/>
                <Route path="/staff/report/on-content" exact component={ReportOnContentContainer}/>
                <Route path="/staff/report/on-results" exact component={ReportOnResultsContainer}/>
                <Route path="/staff/profile" exact component={ProfileContainer}/>
                <Route path="/staff/profile/password" exact component={PasswordContainer}/>
            </div>
        </div>
    );
}

StaffPortal.propTypes = {
    logged: PropTypes.bool.isRequired,
    authorized: PropTypes.bool.isRequired
};

export default StaffPortal;