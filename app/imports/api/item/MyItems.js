import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The LostItemsCollection. It encapsulates state and variable values for stuff.
 */
class MyItemsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'MyItemsCollection';
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
      lastSeen: String,
      foundAt: String,
      contactEmail: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the LostItemsCollection.
 * @type {MyItemsCollection}
 */
export const MyItems = new MyItemsCollection();
