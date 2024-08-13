import React from 'react';
import {Redirect, Route} from "react-router-dom";
//@ts-ignore
import ProfileContainer from "../../staff/containers/ProfileContainer";
//@ts-ignore
import PasswordContainer from "../../staff/containers/PasswordContainer";
//@ts-ignore
import StudentNavbarContainer from "../containers/StudentNavbarContainer";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";

const StudentPortal: React.FC = () => {

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorized: boolean = useSelector((state: RootState) => state.auth.authorized);

    if (!logged) return null;

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

export default StudentPortal;