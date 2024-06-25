import React, {useState} from 'react';
import PropTypes from 'prop-types';

const ResourcePreloader = props => {

    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const {url, message, width, height} = props;

    return (
        <div>
            {
                !loaded &&
                <div className="text-center text-secondary">{message}</div>
            }
            {
                error &&
                <div className="text-center text-secondary p-3">{error.message}</div>
            }
            <iframe src={url} width={width ? width : '360'} height={height ? height : '240'}
                    onLoad={() => setLoaded(true)} onError={()=>setError(new Error("Failure"))}/>
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