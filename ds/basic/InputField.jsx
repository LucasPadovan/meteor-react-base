import React from 'react';
import PropTypes from 'prop-types';

import './InputField.scss';


const InputField = ({ labelText, id, ...inputProps }) => (
    <div className="input-container">
        <label htmlFor={id}>{labelText}</label>
        <input id={id} {...inputProps} />
    </div>
);

InputField.propTypes = {
    labelText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default InputField;
