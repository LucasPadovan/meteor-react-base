import React, { PureComponent } from 'react';
import _ from 'lodash';

import Button from '/imports/ui/common/Button';

import { RESOURCES_STATUS } from '/imports/ui/Admin/constants';

import '/imports/ui/Admin/commons/List.scss';

export default class AssignableResourceForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            itemStatus: RESOURCES_STATUS.free,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        const { fields = [] } = nextProps;
        const itemFields = {};

        fields.map(({ fieldName }) => {
            itemFields[fieldName] = '';

            return true;
        });

        if (fields.length) {
            this.setState({
                ...itemFields,
                itemStatus: RESOURCES_STATUS.free,
            });
        }
    }

    _handleChangeField = (event) => {
        const field = event.target.name;

        this.setState({
            [field]: event.target.value,
        });
    }

    _handleKeyPress = (event) => {
        if (event.which === 13) {
            event.preventDefault();

            this._handleAddItem(event);
        }
    }

    _handleAddItem = (event) => {
        event.preventDefault();

        const { itemStatus } = this.state;
        const { fields, onAddItem } = this.props;
        const itemFields = {};
        const dbFields = {};

        fields.map(({ dbName, fieldName }) => {
            itemFields[fieldName] = '';
            dbFields[dbName] = this.state[fieldName];

            return true;
        });

        if (onAddItem) {
            this.setState(
                {
                    ...itemFields,
                    itemStatus: RESOURCES_STATUS.free,
                },
                onAddItem({
                    ...dbFields,
                    status: itemStatus,
                }),
            );
        }
    }

    render() {
        const {
            fields,
            listTitle,
            listAddButtonTitle,
        } = this.props;

        let fieldsComponents = null;

        if (fields.length && this.state) {
            fieldsComponents = fields.map(({ fieldName, placeholder }) => (
                <div key={fieldName} className="admin-index-form__field">
                    <input
                        className="form-control"
                        name={fieldName}
                        onKeyPress={this._handleKeyPress}
                        onChange={this._handleChangeField}
                        type="text"
                        placeholder={placeholder}
                        value={this.state[fieldName]}
                    />
                </div>
            ));
        }

        return (
            <section className="admin-index-form__section">
                <h3>{listTitle}</h3>

                <div className="admin-index-form__fields pb-3">
                    {fieldsComponents}
                    <div className="admin-index-form__field">
                        <select
                            className="form-control"
                            name="itemStatus"
                            onKeyPress={this._handleKeyPress}
                            onChange={this._handleChangeField}
                            type="text"
                            placeholder="Estado"
                            value={this.state.itemStatus}
                        >
                            {
                                _.values(RESOURCES_STATUS).map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="admin-index-form__actions">
                        <Button
                            type="button"
                            variant="primary"
                            text={listAddButtonTitle}
                            onClick={this._handleAddItem}
                        />
                    </div>
                </div>
            </section>
        );
    }
}
