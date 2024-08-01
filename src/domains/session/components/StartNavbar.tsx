import React from 'react';
import {Button, Navbar} from "react-bootstrap";
import {FaSignOutAlt, FaUserGraduate} from 'react-icons/fa';
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {getUserInfo} from "../../common/selectors/userSelector";
import {UserInfo} from "../../common/types/UserInfo";
import {getContext} from "../selectors/contextSelector";
import {getLoggedOut} from "../../common/actions/authActions";
import {Context} from "../types/Context";

const StartNavbar: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));
    const context: Context | null = useSelector((state: RootState) => getContext(state));
    const isLoggingOut: boolean = useSelector((state: RootState) => state.auth.isLoggingOut);

    // Fail-safe protection
    if (!userInfo || !context) return null;

    const {isLMS} = context;
    const {email} = userInfo;

    return (
        <Navbar variant="dark" bg="info" expand="lg" className="w-100">
            <Navbar.Brand className="text-light">
                <strong>e-Ratos</strong>&nbsp;<small>session</small>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Navbar.Text className="mr-2">
                    <FaUserGraduate style={{fontSize: '1.25em'}}/>
                    <strong>&nbsp;{email}</strong>
                    {
                        isLMS ?
                            <span><strong>&nbsp;|&nbsp;LMS</strong></span> :
                            <span><strong>&nbsp;|&nbsp;non-LMS</strong></span>
                    }
                </Navbar.Text>
                {
                    !isLoggingOut ?
                        <Button variant="light" size="sm" onClick={() => dispatch(getLoggedOut())}
                                title="Wish to log out?">
                            Logout <FaSignOutAlt/>
                        </Button> :
                        <span className="text-light">Logout..</span>
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default StartNavbar;