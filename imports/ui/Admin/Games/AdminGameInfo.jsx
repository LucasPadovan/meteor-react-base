import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import Button from 'ds/basic/Button';
import InputField from 'ds/basic/InputField';

import AdminPage from '../../common/AdminPage';
import GradientDivisor from '../../common/GradientDivisor';
import ImageUploader from '../../common/ImageUploader';
import NotificationTemporary from '../../common/NotificationTemporary';

import { MENU_KEYS } from '../../common/navigation/constants';

import Games from '../../../api/games';

class AdminGameInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doc: {
                name: '',
                description: '',
                image: '',
            },
            _sent: false,
            _cancel: false,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        // load initial state received from meteor
        if (nextProps.game._id) {
            const { game } = nextProps;

            this.setState({
                doc: { ...game },
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { doc: { _id = undefined } = {} } = this.state;

        // ToDo: add validation, update only fields that we want to update
        if (_id) {
            const { doc } = this.state;

            Meteor.call('games.update', {
                _id,
                ...doc
            }, () => {
                this.setState({ _sent: true });
            });
        }
    }

    _handleChangeField = (event) => {
        const field = event.target.name;

        this.setState({
            doc: { ...this.state.doc, [field]: event.target.value },
        });
    }

    _handleImageChange = (image) => {
        this.setState({
            doc: { ...this.state.doc, image },
        });
    }

    _handleCancelEdit = (event) => {
        event.preventDefault();

        // TODO: ask for confirmation

        this.setState({
            _sent: false,
            _cancel: true,
        });
    }

    render() {
        const { doc: { _id }, _sent, _cancel } = this.state;
        let notificationComponent = null;

        if (_sent) {
            notificationComponent = (
                <NotificationTemporary
                    type="success"
                    text="Actualizado correctamente"
                />
            );
        } else if (_cancel) {
            return (<Redirect to="/admin/games" />);
        }

        return (
            <AdminPage
                currentSection={MENU_KEYS.games}
                currentSubSection={MENU_KEYS.info}
                resourceId={_id}
            >
                {notificationComponent}

                <div className="item">
                    <h1>{`Editando juego: ${this.state.doc.name}`}</h1>
                    <GradientDivisor />
                    <form className="form my-3" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <InputField
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Nombre"
                                        value={this.state.doc.name}
                                        onChange={this._handleChangeField}
                                        id="game-info-name"
                                        labelText="Nombre"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <InputField
                                        className="form-control"
                                        type="text"
                                        name="description"
                                        placeholder="Descripción"
                                        value={this.state.doc.description}
                                        onChange={this._handleChangeField}
                                        id="game-info-description"
                                        labelText="Descripción"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <ImageUploader labelText="Imagen" placeholder="URL de la imagen" image={this.state.doc.image} onImageChange={this._handleImageChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <span className="pr-3">
                                    <Button type="button" text="Cancelar" onClick={this._handleCancelEdit} />
                                </span>
                                <Button type="submit" variant="primary" text="Actualizar Torneo" />
                            </div>
                        </div>
                    </form>
                </div>
            </AdminPage>
        );
    }
}

export default withTracker(({ match }) => {
    const { id } = match.params;
    const oid = new Meteor.Collection.ObjectID(id);
    const gameHandler = Meteor.subscribe('game', oid);
    const loadingGame = !gameHandler.ready();

    return {
        game: !loadingGame ? Games.findOne(oid) : {},
    };
})(AdminGameInfo);
