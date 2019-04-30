import React from 'react';
import PropTypes from 'prop-types';

import './InputField.scss';


const InputField = ({ label, id, ...inputProps }) => (
    <div className="input-container">
        <label htmlFor={id}>{label}</label>
        <input id={id} {...inputProps} />
    </div>
);

InputField.propTypes = {
    label: PropTypes.isRequired,
    id: PropTypes.isRequired,
};

export default InputField;
