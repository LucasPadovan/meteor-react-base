import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { PureComponent } from 'react';

const UserItem = ({ _id, username }) => (
    <li key={ _id }>{ username }</li>
)

class UsersList extends PureComponent{
    _getUsersList = () => {
        const { users } = this.props;

        return users.map(
            ({ _id, username }) => (
                <UserItem key={ _id } username={username} />
            )
        );
    }

    render() {
        return (
            <ul>
                { this._getUsersList() }
            </ul>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('users');

    return {
        users: Meteor.users.find().fetch(),
    };
})(UsersList);
