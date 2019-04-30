import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';

import Button from '../../common/Button';
import InputField from '../../common/InputField';

export default class AddGame extends PureComponent {
    handleSubmit = (event) => {
        event.preventDefault();

        const gameName = event.target.gameName.value;
        const gameLogo = event.target.gameLogo.value;

        if (gameName && gameLogo) {
            this._clearForm(event.target);

            Meteor.call('games.insert', { name: gameName, description: gameLogo });
        }
    }

    _clearForm = (target) => {
        target.gameName.value = '';
        target.gameLogo.value = '';
    }

    render() {
        return (
            <section className="admin-index-form__section">
                <form className="admin-index-form__form" onSubmit={this.handleSubmit}>
                    <div className="admin-index-form__fields">
                        <div className="admin-index-form__field">
                            <InputField
                                className="form-control"
                                type="text"
                                name="gameName"
                                placeholder="Nombre del juego"
                                label="Nombre del juego"
                                id="gameName"
                            />
                        </div>
                        <div className="admin-index-form__field">
                            <InputField
                                className="form-control"
                                type="text"
                                name="gameLogo"
                                placeholder="Descripción del juego"
                                label="Descripción del juego"
                                id="gameLogo"
                            />
                        </div>
                    </div>
                    <div className="admin-index-form__actions">
                        <Button type="submit" variant="primary" text="Agregar Juego" />
                    </div>
                </form>
            </section>
        );
    }
}
