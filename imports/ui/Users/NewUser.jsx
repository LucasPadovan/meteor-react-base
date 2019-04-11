import React, { useState } from 'react';

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function _handleChange(event) {
        setValue(event.target.value);
    }

    return {
        value,
        setValue,
        onChange: _handleChange,
    };
}

function NewUser() {
    const {
        value: username,
        setValue: setUsername,
        onChange: onUsernameChange,
    } = useFormInput('');
    const {
        value: password,
        setValue: setPassword,
        onChange: onPasswordChange,
    } = useFormInput('');

    function _handleSubmit(event) {
        event.preventDefault();

        Accounts.createUser({
            username,
            password,
        }, () => {
            setUsername('');
            setPassword('');
        });
    }

    return (
        <form onSubmit={_handleSubmit}>
            <div className="form-group">
                <label htmlFor="username-input">Username</label>
                <input
                    type="text"
                    className="form-control"
                    id="username-input"
                    aria-describedby="username"
                    placeholder="Username"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChange}
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
                    value={password}
                    onChange={onPasswordChange}
                />
            </div>

            <button className="btn btn-primary">
                Create user
            </button>
        </form>
    );
}

export default NewUser;
