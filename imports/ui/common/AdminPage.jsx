import React, { PureComponent } from 'react';
import _ from 'lodash';

import AccordionMenu from '/imports/ui/common/navigation/AccordionMenu';

import { getMenuItems } from '/imports/ui/common/navigation/utils';

import './AdminPage.scss';

export default class AdminPage extends PureComponent {
    state = {
        isMenuOpen: false,
    }

    render() {
        const {
            children,
            currentSection,
            currentSubSection,
            resourceId,
            excludedSections = [],
        } = this.props;
        const { isMenuOpen } = this.state;
        const menuItems = getMenuItems(resourceId);

        if (excludedSections.length) {
            excludedSections.forEach(({ key: itemKey, subitems }) => {
                const section = menuItems.find(({ key }) => (key === itemKey));

                if (section.subMenuItems.length) {
                    subitems.forEach((subItemKey) => {
                        section.subMenuItems = _.reject(section.subMenuItems, ({ key }) => (key === subItemKey));
                    });
                }
            });
        }

        return (
            <div className="admin-page">
                <AccordionMenu
                    items={menuItems}
                    isOpen={isMenuOpen}
                    currentSection={currentSection}
                    currentSubSection={currentSubSection}
                />

                <div className="admin-page__content">
                    {children}
                </div>
            </div>
        );
    }
}
