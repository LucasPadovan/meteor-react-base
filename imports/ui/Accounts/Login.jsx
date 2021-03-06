import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { PureComponent } from 'react';
import {
    Link,
    Redirect,
    withRouter,
} from 'react-router-dom';
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

    _handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        });
    }

    _handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value,
        });
    }

    _handleLoginSubmit = (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        auth.authenticate({
            email,
            password,
            onLoginSucceeded: () => {
                this.setState({ redirectToReferrer: true });
            },
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

        const body = (
            <form className="login__form" onSubmit={this._handleLoginSubmit}>
                <InputField
                    type="text"
                    className="p-b-4"
                    id="email-input"
                    aria-describedby="Email"
                    placeholder="Ingresa tu email"
                    autoComplete="Email"
                    value={this.state.email}
                    onChange={this._handleEmailChange}
                    labelText="Email"
                    autoFocus={true}
                />
                <InputField
                    type="password"
                    className="p-b-4"
                    id="password-input"
                    placeholder="Contraseña"
                    autoComplete="password"
                    value={this.state.password}
                    onChange={this._handlePasswordChange}
                    labelText="Contraseña"
                />
                {loginFailedComponent}
                <Button
                    text="Login"
                    type="submit"
                />

                <Link className="p-t-6 p-h-3" to="/recover-password">Olvidé mi contraseña</Link>
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

export default withTracker(() => ({
    isAuthenticated: !!Meteor.userId(),
}))(Login);
