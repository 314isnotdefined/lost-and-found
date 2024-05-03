import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The FoundItemsCollection. It encapsulates state and variable values for stuff.
 */
class FoundItemsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FoundItemsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      itemName: String,
      image: Array,
      'image.$': String, // an array of unique image identifiers. Storing a list of raw metadata of an image in a single MongoDB document is excessive.
      owner: String,
      category: {
        type: String,
        allowedValues: ['Electronics', 'Identification and Access Cards', 'Clothing and Accessories', 'Food and Drink Containers', 'Textbooks and School Supplies', 'Miscellaneous'],
        defaultValue: 'Miscellaneous',
      },
      description: String,
      locationFound: String,
      contactEmail: String,
      dateReported: Date,
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
export const FoundItems = new FoundItemsCollection();
