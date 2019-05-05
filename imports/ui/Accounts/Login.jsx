import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { PureComponent } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Button from 'ds/basic/Button';
import InputField from 'ds/basic/InputField';

import { auth } from '../utils/authentication';

import './Login.scss';

class Login extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            hasError: false,
            redirectToReferrer: false,
        };
    }

    _handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    _handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    _handleLoginSubmit(event) {
        event.preventDefault();

        let { email, password } = this.state;

        auth.authenticate({
            email,
            password,
            onLoginSucceeded: () => {
                this.setState({ redirectToReferrer: true });
            }
        });
    }

    render() {
        const { isAuthenticated } = this.props;
        const { hasError } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        let loginFailedComponent = null;

        if (hasError) {
            loginFailedComponent = (
                <div>
                    Nombre de usuario o contraseña equivocada.
                </div>
            );
        }

        let body = (
            <form className="login__form" onSubmit={this._handleLoginSubmit.bind(this)}>
                <InputField
                    type="text"
                    className="p-b-4"
                    id="username-input"
                    aria-describedby="username"
                    placeholder="Ingresa tu nombre de usuario"
                    autoComplete="username"
                    value={this.state.email}
                    onChange={this._handleEmailChange.bind(this)}
                    labelText="Nombre de usuario"
                />
                <InputField
                    type="password"
                    className="p-b-4"
                    id="password-input"
                    placeholder="Contraseña"
                    autoComplete="password"
                    value={this.state.password}
                    onChange={this._handlePasswordChange.bind(this)}
                    labelText="Contraseña"
                />
                {loginFailedComponent}
                <Button
                    text="Login"
                    type="submit"
                />
            </form>
        );

        if (isAuthenticated) {
            return (<Redirect to={from} />);
        }

        return (
            <div className="login-page">
                {body}
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        isAuthenticated: !!Meteor.userId(),
    };
})(Login);
