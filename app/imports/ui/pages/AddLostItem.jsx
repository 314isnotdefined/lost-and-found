import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { LostItems } from '../../api/item/LostItems';

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
  lastSeen: String,
  contactEmail: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddLostItem page for adding a document. */
const AddLostItem = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { itemName, image, category, description, lastSeen, contactEmail } = data;
    const owner = Meteor.user().username;
    LostItems.collection.insert(
      { itemName, image, category, description, lastSeen, contactEmail, owner },
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
          <Col className="text-center"><h2>Add Lost Item</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="itemName" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <Row>
                  <Col><SelectField name="category" /></Col>
                  <Col><TextField name="lastSeen" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="contactEmail" /></Col>
                  <Col><LongTextField name="description" /></Col>
                </Row>
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

export default AddLostItem;
