import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ProfileCollection {
  constructor() {
    this.name = 'ProfileCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      email: String, // unique identifier to match with the default profile.
      image: String,
      points: Number, // leaderboard points
      totalItemsFound: Number, // total number of items that the person found.
      totalItemsLost: Number, // total number of items that the person lost.
      recentItemsFound: { type: Array },
      'recentItemsFound.$': { type: String }, // an array of unique String identifiers.
      class: {
        type: String,
        allowedValues: ['freshman', 'sophomore', 'junior', 'senior', 'professor/faculty', 'staff', 'other'],
        defaultValue: 'other',
      },
    });

    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StuffsCollection}
 */
export const Profiles = new ProfileCollection();
