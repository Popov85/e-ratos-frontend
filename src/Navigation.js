
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Start from './Start';
import Batch from './Batch';


export default class SNavigation extends React.Component {

    render() {
        <BrowserRouter>
            <Route exact path="/start" component={Start}/>
            <Route exact path="/next" component={Batch}/>
            <Route exact path="/finish" component={Finish}/>
        </BrowserRouter>
    }

}