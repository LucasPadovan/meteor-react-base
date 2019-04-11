import { Meteor } from 'meteor/meteor';

export const auth = {
    authenticate({
        email,
        password,
        onLoginSucceeded,
    }) {
        Meteor.loginWithPassword(
            email,
            password,
            (error) => {
                if (error) {
                    /* eslint-disable no-console */
                    console.log(error);

                    return error;
                }

                if (onLoginSucceeded) {
                    onLoginSucceeded();
                }
            },
        );
    },

    signout(cb) {
        Meteor.logout(cb);
    },
};
