import React from 'react';

import './AssignableResourceSelect.scss';

const AssignableResourceSelect = ({
    availableResources,
    defaultValueText,
    inputName,
    inputPlaceholder,
    inputValue,
    getOptionsText,
    onChange,
}) => {
    const options = availableResources.map((assignableResource) => {
        const { _id: { _str: resourceId } } = assignableResource;

        return (
            <option key={resourceId} value={resourceId} >
                {getOptionsText(assignableResource)}
            </option>
        );
    });

    return (
        <select
            className="form-control assignable-resource__select"
            name={inputName}
            type="text"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={onChange}
        >
            <option value="null">{defaultValueText}</option>

            {options}

        </select>
    );
};

export default AssignableResourceSelect;
