import React, { Component } from 'react';

import GradientDivisor from 'ds/basic/GradientDivisor';
import Card from 'ds/basic/Card';
import Stepper from 'ds/basic/Stepper';

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

                    <section className="flex p-b-5">
                        <div className="flex-item-1-1 p-r-2">
                            <h2 className="p-b-3">Card component</h2>
                            <Card>
                                <h3>This is a card</h3>
                            </Card>
                        </div>

                        <div className="flex-item-1-1 p-l-2">
                            <h2 className="p-b-3">Gradient card component</h2>
                            <Card type="gradient">
                                <h3>This is a gradient card</h3>
                            </Card>
                        </div>
                    </section>

                    <section className="p-b-5">
                        <h2 className="p-b-3">Gradient divisor component</h2>
                        <GradientDivisor />
                    </section>

                    <section className="p-b-5">
                        <h2 className="p-b-3">Stepper component</h2>
                        <Stepper />
                    </section>
                </div>
            </ManagerPage>
        );
    }
}
