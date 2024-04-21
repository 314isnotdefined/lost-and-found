import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/Profile';
import { FoundItems } from '../../api/item/FoundItems';
import { ResolvedItemsArchive } from '../../api/item/ResolvedItemsArchive';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

const addProfileData = (data) => {
  console.log(`Adding data for ${data.firstName} ${data.lastName}`);
  Profiles.collection.insert(data);
};

const addFoundItem = (item) => {
  console.log(` Adding: ${item.itemName} (${item.owner})`);
  FoundItems.collection.insert(item);
};

const addResolvedItemData = (data) => {
  console.log(`Adding data for ${data.uniqueID}`);
  ResolvedItemsArchive.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.profileData) {
    console.log('Creating default data.');
    Meteor.settings.profileData.forEach(data => addProfileData(data));
  }
}

if (FoundItems.collection.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating default Items.');
    Meteor.settings.defaultItems.forEach(itemfound => addFoundItem(itemfound));
  }
}

if (ResolvedItemsArchive.collection.find().count() === 0) {
  if (Meteor.settings.resolvedItems) {
    console.log('Creating default resolved items');
    Meteor.settings.resolvedItems.forEach(data => addResolvedItemData(data));
  }
}
