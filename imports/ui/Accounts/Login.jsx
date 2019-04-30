import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { PureComponent } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { auth } from '../utils/authentication';
import InputField from '../common/InputField';

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
                    <InputField
                        type="text"
                        className="form-control"
                        id="username-input"
                        aria-describedby="username"
                        placeholder="Ingresa tu nombre de usuario"
                        autoComplete="username"
                        value={this.state.email}
                        onChange={this._handleEmailChange.bind(this)}
                        labelText="Nombre de usuario"
                    />
                </div>
                <div className="form-group">
                    <InputField
                        type="password"
                        className="form-control"
                        id="password-input"
                        placeholder="Contraseña"
                        autoComplete="password"
                        value={this.state.password}
                        onChange={this._handlePasswordChange.bind(this)}
                        labelText="Contraseña"
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
            <div>
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
