import React, { Component, ReactNode, ErrorInfo } from 'react';
import LogoError from "./LogoError";
import Header from "./Header";
import Failure from './Failure';

interface ErrorHandlerProps {
    children: ReactNode;
}

interface ErrorHandlerState {
    isError: boolean;
    error: Error | null;
    info: ErrorInfo | null;
}

/**
 * Global error handler!
 */
class ErrorHandler extends Component<ErrorHandlerProps, ErrorHandlerState> {

    constructor(props: ErrorHandlerProps) {
        super(props);
        this.state = {
            isError: false,
            error: null,
            info: null,
        };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        this.setState({ isError: true, error, info });
    }

    render() {
        if (this.state.isError && this.state.error && this.state.info) {
            return (
                <div className="mt-3">
                    <LogoError />
                    <Header title="COMPONENT FAILURE" color="alert-warning" />
                    <Failure message={this.state.error.toString()} details={this.state.info.componentStack} />
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorHandler;
