import React, { Component } from 'react';
import GradientDivisor from 'ds/basic/GradientDivisor';
import Card from 'ds/basic/Card';

import { MENU_KEYS } from 'ds/basic/navigation/constants';

import ManagerPage from '../../imports/ui/common/ManagerPage';


export default class DsIndex extends Component {
    render() {
        return (
            <ManagerPage
                currentSection={MENU_KEYS.ds}
            >
                <div className="">
                    <h1>Visor de componentes</h1>
                    <GradientDivisor marginVertical={3} />
                    <Card>
                        <h2>This is a card</h2>
                    </Card>
                </div>
            </ManagerPage>
        );
    }
}
