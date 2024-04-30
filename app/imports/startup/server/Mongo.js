import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/Profile';
import { FoundItems } from '../../api/item/FoundItems';
import { LostItems } from '../../api/item/LostItems';
import { ResolvedItemsArchive } from '../../api/item/ResolvedItemsArchive';
import { Images } from '../../api/item/Images';
import { Messages } from '../../api/item/Messages';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

const addProfileData = (data) => {
  console.log(`Adding data for ${data.firstName} ${data.lastName}`);
  console.log(`data is: ${JSON.stringify(data)}`);
  Profiles.collection.insert(data);
};

const addFoundItem = (item) => {
  console.log(` Adding: ${item.itemName} (${item.owner})`);
  FoundItems.collection.insert(item);
};

const addLostItem = (item) => {
  console.log(` Adding: ${item.itemName} (${item.owner})`);
  LostItems.collection.insert(item);
};

const addResolvedItemData = (data) => {
  console.log(`Adding data for ${data.uniqueID}`);
  ResolvedItemsArchive.collection.insert(data);
};

const addImageData = (data) => {
  Images.collection.insert(data);
};

const addMsgData = (data) => {
  const curr = { ...data };
  curr.date = new Date();
  Messages.collection.insert(curr);
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
    console.log('Creating found items.');
    Meteor.settings.defaultItems.forEach(itemfound => addFoundItem(itemfound));
  }
}

if (LostItems.collection.find().count() === 0) {
  if (Meteor.settings.lostItems) {
    console.log('Creating lost Items.');
    Meteor.settings.lostItems.forEach(itemlost => addLostItem(itemlost));
  }
}

if (ResolvedItemsArchive.collection.find().count() === 0) {
  if (Meteor.settings.resolvedItems) {
    console.log('Creating default resolved items');
    Meteor.settings.resolvedItems.forEach(data => addResolvedItemData(data));
  }
}

if (Images.collection.find().count() === 0) {
  if (Meteor.settings.defaultImages) {
    console.log('Creating default images');
    Meteor.settings.defaultImages.forEach(data => addImageData(data));
  }
}

if (Messages.collection.find().count() === 0) {
  if (Meteor.settings.defaultMessages) {
    console.log('Creating default messages');
    Meteor.settings.defaultMessages.forEach(data => addMsgData(data));
  }
}
