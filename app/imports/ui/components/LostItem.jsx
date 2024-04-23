import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Carousel } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Images } from '../../api/item/Images';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

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

  return (
    <Card className="h-100">
      <Card.Header>
        {(ready) ? (
          <Carousel>
            {itemImages.map(img => (
              <Carousel.Item interval={2000}>
                <Image src={img} style={{ width: '100%' }} />
              </Carousel.Item>
            ))}
          </Carousel>

        ) : <h5 style={{ color: 'black', textAlign: 'center' }}>Fetching images...</h5>}
      </Card.Header>
      <Card.Body>
        <Card.Title>Item name: {item.itemName}</Card.Title>
        <Card.Text>Category: {item.category}</Card.Text>
        <Card.Text>Description: {item.description}</Card.Text>
        <Card.Text>Last Seen At: {item.lastSeen}</Card.Text>
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
