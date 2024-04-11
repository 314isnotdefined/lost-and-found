import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { FoundItems } from '../../api/item/FoundItems';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  itemName: String,
  image: String,
  category: {
    type: String,
    allowedValues: ['Electronics', 'Identification and Access Cards', 'Clothing and Accessories', 'Food and Drink Containers', 'Textbooks and School Supplies', 'Miscellaneous'],
    defaultValue: 'Miscellaneous',
  },
  description: String,
  locationFound: String,
  contactEmail: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddLostItem page for adding a document. */
const AddFoundItem = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { itemName, image, category, description, locationFound, contactEmail } = data;
    const owner = Meteor.user().username;
    FoundItems.collection.insert(
      { itemName, image, category, description, locationFound, contactEmail, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Found Item</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="itemName" />
                <TextField name="image" />
                <SelectField name="category" />
                <TextField name="locationFound" />
                <TextField name="contactEmail" />
                <LongTextField name="description" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddFoundItem;
