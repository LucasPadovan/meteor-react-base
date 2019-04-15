import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { PureComponent } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { auth } from '../utils/authentication';

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
            <form onSubmit={this._handleLoginSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="username-input">Nombre de usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username-input"
                        aria-describedby="username"
                        placeholder="Ingresa tu nombre de usuario"
                        autoComplete="username"
                        value={this.state.email}
                        onChange={this._handleEmailChange.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password-input">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-input"
                        placeholder="Contraseña"
                        autoComplete="password"
                        value={this.state.password}
                        onChange={this._handlePasswordChange.bind(this)}
                    />
                </div>
                {loginFailedComponent}
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        );

        if (isAuthenticated) {
            return (<Redirect to={from} />);
        }

        return (
            <div className="row">
                <div className="offset-md-4 col-md-4">
                    {body}
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        isAuthenticated: !!Meteor.userId(),
    };
})(Login);