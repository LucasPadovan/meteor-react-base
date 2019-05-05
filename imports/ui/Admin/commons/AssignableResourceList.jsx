import React, { PureComponent } from 'react';
import _ from 'lodash';

import Button from 'ds/basic/Button';
import Table from 'ds/basic/Table';

import '/imports/ui/Admin/commons/List.scss';


const EXTRA_COLUMNS = [
    {
        title: 'Estado',
    },
    {
        title: '',
    },
];

const _buildHeader = (headers) => {
    const _headers = headers.map((header) => ({ title: header }));

    _headers.push(EXTRA_COLUMNS[0]);
    _headers.push(EXTRA_COLUMNS[1]);

    return _headers;
};

const _buildInfo = (items, onRemoveItem) => (
    items.map((item, index) => {
        const _handleRemoveBoot = (event) => {
            onRemoveItem(event, { itemToRemove: item, index });
        };
        let filteredValues = _.chain(item)
            .omit('_id')
            .values()
            .value();

        filteredValues = filteredValues.map((value) => ({ item: value }));
        filteredValues.push({
            item: (
                <Button type="button" size="small" text="Quitar" onClick={_handleRemoveBoot} />
            ),
        });

        return filteredValues;
    })
);

export default class AssignableResourceList extends PureComponent {
    render() {
        const { items = [], onRemoveItem, headers } = this.props;

        let component = (
            <div className="item">
                <p className="item__message">Agrega algun recurso para empezar</p>
            </div>
        );

        if (items && items.length > 0) {
            component = (
                <Table
                    headerRow={_buildHeader(headers)}
                    bodyRows={_buildInfo(items, onRemoveItem)}
                />
            );
        }

        return (
            <div className="pb-3">
                {component}
            </div>
        );
    }
}
