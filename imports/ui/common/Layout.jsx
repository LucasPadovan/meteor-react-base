import React, { PureComponent } from 'react';

import Navbar from '../common/navigation/Navbar';
import Footer from '../common/Footer';

class Layout extends PureComponent {
    render() {
        return (
            <div>
                <Navbar />

                <div className="page-container container py-4">
                    {this.props.children}
                </div>

                <Footer />
            </div>
        );
    }
}

export default Layout;
