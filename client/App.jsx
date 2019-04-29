import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Navbar from '../imports/ui/common/navigation/Navbar';
import Container from './Container';

import './App.scss';


const App = () => (
    <Router>
        <div className="page-container">
            <Navbar />

            <div className="body-container">
                <Container />
            </div>
        </div>
    </Router>
);

export default App;
