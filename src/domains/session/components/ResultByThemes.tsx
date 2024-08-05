import React from 'react';
import {ThemeResult} from "../types/FinishInfo";

const ResultByThemes: React.FC<{ themeResults: Array<ThemeResult> }> = ({themeResults = []}) => {

    if (themeResults.length === 0) return null;

    const renderTheme = (themeResult: ThemeResult) => {
        return (
            <div key={themeResult.theme.themeId} className="row bg-light mt-1 mb-1 no-gutters">
                <div className="col-8 text-truncate border">
                    <span className="text-secondary"
                          title={"Theme #" + themeResult.theme.themeId + ": " + themeResult.theme.name}>{themeResult.theme.name}</span>
                </div>
                <div className="col-2 text-center border alert-sm alert-info">
                    <span title="Quantity of questions in this theme">{themeResult.quantity}</span>
                </div>
                <div
                    className={`col-2 text-center border alert-sm alert-${((themeResult.percent < 50) ? "danger" : "success")}`}>
                    <span title="Result on this theme">{themeResult.percent.toFixed(1) + "%"}</span>
                </div>
            </div>);
    }

    return (
        <div className="row mt-3 mr-1 ml-1">
            <div className="col-0 col-sm-1 col-md-2"/>
            <div className="col-12 col-sm-10 col-md-8">
                <h6 className="text-center text-secondary"><u>Result by themes:</u></h6>
                {themeResults.map((t: ThemeResult) => renderTheme(t))}
            </div>
            <div className="col-0 col-sm-1 col-md-2"/>
        </div>
    );
}

export default ResultByThemes;