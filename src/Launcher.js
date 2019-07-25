import React from 'react';
import PropTypes from 'prop-types';
import Info from './Info';

const Launcher = props => {
    const { schemeId} = props;
    return <Info schemeId={schemeId}/>
};

Launcher.propTypes = {
    schemeId: PropTypes.number.isRequired
};

export default Launcher;