import React from 'react';
import PropTypes from 'prop-types';
import Info from './Info';

const Launcher = props => {
    const { schemeId, baseUrl } = props;
    return <Info
        schemeId={schemeId}
        baseUrl={baseUrl}/>
};

Launcher.propTypes = {
    schemeId: PropTypes.number.isRequired,
    baseUrl: PropTypes.string.isRequired
};

export default Launcher;