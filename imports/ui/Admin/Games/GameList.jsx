import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import Button from '../../common/Button';
import Table from '../../common/Table';

import Games from '../../../api/games';


const _buildGamesHeader = () => (
    [
        {
            title: 'Nombre',
        },
        {
            title: 'Descripcion',
        },
        {
            title: '',
        },
        {
            title: '',
        },
    ]
);

const _buildGamesInfo = (games) => (
    games.map(({
        _id,
        name,
        description = '',
    }) => (
        [
            {
                item: name,
            },
            {
                item: description.slice(0, 30),
            },
            {
                item: (
                    <Button
                        text="Editar"
                        type="link"
                        to={`/admin/games/${_id}/info`}
                    />
                ),
            },
            {
                item: (
                    <Link
                        key={`${_id}-${name}`}
                        className=""
                        to="?"
                        onClick={() => Meteor.call('games.remove', _id)}
                    >
                        Eliminar
                    </Link>
                ),
            },
        ]
    ))
);

class GameList extends Component {
    renderGames = () => {
        const { games } = this.props;
        let component = (
            <div className="item">
                <p className="item__message">Agrega tu primer juego para empezar</p>
            </div>
        );

        if (games && games.length > 0) {
            component = (
                <Table
                    headerRow={_buildGamesHeader()}
                    bodyRows={_buildGamesInfo(games)}
                />
            );
        }

        return component;
    }

    render() {
        return this.renderGames();
    }
}

GameList.propTypes = {};

export default withTracker(() => {
    const gamesHandler = Meteor.subscribe('games');
    const loadingGames = !gamesHandler.ready();

    return {
        games: !loadingGames ? Games.find({}).fetch().reverse() : [],
    };
})(GameList);
