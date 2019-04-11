import React, { PureComponent } from 'react';

import Menu from '../common/Menu';
import Footer from '../common/Footer';

class Layout extends PureComponent {
    render() {
        return (
            <div>
                <Menu />

                <div className="page-container container py-4">
                    {this.props.children}
                </div>

                <Footer />
            </div>
        );
    }
}

export default Layout;
