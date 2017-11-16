import React from 'react';
import AddFeatureFlagForm from './Form';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AddFeatureFlag extends React.Component<{}, {}> {



  render() {
    return (
      <div className="container sectionContainer" >
        <Container>
          <Row>
            <Col xs="9"><h3> Add New Feature Flag </h3></Col>
            <Col xs="3" className="clearfix">
              <Link to="/" className="float-right">
                <Button color="info"><i className="fa fa-chevron-left " aria-hidden="true" ></i> Back</Button>
              </Link>
            </Col>
          </Row>
          <Row className="sectionContainer">
            <Col xs="12"><AddFeatureFlagForm></AddFeatureFlagForm></Col>
          </Row>


        </Container>
      </div>
    );
  }
}
