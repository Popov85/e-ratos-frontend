import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Spinner from './Spinner';
import Failure from './Failure';
import Start from './Start';
import Utils from './Utils';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schemeInfo: null,
            isLoaded: false,
            error: null
        }
    }

    componentWillMount() {
        this.reTryInfoAPICall();
    }

    reTryInfoAPICall() {
        this.setState({ isLoaded: false, error: null });
        this.tryInfoAPICall();
    }

    tryInfoAPICall() {
        const infoUrl = Utils.baseUrl() + "/info/schemes/" + this.props.schemeId;
        fetch(infoUrl, {
            method: 'GET',
            credentials: 'same-origin'
        }).then(response => {
            if (!response.ok) throw Error("Failed to load info from server API");
            return response.json();
        }).then((response) => {
            console.log(response);
            this.setState({
                schemeInfo: response,
                isLoaded: true,
                error: null
            })
        }).catch(error => {
            console.error(error);
            this.setState({
                isLoaded: true,
                error
            })
        })
    }

    renderFailure() {
        return (
            <div className="mt-3" >
                <div className = "mb-2"><Logo/></div>
                <Failure message={this.state.error.message} />
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <button className="btn btn-info btn-sm pl-5 pr-5" onClick={() => this.reTryInfoAPICall()} title="Re-try to perform info API call">Re-try>></button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { isLoaded, error, schemeInfo } = this.state;
        if (!isLoaded)
            return (
                <div>
                    <div className = "mb-2"><Logo/></div>
                    <Spinner message="Loading info from server" />
                </div>);
        if (error) return this.renderFailure();
        return <Start schemeInfo={schemeInfo} />
    }
}

Info.propTypes = {
    schemeId: PropTypes.number.isRequired
};

export default Info;