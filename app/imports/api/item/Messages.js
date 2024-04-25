import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class MessagesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'MessagesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      initiator: String,
      recipient: String,
      initiatorContactInfo: String,
      content: String,
      date: Date,
      readByRecipient: Boolean,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the LostItemsCollection.
 * @type {MessagesCollection}
 */
export const Messages = new MessagesCollection();
