import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';

Meteor.methods({
  sendEmail(to, from, subject, html) {
    // Make sure that all arguments are strings.
    check([to, from, subject, html], [String]);
    console.log(`to: ${to}`);
    console.log(`from: ${from}`);
    console.log(`sub: ${subject}`);
    console.log(`text: ${html}`);
    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    Email.sendAsync({ to, from, subject, html }).catch((err) => console.log(err));
  },
});

// set the mail environment variable
process.env.MAIL_URL = Meteor.settings.emailCredentials;
console.log(`set process.env.MAIL_URL to ${process.env.MAIL_URL}`);
