import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    if (!Meteor.users.find().count()) {
        Accounts.createUser({username: 'admin', password: 'admin'});
    }
});
