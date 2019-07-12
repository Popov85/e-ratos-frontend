import React from "react";
import ReactDOM from "react-dom";
import Login from './src/Login';
import LogoMini from './src/LogoMini';


import 'bootstrap/dist/css/bootstrap.min.css';


const baseUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
const realBaseUrl = (!baseUrl || baseUrl ==="http://localhost:1234") ? "http://localhost:8090" : baseUrl;

ReactDOM.render(<Login baseUrl={realBaseUrl}/>, document.getElementById('app'));
//ReactDOM.render(<LogoMini baseUrl={realBaseUrl}/>, document.getElementById('app'));

