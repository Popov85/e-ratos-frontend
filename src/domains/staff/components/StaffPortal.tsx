import React from 'react';
import {Redirect, Route} from "react-router-dom";
//@ts-ignore
import Groups from "./Groups";
//@ts-ignore
import Complaints from "./Complaints";
//@ts-ignore
import StaffNavbarContainer from "../containers/StaffNavbarContainer";
//@ts-ignore
import ResultsContainer from "../containers/ResultsContainer";
//@ts-ignore
import ReportOnContentContainer from "../containers/ReportOnContentContainer";
//@ts-ignore
import ReportOnResultsContainer from "../containers/ReportOnResultsContainer";
//@ts-ignore
import CoursesContainer from "../containers/CoursesContainer";
//@ts-ignore
import ThemesContainer from "../containers/ThemesContainer";
//@ts-ignore
import LmsContainer from "../containers/LmsContainer";
//@ts-ignore
import QuestionsMcqContainer from "../containers/QuestionsMcqContainer";
//@ts-ignore
import ResourcesContainer from "../containers/ResourcesContainer";
//@ts-ignore
import HelpsContainer from "../containers/HelpsContainer";
//@ts-ignore
import SchemesContainer from "../containers/SchemesContainer";
//@ts-ignore
import ResultsViewerManager from "./ResultsViewerManager";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import Structure from "./Structure";
import Organisations from "./Organisations";
import Faculties from "./Faculties";
import Departments from "./Departments";
import Users from "./Users";
import Profile from "./Profile";
import Password from "./Password";

const StaffPortal: React.FC = () => {

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorized: boolean = useSelector((state: RootState) => state.auth.authorized);

    if (!logged) return null;

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
                <Route path="/staff/users" exact component={Users}/>
                <Route path="/staff/structure" component={Structure}/>
                <Route path="/staff/structure/organisations" exact component={Organisations}/>
                <Route path="/staff/structure/faculties" exact component={Faculties}/>
                <Route path="/staff/structure/departments" exact component={Departments}/>
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
                <Route path="/staff/profile" exact component={Profile}/>
                <Route path="/staff/profile/password" exact component={Password}/>
            </div>
        </div>
    );
}

export default StaffPortal;