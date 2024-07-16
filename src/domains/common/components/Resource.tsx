import React from 'react';

type Props = {
    resource?: string;
    title: string;
};

const Resource: React.FC<Props> = ({ resource, title }) => {

    if (!resource) return null;

    return (
        <div>
            <div className="embed-responsive">
                <iframe
                    className="embed-responsive-item"
                    src={resource}
                    title={title}
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Resource;
