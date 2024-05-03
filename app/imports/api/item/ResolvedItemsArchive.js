import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The FoundItemsCollection. It encapsulates state and variable values for stuff.
 */
class ResolvedItemsArchiveCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FoundItemsArchiveCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      image: String,
      dateReported: Date,
      itemName: String,
      resolvedBy: String, // a unique email identified by the user.
      dateResolved: Date,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the FoundItemsCollection.
 * @type {FoundItemsCollection}
 */
export const ResolvedItemsArchive = new ResolvedItemsArchiveCollection();
