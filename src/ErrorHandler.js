import React, { Component } from 'react';
import LogoError from "./LogoError";
import Header from "./Header";
import Failure from './Failure';

class ErrorHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: null,
            error: null,
            info: null,
        }
    }

    componentDidCatch(error, info) {
        this.setState({ isError: true, error, info });
    }

    render() {
        if (this.state.isError) {
            return (
                <div className="mt-3">
                    <LogoError />
                    <Header title="COMPONENT FAILURE" color="alert-warning" />
                    <Failure message={this.state.error.toString()} details = {this.state.info.componentStack}/>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorHandler;