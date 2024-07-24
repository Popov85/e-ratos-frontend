import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types";
import {Field, FieldArray, reduxForm} from 'redux-form';
import {FaRegTrashAlt, FaSignInAlt} from "react-icons/fa";
import Failure from "../../common/components/Failure";
import validateSchemeTheme from "../../../utils/validators/validatorSchemeTheme";
import FieldNumberNoValidate from "../../common/forms/controls/FieldNumberNoValidate";

const removeType = (fields, index, initMap) => {
    fields.remove(index);
    initMap.splice(index, 1);
}

const renderSetting = (value, index, fields, initMap, initSettings) => {
    let previouslySet = false;
    if (initSettings) {
        let currentType = fields.get(index).type;
        // Find this type to see previously set settings on this type;
        let foundType = initSettings
            .find(s => s.type === currentType);
        if (foundType) previouslySet = true;
    }
    return (
        <div key={index} className="row">

            <Field name={`${value}.typeId`} type="text" component="input" hidden/>

            <div className="col-2 p-0">
                <span>{fields.get(index).type}:</span>
            </div>

            <div className="col-10 p-0">
                <div className="d-flex align-items-baseline justify-content-between">
                    <Field name={`${value}.totalLevel1`}
                           component={FieldNumberNoValidate}
                           placeholder="L1"
                           max={initMap[index].totalLevel1}
                           width="60px"
                           sizeClass="form-control-sm"
                           marginClass="mb-1"
                           bg={previouslySet ? 'bg-success' : null}/>

                    <Field name={`${value}.totalLevel2`}
                           component={FieldNumberNoValidate}
                           placeholder="L2"
                           max={initMap[index].totalLevel2}
                           width="60px"
                           sizeClass="form-control-sm"
                           marginClass="mb-1"
                           bg={previouslySet ? 'bg-success' : null}/>

                    <Field name={`${value}.totalLevel3`}
                           component={FieldNumberNoValidate}
                           placeholder="L3"
                           max={initMap[index].totalLevel3}
                           width="60px"
                           sizeClass="form-control-sm"
                           marginClass="mb-1"
                           bg={previouslySet ? 'bg-success' : null}/>

                    <button type="button" className="btn btn-light btn-sm" title="Del"
                            onClick={() => removeType(fields, index, initMap)}>
                        <FaRegTrashAlt/>
                    </button>
                </div>
            </div>

        </div>
    );
}

const renderSettings = ({fields, initMap, initSettings, meta: {error, submitFailed}}) => {
    return (
        <div>
            {
                fields.map((type, index) => renderSetting(type, index, fields, initMap, initSettings))
            }
            {
                submitFailed && error && <Failure message={error}/>
            }
        </div>
    );
}

let SchemeThemeEditForm = props => {

    const {disabled, finished, initialValues} = props;

    // ComponentDidMount
    useEffect(() => {
        const {typeLevelMap, settings} = initialValues;
        if (!settings || !typeLevelMap) return;
        typeLevelMap.forEach((value, index) => {
            let foundSettings = settings.find(s => s.type === value.type);
            if (foundSettings) {
                const {level1, level2, level3} = foundSettings;
                // Update form with previously set values!
                props.change('typeLevelMap[' + index + '].totalLevel1', level1);
                props.change('typeLevelMap[' + index + '].totalLevel2', level2);
                props.change('typeLevelMap[' + index + '].totalLevel3', level3);
            }
        });
    }, [])

    const [typeLevelMap, setTypeLevelMap] = useState(initialValues ? initialValues.typeLevelMap : []);

    const restoreInitMap = () => setTypeLevelMap(initialValues ? initialValues.typeLevelMap : []);

    const resetForm = () => {
        restoreInitMap();
        props.resetForm();
    }

    return (
        <form>
            <fieldset disabled={disabled || finished}>

                <Field name="themeId" component="input" type="text" hidden/>

                <FieldArray name="typeLevelMap" component={renderSettings} initMap={typeLevelMap}
                            initSettings={initialValues.settings}/>

                <div className="form-group text-center mt-2">
                    <button type="button" value="Add" className="btn btn-sm btn-info mr-2"
                            onClick={() => props.handleSubmit()}>
                        <div className="align-middle">Add&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
            <div className="text-center" hidden={finished}>
                <a href="#" className="badge badge-secondary" onClick={() => resetForm()}>
                    Reset
                </a>
            </div>
        </form>
    );
}

SchemeThemeEditForm.propTypes = {
    theme: PropTypes.string,
    settings: PropTypes.array, // For editing
    typeLevelMap: PropTypes.array,

    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

SchemeThemeEditForm = reduxForm({
    form: 'scheme-theme-edit',
    validate: validateSchemeTheme,
    enableReinitialize: true
})(SchemeThemeEditForm);

export default SchemeThemeEditForm;