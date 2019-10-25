import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Staff extends Component {

    componentDidMount() {
        console.log("Staff was mounted");
    }

    componentWillUnmount() {
        console.log("Staff will be unmounted");
    }


    render() {
        return (
            <div>
                <h1>Staff</h1>
            </div>
        );
    }
}

Staff.propTypes = {

};

export default Staff;