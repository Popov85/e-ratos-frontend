import React from 'react';

export default class Resource extends React.Component {

  

    // TODO: predict more resource types
    renderResource() {
        if (this.props.resource == null) { return null };
        //console.log("Link = "+this.props.resource);
        return (
            <div className="embed-responsive">
                <iframe className="embed-responsive-item" src={this.props.resource} title = {this.props.title} allowFullScreen></iframe>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderResource()}
            </div>
        );
    }
}