import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Field, FieldArray, reduxForm} from 'redux-form';
import {minLength2, number, required} from "../../utils/validators";
import {FaChevronUp, FaPlus, FaRegTrashAlt, FaSignInAlt} from "react-icons/fa";
import FieldText from "../../common/forms/controls/FieldText";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import FieldRadio from "../../common/forms/controls/FieldRadio";
import FieldSelectBadgeWithControls from "./controls/FieldSelectBadgeWithControls";
import Failure from "../../common/Failure";
import validateScheme from "../../utils/validators/validatorScheme";
import ThemeLookupModal from "../components/ThemeLookupModal";
import SchemeThemeEditModal from "../components/SchemeThemeEditModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PeekSelectedTypes from "../components/PeekSelectedTypes";

let SchemeEditForm = props => {

    // Theme lookup table modal;
    const initThemeLookup = {mode: false, fields: null};

    const [themeLookupMode, setThemeLookupMode] = useState(initThemeLookup);

    const deactivateThemeLookupMode = () => setThemeLookupMode(initThemeLookup);

    // Settings edit modal;
    const initThemeEdit = {mode: false, fields: null, index: null, settings: null, selectedTheme: null, selectedThemeId: null};

    const [themeEditMode, setThemeEditMode] = useState(initThemeEdit);

    const deactivateThemeEditMode = () => setThemeEditMode(initThemeEdit);


    const getDefaultType = () => {
        return getFourType();
    }

    const getTwoType = () => {
        return {
            badge: "Two",
            items: props.gradingsTwoPoint,
            itemsFull: props.gradingsTwoPointContent
        }
    }

    const getFourType = () => {
        return {
            badge: "Four",
            items: props.gradingsFourPoint,
            itemsFull: props.gradingsFourPointContent
        }
    }

    const getFreeType = () => {
        return {
            badge: "Free",
            items: props.gradingsFreePoint,
            itemsFull: props.gradingsFreePointContent
        }
    }

    const getGradingsType = () => {
        const {gradingDetails} = props.scheme;
        if (!gradingDetails) return getDefaultType();
        if (gradingDetails.hasOwnProperty('twoId'))
            return getTwoType();
        if (gradingDetails.hasOwnProperty('fourId'))
            return getFourType();
        if (gradingDetails.hasOwnProperty('freeId'))
            return getFreeType();
        throw new Error("Failed to determine the grading details type");
    }

    const initGradingDetails = props.scheme ? getGradingsType() : getDefaultType();

    const [gradingDetails, setGradingDetails] = useState(initGradingDetails);

    const gradingOnChange = gradingId => {
        let grading = props.gradingsContent
            .find(gc => gc.gradingId === Number(gradingId));
        if (!grading)
            throw new Error("Grading is not found!");
        if (grading.name === 'two-point') {
            setGradingDetails(getTwoType());
        } else if (grading.name === 'four-point') {
            setGradingDetails(getFourType());
        } else if (grading.name === 'free-point') {
            setGradingDetails(getFreeType());
        } else {// FallBack to default two-point
            setGradingDetails(getDefaultType());
        }
        props.change("gradingDetailsId", "");
    }

    const swapThemes = (fields, index) => {
        let curr = index;
        let prev = index - 1;
        if (prev < 0) prev = fields.length - 1;
        let currObj = fields.get(curr);
        let prevObj = fields.get(prev);
        let currOrder = currObj.order;
        let prevOrder = prevObj.order;
        currObj.order = prevOrder;
        prevObj.order = currOrder;
        return fields.swap(curr, prev);
    }

    const countSchemeQuestions = fields => {
        if (!fields) return 0;
        return fields
            .map(f => countThemeQuestions(f.settings))
            .reduce((a, b) => a + b, 0);
    }

    const countThemeQuestions = settings => {
        if (!settings) return 0;
        return settings
            .map(s => (s.level1 + s.level2 + s.level3))
            .reduce((a, b) => a + b, 0);
    }

    const renderThemeName = (fields, index) => {
        let selectedTheme = fields.get(index).theme;
        return (
            <div className="input-group form-group m-0 p-0" title={selectedTheme}>
                <span className="form-control form-control-sm text-left overflow-hidden">
                    {selectedTheme}
                </span>
            </div>);
    }

    // See https://github.com/react-bootstrap/react-bootstrap/issues/3393
    const renderTypesNumbers = (fields, index, label, width) => {
        let selectedThemeId = fields.get(index).themeId;
        let selectedTheme = fields.get(index).theme;
        let settings = fields.get(index).settings;
        return (
            <div className="input-group form-group m-0 p-0">
                <OverlayTrigger placement="top"
                                overlay={
                                    <Tooltip id={`peek-theme-${index}`}>
                                        <PeekSelectedTypes settings={settings}/>
                                    </Tooltip>}
                                popperConfig={
                                    {
                                        modifiers: {
                                            preventOverflow: {enabled: false},
                                            hide: {enabled: false}
                                        }
                                    }}>
                    <a href="#" className="form-control form-control-sm text-left" style={{width: width}}
                       onClick={() => setThemeEditMode({
                           mode: true,
                           fields: fields,
                           index: index,
                           settings: settings,
                           selectedTheme: selectedTheme,
                           selectedThemeId: selectedThemeId
                       })}>
                        {label}
                    </a>
                </OverlayTrigger>
            </div>
        );
    }

    const renderSettings = (fields, index) => {
        let settings = fields.get(index).settings;
        if (settings.length === 0) return "";
        let sum = countThemeQuestions(settings);
        let label = "";
        if (settings.length === 1) {
            let item = settings[0];
            const {type} = item;
            label = sum + ": " + type;
        } else {
            label = sum + ": " + "MIX";
        }
        return renderTypesNumbers(fields, index, label, '80px');
    }

    const renderTheme = (fields, theme, index) => {
        return (
            <div key={index} className="d-flex align-items-center overflow-auto m-0 mb-1 p-0">

                <Field name={`${theme}.schemeThemeId`} type="text" component="input" hidden/>

                <div className="flex-grow-1 m-0 p-0">
                    {
                        renderThemeName(fields, index)
                    }
                </div>

                <div className="m-0 p-0">
                    {
                        renderSettings(fields, index)
                    }
                </div>

                <div className="d-flex  m-0 p-0">
                    <button type="button" className="btn btn-light btn-sm" title="Move the item up!"
                            onClick={() => swapThemes(fields, index)} disabled={fields.length === 1 ? true : false}>
                        <FaChevronUp/>
                    </button>
                    <button type="button" className="btn btn-light btn-sm" onClick={() => fields.remove(index)}
                            title="Remove the item!"><FaRegTrashAlt/></button>
                </div>

            </div>
        );
    }

    const renderThemes = ({fields, meta: {error, submitFailed}}) => {
        return (
            <div>
                {
                    fields.length !== 0 ?
                        fields.getAll()
                            .sort((a, b) => (a.order - b.order))
                            .map((theme, index) => renderTheme(fields, theme, index))
                        : null
                }
                {
                    submitFailed && error &&
                    <Failure message={error}/>
                }
                <div className="d-flex justify-content-between align-items-end m-1 mt-2 mb-2">
                    {
                        fields.length === 0 ?
                            <span>
                                <i>Nothing is selected!</i>
                            </span> :
                            <span>
                                <div className="d-inline-flex mr-1">
                                    <div><i>Themes:</i></div>
                                    <div><u>{fields.length}</u></div>
                                </div>
                                <div className="d-inline-flex">
                                    <div><i>Questions:</i></div>
                                    <div><u>{countSchemeQuestions(fields.getAll())}</u></div>
                                </div>
                            </span>
                    }
                    <div>
                        <button type="button" value="Add" className="btn btn-info btn-sm"
                                onClick={() => setThemeLookupMode({mode: true, fields: fields})}>
                            <div className="align-middle">Add&nbsp;<FaPlus color="white"/></div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const {disabled, finished} = props;

    const {
        courses, strategies, accesses, gradings,
        modes, modesContent, settings, settingsContent, options, optionsContent
    } = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>

                <Field name="schemeId" component="input" type={"text"} hidden/>

                <Field name="name" component={FieldText} placeholder="name"
                       validate={[required, minLength2]}/>
                <Field name="courseId" component={FieldSelectBadge} badge="Course"
                       items={courses} validate={[required, number]}/>

                <div className="row mt-n2 mb-2">
                    <div className="col-5 pr-1">
                        <div className="ratos-form-fieldset">
                            <fieldset>
                                <legend>Properties</legend>
                                <div className="d-flex justify-content-between">
                                    <div className="d-inline-block text-truncate mr-1">
                                        <Field name="active" id="active" component="input" type="checkbox"
                                               title="Is this scheme active for students to take?"/>
                                        <label htmlFor="active" className="mb-0">Activated</label>
                                    </div>
                                    <div className="d-inline-block text-truncate">
                                        <Field name="lmsOnly" id="lmsOnly" component="input" type="checkbox"
                                               title="Is this scheme only for LMS?"/>
                                        <label htmlFor="lmsOnly" className="mb-0">LMS_only!</label>
                                    </div>
                                </div>
                                <fieldset className="p-0 pl-1">
                                    <legend>Strategy</legend>
                                    <Field name="strategyId"
                                           component={FieldRadio}
                                           items={strategies}
                                           def="default"
                                           label="strategy"
                                           title="Please, select a strategy!"
                                           validate={[required, number]}/>

                                </fieldset>
                                <fieldset className="p-0 pl-1">
                                    <legend>Access</legend>
                                    <Field name="accessId"
                                           component={FieldRadio}
                                           items={accesses}
                                           def="dep-private"
                                           label="access"
                                           title="Please, select an access!"
                                           validate={[required, number]}/>
                                </fieldset>

                                <fieldset className="p-0 pl-1">
                                    <legend>Grading</legend>
                                    <Field name="gradingId"
                                           component={FieldRadio}
                                           items={gradings}
                                           def="four-point"
                                           label="Grading"
                                           title="Please, select a grading!"
                                           validate={[required, number]}
                                           onChange={(event, newValue) => gradingOnChange(newValue)}/>
                                </fieldset>

                                <div className="mt-3"></div>

                                <div>
                                    <Field name="gradingDetailsId"
                                           component={FieldSelectBadgeWithControls}
                                           badge={gradingDetails.badge}
                                           items={gradingDetails.items}
                                           itemsFull={gradingDetails.itemsFull}
                                           validate={[required, number]}/>
                                </div>

                                <div className="mt-1">
                                    <Field name="modeId"
                                           component={FieldSelectBadgeWithControls}
                                           badge="Mode"
                                           items={modes}
                                           itemsFull={modesContent}
                                           validate={[required, number]}/>
                                </div>

                                <div className="mt-1">
                                    <Field name="settingsId"
                                           component={FieldSelectBadgeWithControls}
                                           badge="Settings"
                                           items={settings}
                                           itemsFull={settingsContent}
                                           validate={[required, number]}/>
                                </div>

                                <div className="mt-1">
                                    <Field name="optId"
                                           component={FieldSelectBadgeWithControls}
                                           badge="Options"
                                           items={options}
                                           itemsFull={optionsContent}
                                           validate={[required, number]}/>
                                </div>

                            </fieldset>
                        </div>
                    </div>
                    <div className="col-7 pl-1">
                        <div className="ratos-form-fieldset h-100">
                            <fieldset>
                                <legend>Themes</legend>
                                <FieldArray name="themes" component={renderThemes}/>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp;<FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
            {
                themeLookupMode.mode
                && <ThemeLookupModal show={true}
                                     fields={themeLookupMode.fields}
                                     deactivateModal={deactivateThemeLookupMode}/>
            }
            {
                themeEditMode.mode
                && <SchemeThemeEditModal show={true}
                                         fields={themeEditMode.fields}
                                         settings={themeEditMode.settings}
                                         index={themeEditMode.index}
                                         selectedTheme={themeEditMode.selectedTheme}
                                         selectedThemeId={themeEditMode.selectedThemeId}
                                         deactivateModal={deactivateThemeEditMode}/>
            }
        </form>
    );
}

/*
  CRUD on {mode, settings, options, gradings(3)}
  1. New, Peek, Edit, [Delete]
 */
SchemeEditForm.propTypes = {
    scheme: PropTypes.object,
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired,
    strategies: PropTypes.array.isRequired,
    accesses: PropTypes.array.isRequired,
    modes: PropTypes.array.isRequired,
    modesContent: PropTypes.array.isRequired,
    settings: PropTypes.array.isRequired,
    settingsContent: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    optionsContent: PropTypes.array.isRequired,
    gradings: PropTypes.array.isRequired,
    gradingsContent: PropTypes.array.isRequired,
    gradingsTwoPoint: PropTypes.array.isRequired,
    gradingsTwoPointContent: PropTypes.array.isRequired,
    gradingsFourPoint: PropTypes.array.isRequired,
    gradingsFourPointContent: PropTypes.array.isRequired,
    gradingsFreePoint: PropTypes.array.isRequired,
    gradingsFreePointContent: PropTypes.array.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

SchemeEditForm = reduxForm({form: 'scheme-edit', validate: validateScheme, enableReinitialize: true})(SchemeEditForm);

export default SchemeEditForm;