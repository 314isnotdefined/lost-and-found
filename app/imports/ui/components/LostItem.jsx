import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Carousel, Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, LongTextField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { Images } from '../../api/item/Images';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const messageSchema = new SimpleSchema({
  contactInfo: String,
  message: String,
});

const bridge = new SimpleSchema2Bridge(messageSchema);

const LostItem = ({ item }) => {

  const { ready, itemImages } = useTracker(() => {
    const subscription = Meteor.subscribe(Images.userPublicationName);
    const rdy = subscription.ready();
    let imageArr = [];
    if (item.image[0].includes('http')) {
      // accounting for default data
      console.log('tis default');
      imageArr.push(item.image);
    } else {
      // if the card is not comprised of default data.
      console.log('tis not default');
      const logicalImages = [];
      for (let i = 0; i < item.image.length; i++) {
        logicalImages.push({ _id: item.image[i] });
      }

      const fetchedImageData = Images.collection.find({ $or: logicalImages }).fetch();
      imageArr = fetchedImageData.map(e => e.data);
    }

    return {
      itemImages: [...imageArr],
      ready: rdy,
    };
  });

  const [messageFormDisplay, setMessageFormDisplay] = useState(false);

  function toggleContactForm() {
    setMessageFormDisplay(true);
  }

  function handleClose() {
    setMessageFormDisplay(false);
  }

  const submit = ({ data }) => {
    console.log(JSON.stringify(data));
    handleClose();
  };

  return (
    <Card className="h-100">
      <Card.Header>
        {/* eslint-disable-next-line no-nested-ternary */}
        {(ready) ? (
          (itemImages.length === 1) ? (
            <img src={itemImages[0]} alt="" style={{ width: '100%' }} />
          ) : (
            <Carousel fade>
              {itemImages.map(img => (
                <Carousel.Item interval={2000}>
                  <Image src={img} style={{ width: '100%' }} />
                </Carousel.Item>
              ))}
            </Carousel>
          )
        ) : <h5 style={{ color: 'black', textAlign: 'center' }}>Fetching images...</h5>}
      </Card.Header>
      <Card.Body>
        <Card.Title>Item name: {item.itemName}</Card.Title>
        <Card.Text>Category: {item.category}</Card.Text>
        <Card.Text>Description: {item.description}</Card.Text>
        <Card.Text>Last Seen At: {item.lastSeen}</Card.Text>
        <Button variant="success" style={{ width: '100%' }} onClick={() => toggleContactForm()}>I found this item</Button>

        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Modal show={messageFormDisplay} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 style={{ textAlign: 'center', color: 'black' }}>{`Thank you for finding ${item.itemName}!`}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please enter a message. This information will be emailed to [Insert name here].</p>
            <AutoForm schema={bridge} onSubmit={data => submit(data)}>
              <TextField name="contactInfo" placeholder="email, phone #, instagram, etc... (optional)" label="Your Contact Info" required={false} />
              <LongTextField name="message" placeholder="Indicate details of where you found the item, etc..." required />
              <ErrorsField />
              <SubmitField />
            </AutoForm>
          </Modal.Body>
        </Modal>
        <Card.Text>Email: {item.contactEmail}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
LostItem.propTypes = {
  item: PropTypes.shape({
    itemName: PropTypes.string,
    category: PropTypes.string,
    lastSeen: PropTypes.string,
    contactEmail: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    image: PropTypes.array,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default LostItem;
