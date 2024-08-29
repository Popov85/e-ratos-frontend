import React, {useState} from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {minLength2, number, required} from "../../../utils/validators/validators";
import {FaSignInAlt, FaToggleOff, FaToggleOn} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import {FormSelect} from "../types/form/FormSelect";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {getAllAccessesForSelect} from "../selectors/accessSelector";
import {Course} from "../types/Course";
import FieldText from "../../common/forms/controls/FieldText";

// Define the props for your component
type CourseEditFormProps = {
    disabled: boolean;
    finished: boolean;
}

// Combine the props with `InjectedFormProps` from `redux-form`
type Props = InjectedFormProps<Course, CourseEditFormProps> & CourseEditFormProps;

const CourseEditForm: React.FC<Props> = props => {

    const accesses: FormSelect[] = useSelector((state: RootState) => getAllAccessesForSelect(state));

    // TODO!
    const lmses: any[] = []; // import {getLMSesForSelect} from "../selectors/lmsSelector";

    const [lmsMode, setLMSMode] = useState<boolean>(false);

    const {disabled, finished, initialValues} = props;

    const isLMS = () => {
        return initialValues && initialValues.lmsId;
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>
                {
                    !initialValues &&
                    <div className="text-right mt-n3" title="Is LMS?">
                        <a href="#" className="badge badge-info pl-2 pr-2 mb-1 mr-n3"
                           onClick={() => setLMSMode(!lmsMode)}>
                            {lmsMode ?
                                <FaToggleOn color="white" style={{fontSize: '1.25em'}}/> :
                                <FaToggleOff color="white" style={{fontSize: '1.25em'}}/>}
                        </a>
                    </div>
                }
                <Field name="courseId" component="input" type={"text"} hidden/>

                <Field name="name" component={FieldText} placeholder="name"
                       validate={[required, minLength2]}/>

                <Field name="accessId" component={FieldSelectBadge} badge="Access"
                       items={accesses} validate={[required, number]}/>
                {
                    (lmsMode || isLMS()) &&
                    <Field name="lmsId" component={FieldSelectBadge} badge="LMS"
                           items={lmses} validate={[required, number]}/>
                }
                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

// Wrap the form with `reduxForm`
export default reduxForm<Course, CourseEditFormProps>({form: 'course-edit', enableReinitialize: true})(CourseEditForm);