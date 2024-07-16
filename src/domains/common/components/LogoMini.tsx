import React from 'react';
import logoMini from '../../../assets/logo-mini.png';


const Logo: React.FC = () => {
    return (
        <div className="row mt-5">
            <div className="col-1 col-sm-2 col-md-3 col-lg-4" />
            <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                <img className="img-fluid" src={logoMini} alt="logo-mini" />
            </div>
            <div className="col-1 col-sm-2 col-md-3 col-lg-4" />
        </div>);
}

export default Logo;