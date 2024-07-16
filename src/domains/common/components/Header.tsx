import React from 'react';

type Props = {
    title: string;
    widely?: boolean;
    color?: string;
}

const Header: React.FC<Props> = ({ title, widely = false, color = '' }) => {
    if (widely)//For header to be container-wide
        return (
            <div className="row text-center mb-1">
                <div className="col-12">
                    <div className={`alert-sm ${color} pt-3 pb-3`}>{title}</div>
                </div>
            </div>
        );
    return (//For header to be narrow-centered
        <div className="row mb-1">
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                <div className="row text-center">
                    <div className="col-12">
                        <div className={`alert-sm ${color} pt-3 pb-3`}>{title}</div>
                    </div>
                </div>
            </div>
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
        </div>
    );
};

export default Header;