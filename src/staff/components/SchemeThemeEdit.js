import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import {themesSupportTransformer} from "../../utils/transformers/themesSupportTransformer";
import SchemeThemeEditForm from "../forms/SchemeThemeEditForm";

class SchemeThemeEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearLoadingFailure();
        let {themeId, themeSupport} = this.props;
        if (!themeSupport) {
            // Go and fetch theme support
            this.props.getAllQuestionsTypesAndLevelsByThemeId(themeId);
        }
    }

    handleSubmit(data) {
        const {theme, fields, settings, index} = this.props;
        // If new push, else - replace!
        if (!settings && !index) {
            let order = fields.length;
            let transformed = themesSupportTransformer
                .toObject(data, theme, order);
            fields.push(transformed);
        } else { // Replace existing!
            let order = index;
            let transformed = themesSupportTransformer
                .toObject(data, theme, order);
            fields.splice(index, 1, transformed);
        }
        this.props.deactivateModal();
        if (!settings && !index)
            this.props.deactivateThemesLookupModal();
    }


    render() {
        const {theme, themeSupport, settings} = this.props;
        const {isLoading, error, message} = this.props.themesSupport;
        let typeLevelMap = null;
        if (themeSupport) {
            typeLevelMap = Object.entries(themeSupport.typeLevelMap)
                .map(([key, value])=>({...value, typeId: key}));
        }

        return (
            <div>
                <div className="row mt-1">
                    <div className="col-12">
                        {
                            isLoading &&
                            <div className="text-center text-secondary m-2">
                                <span>Loading...</span>
                            </div>
                        }
                        {
                            error &&
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                    <Failure message={error.message}/>
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
                        <h6 className="text-center text-secondary">{theme}</h6>
                        <div className="card bg-transparent">
                            <div className="card-body">
                                {
                                    themeSupport && <SchemeThemeEditForm
                                        initialValues={
                                            {
                                                themeId: themeSupport.themeId,
                                                typeLevelMap: typeLevelMap
                                            }
                                        }
                                        theme={themeSupport.theme}
                                        settings={settings}
                                        typeLevelMap = {typeLevelMap}
                                        finished={message ? true : false}
                                        disabled={isLoading}
                                        resetForm = {this.props.resetForm}
                                        onSubmit={data => this.handleSubmit(data)}
                                    />
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchemeThemeEdit.propTypes = {
    themeId: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    index: PropTypes.number, // for editing!
    settings: PropTypes.array, // for editing!
    themesSupport: PropTypes.object.isRequired,
    themeSupport: PropTypes.object, // Nullable for new objects

    deactivateModal: PropTypes.func.isRequired,
    deactivateThemesLookupModal: PropTypes.func,
    clearLoadingFailure: PropTypes.func.isRequired,
    getAllQuestionsTypesAndLevelsByThemeId: PropTypes.func.isRequired
};

export default SchemeThemeEdit;
