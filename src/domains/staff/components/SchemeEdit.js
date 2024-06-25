import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import SchemeEditForm from "../forms/SchemeEditForm";

class SchemeEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearSchemeState();
        let {scheme} = this.props;
        if (!this.isSchemeDetailsLoaded()) {
            this.props.getOneSchemeByIdForEdit(scheme.schemeId);
        }
        // If at least one of the components needed is absent re-load all of them (so-so, but workable)!
        this.props.getAllSchemeComponentsForCreate();

    }

    isSchemeDetailsLoaded() {
        let {scheme} = this.props;
        if (scheme) {
            if (!scheme.gradingDetails || !scheme.themes) {
                return false;
            }
        }
        return true;
    }

    isAllComponentsLoaded() {
        let {
            coursesForSelect, strategiesForSelect,
            settingsForSelect, modesForSelect, optionsForSelect,
            gradingsForSelect, gradingsTwoPointForSelect, gradingsFourPointForSelect,
            gradingsFreePointForSelect, accessesForSelect
        } = this.props;

        const selects = [
            accessesForSelect,
            coursesForSelect,
            strategiesForSelect,
            settingsForSelect,
            modesForSelect,
            optionsForSelect,
            gradingsForSelect,
            gradingsTwoPointForSelect,
            gradingsFourPointForSelect,
            gradingsFreePointForSelect
        ];

        //console.log("coursesForSelect = ", coursesForSelect);

        return !selects.some(select => !select || select.length === 1);
    }

    handleSubmit(data) {
        //console.log("Scheme = ", data);
        !data.schemeId ?
            this.props.saveScheme(data)
            : this.props.updateScheme(data);
    }

    getGradingDetailsId() {
        const {gradingDetails} = this.props.scheme;
        if (!gradingDetails) return 1;
        if (gradingDetails.hasOwnProperty('twoId')) return gradingDetails.twoId;
        if (gradingDetails.hasOwnProperty('fourId')) return gradingDetails.fourId;
        if (gradingDetails.hasOwnProperty('freeId')) return gradingDetails.freeId;
        throw new Error('Failed to determine gradingDetailsId!');
    }

    render() {
        const {
            userInfo, scheme, coursesForSelect, strategiesForSelect,
            accessesForSelect, modesForSelect, modes, settingsForSelect,
            settings, optionsForSelect, options, gradingsForSelect, gradings,
            gradingsTwoPointForSelect, gradingsTwoPoint, gradingsFourPointForSelect,
            gradingsFourPoint, gradingsFreePointForSelect, gradingsFreePoint
        } = this.props;
        const {isLoading, isLoadingSchemeComponents, error, errorLoadingComponents, message} = this.props.schemeEdit;

        return (
            <div>
                <div className="row mt-1">
                    <div className="col-12">
                        {
                            isLoadingSchemeComponents &&
                            <div className="text-center text-secondary m-2">
                                <span>Loading...</span>
                            </div>
                        }
                        {
                            isLoading &&
                            <div className="text-center text-secondary m-2">
                                <span>Saving...</span>
                            </div>
                        }
                        {
                            (error || errorLoadingComponents) &&
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                    <Failure message={error ? error.message : errorLoadingComponents.message}/>
                                </strong>
                                </span>
                            </div>
                        }
                        {
                            message &&
                            <div className="alert alert-success text-center p-1" role="success">
                                <span className="text-success"><strong>{message}</strong></span>
                            </div>
                        }
                        <div className="card bg-transparent">
                            <div className="card-body">
                                {
                                    this.isAllComponentsLoaded()
                                    && this.isSchemeDetailsLoaded()
                                    && <SchemeEditForm
                                        initialValues={scheme ?
                                            {
                                                schemeId: scheme.schemeId,
                                                name: scheme.name,
                                                courseId: scheme.course.courseId,
                                                strategyId: scheme.strategy.strId,
                                                accessId: scheme.access.accessId,
                                                modeId: scheme.mode.modeId,
                                                settingsId: scheme.settings.setId,
                                                optId: scheme.options.optId,
                                                gradingId: scheme.grading.gradingId,
                                                gradingDetailsId: this.getGradingDetailsId(),
                                                themes: scheme.themes,
                                                active: scheme.active,
                                                lmsOnly: scheme.lmsOnly,
                                                groups: [],
                                            }
                                            :
                                            {
                                                active: true,
                                                strategyId: 1,
                                                accessId: 1,
                                                gradingId: 1,
                                                groups:[]
                                            }
                                        }
                                        scheme={scheme}
                                        courses={coursesForSelect}
                                        strategies={strategiesForSelect}
                                        accesses={accessesForSelect}
                                        modes={modesForSelect}
                                        modesContent={modes}
                                        settings={settingsForSelect}
                                        settingsContent={settings}
                                        options={optionsForSelect}
                                        optionsContent={options}
                                        gradings={gradingsForSelect}
                                        gradingsContent={gradings}
                                        gradingsTwoPoint={gradingsTwoPointForSelect}
                                        gradingsTwoPointContent={gradingsTwoPoint}
                                        gradingsFourPoint={gradingsFourPointForSelect}
                                        gradingsFourPointContent={gradingsFourPoint}
                                        gradingsFreePoint={gradingsFreePointForSelect}
                                        gradingsFreePointContent={gradingsFreePoint}
                                        userInfo={userInfo}
                                        finished={!!message}
                                        disabled={isLoading || isLoadingSchemeComponents}
                                        onSubmit={data => this.handleSubmit(data)}
                                    />
                                }
                            </div>
                            <div className="form-group text-center mt-n2 mb-2" hidden={!!message}>
                                <a href="#" className="badge badge-secondary" onClick={() => this.props.resetForm()}>
                                    Reset
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchemeEdit.propTypes = {
    userInfo: PropTypes.object.isRequired,
    schemeEdit: PropTypes.object.isRequired,
    scheme: PropTypes.object, // Nullable for new objects
    coursesForSelect: PropTypes.array, // Array adopted for select
    accessesForSelect: PropTypes.array, // Array adopted for select
    strategiesForSelect: PropTypes.array, // Array adopted for select

    modesForSelect: PropTypes.array, // Array adopted for select
    modes: PropTypes.array,
    settingsForSelect: PropTypes.array, // Array adopted for select
    settings: PropTypes.array,
    optionsForSelect: PropTypes.array, // Array adopted for select
    options: PropTypes.array,
    gradingsForSelect: PropTypes.array, // Array adopted for select
    gradings: PropTypes.array,
    gradingsTwoPointForSelect: PropTypes.array,
    gradingsTwoPoint: PropTypes.array,
    gradingsFourPointForSelect: PropTypes.array,
    gradingsFourPoint: PropTypes.array,
    gradingsFreePointForSelect: PropTypes.array,
    gradingsFreePoint: PropTypes.array,

    clearSchemeState: PropTypes.func.isRequired,
    saveScheme: PropTypes.func.isRequired,
    updateScheme: PropTypes.func.isRequired,
    getOneSchemeByIdForEdit: PropTypes.func.isRequired,
    getAllSchemeComponentsForCreate: PropTypes.func.isRequired
};

export default SchemeEdit;
