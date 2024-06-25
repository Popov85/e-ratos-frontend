import React, {useState} from 'react';
import ResourcePreloader from "../../components/ResourcePreloader";
import ResourceLookupModal from "../../components/ResourceLookupModal";

const FieldResource = props => {

    const initResource = props.input.value;

    const initResourceSelectionMode = {mode: false, resource: null};
    const [selectedResource, setResourceSelectionMode] = useState(initResourceSelectionMode);
    const deactivateResourceSelectionModal = () => setResourceSelectionMode({...selectedResource, mode: false});

    const selectResource = resource => {
        props.input.onChange(resource);
        setResourceSelectionMode({...selectedResource, mode: false});
    }

    if (selectedResource.mode) return (
        <ResourceLookupModal
            show={true}
            deactivateModal={deactivateResourceSelectionModal}
            selectResource={selectResource}/>
    );

    if (!initResource) return (
        <div className="text-center">
            <a href="#" onClick={() => setResourceSelectionMode({...selectedResource, mode: true})}
               className="badge badge-secondary">Add resource</a>
        </div>
    );

    return (
        <div className="text-center">
            <ResourcePreloader
                message="Loading.."
                url={initResource.link}
                width={initResource.width}
                height={initResource.height}/>
            <a href="#" onClick={() => props.input.onChange(null)}
               className="badge badge-secondary">Remove resource</a>
        </div>
    );


};

export default FieldResource;