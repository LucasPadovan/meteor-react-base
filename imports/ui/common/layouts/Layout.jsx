import React, { PureComponent } from 'react';

import Navbar from '../navigation/Navbar';
import Footer from './Footer';

import './Layout.scss';


class Layout extends PureComponent {
    render() {
        return (
            <div className="page-container">
                <Navbar />

                <main className="page-body">
                    {this.props.children}
                </main>

                <Footer />
            </div>
        );
    }
}

export default Layout;
