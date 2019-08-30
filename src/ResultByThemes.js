import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultByThemes extends Component {

    renderTheme(themeResult) {
        return (
            <div key={themeResult.theme.themeId} className="row bg-light mt-1 mb-1 no-gutters">
                <div className="col-8 text-truncate border">
                    <span className= "text-secondary" title={"Theme #"+themeResult.theme.themeId+": "+themeResult.theme.name}>{themeResult.theme.name}</span>
                </div>
                <div className="col-2 text-center border alert-sm alert-info">
                    <span title = "Quantity of questions in this theme">{themeResult.quantity}</span>
                </div>
                <div className={`col-2 text-center border alert-sm alert-${((themeResult.percent < 50) ? "danger" : "success")}`}>
                    <span title= "Result on this theme">{themeResult.percent.toFixed(1) + "%"}</span>
                </div>
            </div>);
    }


    render() {
        var output = [];
        this.props.themeResults.map(t => output.push(this.renderTheme(t)));
        return (
            <div className="row mt-3">
                <div className="col-xs-0 col-sm-1 col-md-2" />
                <div className="col-xs-12 col-sm-10 col-md-8">
                    <details open={true}>
                        <summary className="border text-secondary">By themes</summary>
                        {output}
                    </details>
                </div>
                <div className="col-xs-0 col-sm-1 col-md-2" />
            </div>
        );
    }
}

ResultByThemes.propTypes = {
    themeResults: PropTypes.array.isRequired
};

export default ResultByThemes;