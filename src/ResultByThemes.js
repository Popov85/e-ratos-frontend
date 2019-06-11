import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultByThemes extends Component {

    renderPercent(percent) {
        const isCritical = (percent < 50);
        var color = "success"
        if (isCritical) color = "danger"
        return (
            <div className={"col-1 text-center border alert-sm alert-" + color}>
                {percent + "%"}
            </div>);
    }

    renderTheme(resultPerTheme) {
        return (
            <div key={resultPerTheme.themeDomain.themeId} className="row bg-light m-1">
                <div className="col-10 text-left border">
                    {resultPerTheme.themeDomain.name}
                </div>
                <div className="col-1 text-center border alert-sm alert-info">
                    {resultPerTheme.quantity}
                </div>
                {this.renderPercent(resultPerTheme.percent)}
            </div>);
    }


    render() {
        const { displayThemeResults } = this.props.settings;
        if (!displayThemeResults) return null;
        var output = [];
        this.props.resultPerTheme.map(t => output.push(this.renderTheme(t)));
        return (
            <div className="row mt-3">
                <div className="col-xs-1 col-sm-1 col-md-2 col-lg-3 col-xl-3" />
                <div className="col-xs-10 col-sm-10 col-md-8 col-lg-6 col-xl-6">
                    <details open = {true}>
                        <summary className = "border">By themes</summary>
                        {output}
                    </details>
                </div>
                <div className="col-xs-1 col-sm-1 col-md-2 col-lg-3 col-xl-3" />
            </div>
        );
    }
}

ResultByThemes.propTypes = {
    settings: PropTypes.object.isRequired,
    resultPerTheme: PropTypes.array.isRequired
};

export default ResultByThemes;