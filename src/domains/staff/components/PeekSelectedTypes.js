import React from 'react';
import PropTypes from 'prop-types';

const PeekSelectedTypes = props => {

    const {settings} = props;

    return settings
        .map(s => <div key={s.type} className="text-left">{s.type}:{s.level1 + s.level2 + s.level3}</div>);
};

PeekSelectedTypes.propTypes = {
    settings: PropTypes.array.isRequired
};

export default PeekSelectedTypes;