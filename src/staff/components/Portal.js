import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Navigation from "./Navigation";
import Staff from "./Staff";
import Courses from "./Courses";
import Schemes from "./Schemes";
import Themes from "./Themes";
import Questions from "./Questions";
import Resources from "./Resources";
import Groups from "./Groups";
import Complaints from "./Complaints";
import Lms from "./Lms";
import PropTypes from 'prop-types';

class Portal extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <main>
                                <Route path="/" exact component={Home} />
                                <Route path="/home" component={Home} />
                                <Route path="/staff" component={Staff} />
                                <Route path="/courses" component={Courses} />
                                <Route path="/schemes" component={Schemes} />
                                <Route path="/themes" component={Themes} />
                                <Route path="/questions" component={Questions} />
                                <Route path="/resources" component={Resources} />
                                <Route path="/groups" component={Groups} />
                                <Route path="/complaints" component={Complaints} />
                                <Route path="/lms" component={Lms} />
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Topics() {
    return (
        <div>
            <h2>Topics</h2>
        </div>
    );
}

Portal.propTypes = {

};

export default Portal;