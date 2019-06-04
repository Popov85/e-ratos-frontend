import React from 'react';

export default class Resource extends React.Component {

    // TODO: predict more resource types
    renderResource() {
        if (this.props.resource == null) { return null };
        return <img alt="IMG" src={this.props.resource} title = {this.props.title}></img>
    }

    render() {
        return (
            <div>
                {this.renderResource()}
            </div>
        );
    }
}