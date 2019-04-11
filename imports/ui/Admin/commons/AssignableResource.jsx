import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Button from '/imports/ui/common/Button';
import GradientDivisor from '/imports/ui/common/GradientDivisor';
import NotificationTemporary from '/imports/ui/common/NotificationTemporary';

import AssignableResourceForm from './AssignableResourceForm';
import AssignableResourceList from './AssignableResourceList';

export default class AssignableResource extends Component {
    static propTypes = {
        /* eslint-disable-next-line react/forbid-prop-types */
        items: PropTypes.array,
        fields: PropTypes.arrayOf(PropTypes.shape({
            fieldName: PropTypes.string,
            dbName: PropTypes.string,
            label: PropTypes.string,
            placeholder: PropTypes.string,
        })),
        redirectUrl: PropTypes.string,
        sectionTitle: PropTypes.string,
        listTitle: PropTypes.string,
        updateButtonText: PropTypes.string,
        onSubmitUpdate: PropTypes.func,
    }

    static defaultProps = {
        items: [],
        fields: [],
        redirectUrl: '',
        sectionTitle: '',
        listTitle: '',
        updateButtonText: '',
        onSubmitUpdate: () => {},
    }

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            _sent: false,
            _cancel: false,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        const { items } = nextProps;

        if (items.length) {
            this.setState({
                items,
            });
        }
    }

    _handleSubmit = (event) => {
        event.preventDefault();

        const { onSubmitUpdate } = this.props;
        const { items } = this.state;

        if (onSubmitUpdate) {
            onSubmitUpdate({ items });

            this.setState({ _sent: true });
        }
    }

    _handleAddItem = (item) => {
        const { items } = this.state;
        const updatedItems = items.slice(0);

        updatedItems.push({
            _id: new Mongo.ObjectID(),
            ...item,
        });

        this.setState({
            items: updatedItems,
        });
    }

    _handleRemoveItem = (event, { itemToRemove, index }) => {
        const { items } = this.state;
        const updatedItems = items.slice(0);

        if (index >= 0) {
            const [removedItem] = updatedItems.splice(index, 1);

            if (removedItem === itemToRemove) {
                this.setState({
                    items: updatedItems,
                });
            }
        }
    }

    _handleCancelEdit = (event) => {
        event.preventDefault();

        // TODO: ask for confirmation

        this.setState({
            _sent: false,
            _cancel: true,
        });
    }

    render() {
        const {
            items: originalItems,
            fields,
            redirectUrl,
            sectionTitle,
            updateButtonText,
            listTitle,
            listAddButtonTitle,
        } = this.props;
        const {
            items,
            _sent,
            _cancel,
        } = this.state;
        let notificationComponent = null;

        if (_sent) {
            notificationComponent = (
                <NotificationTemporary
                    type="success"
                    text="Actualizado correctamente"
                />
            );
        } else if (_cancel) {
            return (<Redirect to={redirectUrl} />);
        }

        return (
            <div className="item">
                <h1>{sectionTitle}</h1>

                {notificationComponent}

                <GradientDivisor />

                <form className="form my-3" onSubmit={this._handleSubmit}>
                    <div className="row">
                        <div className="col col-12">
                            <AssignableResourceForm
                                fields={fields}
                                listTitle={listTitle}
                                listAddButtonTitle={listAddButtonTitle}
                                onAddItem={this._handleAddItem}
                            />

                            <AssignableResourceList
                                items={items}
                                headers={fields.map(({ label }) => label)}
                                originalItems={originalItems}
                                onRemoveItem={this._handleRemoveItem}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <span className="pr-3">
                            <Button
                                onClick={this._handleCancelEdit}
                                text="Cancelar"
                                type="button"
                            />
                        </span>
                        <Button
                            text={updateButtonText}
                            type="submit"
                            variant="primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
