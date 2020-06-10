import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import ThemesLookupTable from "./ThemesLookupTable";

class ThemesLookup extends Component {

    componentDidMount() {
        const {themes} = this.props;
        if (!themes.content) this.props.getAllThemesByDepartment();
    }

    render() {
        const {userInfo, themes, themesSupport, courses, fields} = this.props;
        const {isLoading, error} = themes;

        return (
            <div className="p-1">
                {
                    error &&
                    <Error message="Operation failed!" close={() => this.props.clearAllThemesFailures()}/>
                }
                {
                    themes.content &&
                    <div className="pb-5">
                        <LoadingOverlay
                            active={false}
                            spinner
                            text='Performing API call...'>
                            <ThemesLookupTable
                                userInfo={userInfo}
                                fields = {fields}
                                themes={themes.content}
                                themesSupport={themesSupport}
                                courses = {courses}
                                deactivateThemesLookupModal = {this.props.deactivateThemesLookupModal}
                                getAllQuestionsTypesAndLevelsByThemeId = {this.props.getAllQuestionsTypesAndLevelsByThemeId}/>
                        </LoadingOverlay>
                    </div>
                }
                <Overlay show={isLoading ? true : false}/>
            </div>
        );
    }
}

ThemesLookup.propTypes = {
    userInfo: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    themes: PropTypes.object.isRequired,
    themesSupport: PropTypes.object.isRequired,
    courses: PropTypes.object.isRequired,

    deactivateThemesLookupModal: PropTypes.func.isRequired,
    getAllThemesByDepartment: PropTypes.func.isRequired,
    clearAllThemesFailures: PropTypes.func.isRequired,
    getAllQuestionsTypesAndLevelsByThemeId: PropTypes.func.isRequired
};

export default ThemesLookup;