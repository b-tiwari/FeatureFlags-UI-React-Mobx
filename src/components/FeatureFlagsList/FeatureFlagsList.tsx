import './styles.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { ListGroup, Container, Row, Col } from 'reactstrap';

import { FeatureFlag } from '../../common/interfaces';
import FeatureFlagListItem from '../FeatureFlagListItem/FeatureFlagListItem';
import store from '../../mobx-stores/featureFlags';
import ClientApps from '../ClientApps/ClientApps';

@observer
export default class FeatureFlagsList extends React.Component<{}, {}> {

  async componentDidMount() {
    await store.getFeatureFlags();
  }

  renderListItems() {
    const features = store.featureFlags
      .sort((a: FeatureFlag, b: FeatureFlag) => {
        let compare = 0;
        if (a.key > b.key) {
          compare = 1;
        } else if (b.key > a.key) {
          compare = -1;
        }
        return compare;
      })
      .map((flag: FeatureFlag) => {
        return <FeatureFlagListItem feature={flag} key={`${flag.app}-${flag.key}`} store={store}></FeatureFlagListItem>
      })
    return features;
  }

  render() {

    return (
      <div className="container sectionContainer" >
        <Container>
          <Row>
            <Col xs="9"><h3> Manage Feature Flags </h3></Col>
            <Col xs="3" className="clearfix">
              <div className="float-right">
                <ClientApps></ClientApps>
              </div>
            </Col>
          </Row>
        </Container>


        <ListGroup>{this.renderListItems()}</ListGroup>
      </div>
    );
  }


}
