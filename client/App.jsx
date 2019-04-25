import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Navbar from '../imports/ui/common/navigation/Navbar';
import Footer from '../imports/ui/common/Footer';
import Container from './Container';

import './App.scss';


const App = () => (
    <Router>
        <div className="page-container">
            <Navbar />

            <main className="body-container route-section">
                <Container />
            </main>

            <Footer />
        </div>
    </Router>
);

export default App;
