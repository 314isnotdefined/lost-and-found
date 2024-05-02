import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';

Meteor.methods({
  sendEmail(to, from, subject, text) {
    // Make sure that all arguments are strings.
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    Email.sendAsync({ to, from, subject, text }).catch((err) => console.log(err));
  },
});

// set the mail environment variable
process.env.MAIL_URL = Meteor.settings.emailCredentials;
