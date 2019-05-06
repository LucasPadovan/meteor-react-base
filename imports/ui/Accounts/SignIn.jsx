import React, { useState } from 'react';
import InputField from 'ds/basic/InputField';

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

function SignIn() {
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
                <InputField
                    type="text"
                    className="form-control"
                    id="username-input"
                    aria-describedby="username"
                    placeholder="Username"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChange}
                    labelText="Nombre"
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    id="password-input"
                    placeholder="Contraseña"
                    autoComplete="password"
                    value={password}
                    onChange={onPasswordChange}
                    labelText="Contraseña"
                />
            </div>

            <button className="btn btn-primary">
                Crear usuario
            </button>
        </form>
    );
}

export default SignIn;
