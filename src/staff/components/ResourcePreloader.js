import React, {useState} from 'react';
import PropTypes from 'prop-types';

const ResourcePreloader = props => {

    const [loaded, setLoaded] = useState(false);

    const {url, message, width, height} = props;

    return (
        <div>
            {
                !loaded &&
                <div className="text-center text-secondary">{message}</div>
            }
            <object data={url} width={width ? width : '100'} height={height ? height : '50'}
                    onLoad={() => setLoaded(true)}/>
        </div>
    );
};

ResourcePreloader.propTypes = {
    url: PropTypes.string.isRequired,
    message: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};

export default ResourcePreloader;