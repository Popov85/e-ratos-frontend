import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PeekThemeSupport extends Component {

    componentDidMount() {
        const {themeId, themeSupport} = this.props;
        this.props.clearLoadingFailure();
        if (!themeSupport) this.props.getAllQuestionsTypesAndLevelsByThemeId(themeId);
    }

    renderTypeLevel(value) {
        const {type, total, totalLevel1, totalLevel2, totalLevel3 } = value;
        return <div key={type}>{type} ({total}): [L1: {totalLevel1} L2: {totalLevel2} L2: {totalLevel3}]</div>;
    }

    render() {
        const {isLoading, error} = this.props.themesSupport;
        if (isLoading) return <span className="text-center text-white">isLoading...</span>;
        if (error) return <span className="text-center text-white">Failed to fetch...</span>;
        const {themeSupport} = this.props;
        if (themeSupport) {
            const {totalByTheme, typeLevelMap} = themeSupport;
            return (
                <div className="text-left">
                    <div>Questions: {totalByTheme}</div>
                    {
                        Object.values(typeLevelMap).map((value) => this.renderTypeLevel(value))
                    }
                </div>
            );
        } else return null;
    }
};

PeekThemeSupport.propTypes = {
    themeId: PropTypes.number.isRequired,
    themeSupport: PropTypes.object,
    themesSupport: PropTypes.object.isRequired,

    clearLoadingFailure: PropTypes.func.isRequired,
    getAllQuestionsTypesAndLevelsByThemeId: PropTypes.func.isRequired
};

export default PeekThemeSupport;



