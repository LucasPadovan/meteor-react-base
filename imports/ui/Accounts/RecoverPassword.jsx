import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Button from 'ds/basic/Button';
import InputField from 'ds/basic/InputField';

import { auth } from '../utils/authentication';

import './Login.scss';

class RecoverPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            hasError: false,
            redirectToReferrer: false,
        };
    }

    _handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        });
    }

    _handlePasswordChangeSubmit = (event) => {
        event.preventDefault();

        const { email } = this.state;

        // auth.authenticate({
        //     email,
        //     password,
        //     onLoginSucceeded: () => {
        //         this.setState({ redirectToReferrer: true });
        //     },
        // });
    }

    render() {
        const { isAuthenticated } = this.props;
        const { hasError } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        const body = (
            <form className="login__form" onSubmit={this._handleLoginSubmit}>
                <InputField
                    type="text"
                    className="p-b-4"
                    id="email-input"
                    aria-describedby="Email"
                    placeholder="Ingresa tu Email"
                    autoComplete="username"
                    value={this.state.email}
                    onChange={this._handleEmailChange}
                    labelText="Email"
                    autoFocus={true}
                />
                <Button
                    text="Recuperar contraseña"
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

export default withTracker(() => ({
    isAuthenticated: !!Meteor.userId(),
}))(RecoverPassword);
