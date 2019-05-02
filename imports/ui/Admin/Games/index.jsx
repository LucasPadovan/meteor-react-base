import React, { Component } from 'react';
import GradientDivisor from 'ds/basic/GradientDivisor';
import { MENU_KEYS } from 'ds/basic/navigation/constants';

import AdminPage from '../../common/AdminPage';


import AddGame from './AddGame';
import GameList from './GameList';

export default class AdminGames extends Component {
    render() {
        return (
            <AdminPage
                currentSection={MENU_KEYS.games}
            >
                <div className="admin-index-view">
                    <h1>Administrador de juegos</h1>
                    <GradientDivisor marginVertical={3} />
                    <AddGame />
                    <GameList />
                </div>
            </AdminPage>
        );
    }
}
