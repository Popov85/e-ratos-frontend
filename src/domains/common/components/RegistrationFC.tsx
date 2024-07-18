import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from 'redux-form';
import {getOrgIdSelector, getSavedCredentialsSelector, isLMSSelector} from "../selectors/registrationSelector";
import '../../../../main.css';
import Failure from "./Failure";
//@ts-ignore
import RegistrationForm from "../forms/RegistrationForm";
import RegistrationSuccess from './RegistrationSuccess';
//@ts-ignore
import LoginContainer from "../containers/LoginContainer";
import {RootState} from "../../../store/rootReducer";
import {SavedCredentials} from "../types/SavedCredentials";
import {RegistrationState} from "../reducers/registrationReducer";
import {
    clearClasses,
    clearFaculties,
    getClasses,
    getDerivedOrganisation,
    getFaculties,
    getOrganisations,
    getRegistered
} from "../actions/registrationActions";
import {Student} from "../types/Student";

const RegistrationFC: React.FC = () => {

    const dispatch = useDispatch();

    const isLMS: boolean = useSelector((state: RootState) => isLMSSelector(state));
    const orgId: number | null = useSelector((state: RootState) => getOrgIdSelector(state));
    const registration: RegistrationState = useSelector((state: RootState) => state.registration);
    const savedCredentials: SavedCredentials | null = useSelector((state: RootState) => getSavedCredentialsSelector(state));

    const [regSuccess, setRegSuccess] = useState<boolean>(false);
    const [regCancelled, setRegCancelled] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (isLMS) {
            dispatch(getDerivedOrganisation());
        } else {
            dispatch(getOrganisations(false));
        }
    }, []);

    const handleSubmit = (formData: any) => {
        const {name, surname, email, password, affiliation, year} = formData;

        const userId = null;
        const userData = {
            userId,
            name,
            surname,
            email,
            password
        };
        const { orgId, facId, classId } = affiliation;
        const studId = null;

        const student: Student = {
            studId,
            user: userData,
            orgId,
            facId,
            classId,
            entranceYear: year
        };

        dispatch(getRegistered(student, isLMS));
        setRegSuccess(true);
    };

    const displayPassword = () => {
        setShowPassword(!showPassword);
    };

    const {isLoading, error} = registration;

    if (regCancelled) return <LoginContainer/>;
    if (regSuccess && savedCredentials) return <RegistrationSuccess/>;

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                    <div className="card bg-transparent">
                        <div className="card-header pt-1 pb-1">
                            <small>
                                <div className="text-secondary text-center">Registration</div>
                            </small>
                        </div>
                        <div className="card-body">
                            {
                                isLoading &&
                                <div className="text-center text-info mt-n2 mb-2">
                                            <span>Registering...
                                                <div className="spinner-grow spinner-grow-sm text-info"
                                                     role="uploading"/>
                                            </span>
                                </div>
                            }
                            {
                                error &&
                                <div className="alert alert-danger p-1" role="alert">
                                    <Failure message={error.message}/>
                                </div>
                            }
                            <RegistrationForm
                                onSubmit={handleSubmit}
                                initialValues={null}
                                isLMS={isLMS}
                                orgId={orgId}
                                disabled={registration.isLoading}
                                showPassword={showPassword}
                                displayPassword={displayPassword}
                                registration={registration}
                                //getFaculties={()=>dispatch(getFaculties(orgId, isLMS))}//TODO
                                //getClasses={()=>dispatch(getClasses(facId, isLMS))}//TODO
                                clearFaculties={()=>dispatch(clearFaculties())}
                                clearClasses={()=>dispatch(clearClasses())}
                                resetForm={()=>dispatch(reset('registration'))}/>
                        </div>
                        <div className="card-footer pt-1 pb-1">
                            <div className="text-center text-secondary">
                                <small>
                                    Already registered?
                                    <a href="#" onClick={() => setRegCancelled(true)}>
                                        Login now!
                                    </a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-1 col-sm-2 col-md-3 col-lg-4"/>
            </div>
        </div>
    );
}

export default RegistrationFC;
