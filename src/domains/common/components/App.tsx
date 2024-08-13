import React, {useEffect} from 'react';
import {Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import Forbidden from "./Forbidden";
import NotFound from "./NotFound";
import Initializer from "./Initializer";
import Login from "./Login";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {checkLogged} from "../actions/authActions";
import {Location} from "history";
import SessionLaunch from "../../session/components/SessionLaunch";
import {SecurityRole} from "../types/SecurityRole";
import StaffPortal from "../../staff/components/StaffPortal";
import StudentPortal from "../../student/components/StudentPortal";

type LocationState = {
    from: Location<LocationState>;
}

const App: React.FC = () => {

    const history = useHistory();
    const location: Location<LocationState> = useLocation();
    const dispatch: Dispatch<any> = useDispatch();

    const logged = useSelector((state: RootState) => state.auth.logged);
    const checkLogging = useSelector((state: RootState) => state.auth.checkLogging);
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    useEffect(() => {
        let {pathname, search} = location;
        console.log('Initial URL = ', pathname + search);
        dispatch(checkLogged());
    }, []); // Only run once on mount

    useEffect(() => {
        // Check if logged
        if (!logged) {
            // Redirect to /login page, remember location
            console.log("Redirecting to /login", logged);
            history.push('/login', {from: location});
        } else {
            // Redirect to the remembered URL
            if (location && location.state) {
                const {from} = location.state;
                console.log('Redirect URL = ', from.pathname + from.search);
                history.push(from.pathname + from.search);
            }
        }
    }, [logged]); // Only run on mount and additionally every time logged changes


    const defaultRedirect = () => {
        if (logged && userInfo) {
            if (userInfo.role === SecurityRole.ROLE_STUDENT) {
                return <Redirect to="/student"/>;
            }
            return <Redirect to="/staff"/>;
        }
    };

    if (checkLogging) {
        return <Initializer/>;
    }

    return (
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/staff" component={StaffPortal}/>
            <Route path="/student" component={StudentPortal}/>
            <Route path="/session" component={SessionLaunch}/>
            <Route exact path="/" render={defaultRedirect}/>
            <Route exact path="/unauthorized" component={Forbidden}/>
            <Route component={NotFound}/>
        </Switch>
    );
};

export default App;