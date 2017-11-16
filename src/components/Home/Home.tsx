import './styles.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { ListGroup } from 'reactstrap';

import { FeatureFlag } from '../../common/interfaces';
import FeatureFlagListItem from '../FeatureFlagListItem/FeatureFlagListItem';
import NavBar from '../NavBar/NavBar';


interface Props {
  store: any
}

@observer
export default class Home extends React.Component<Props, {}> {

  async componentDidMount() {
    await this.props.store.getFeatureFlags();
  }

  renderListItems() {
    const features = this.props.store.featureFlags
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
        return <FeatureFlagListItem feature={flag} key={`${flag.app}-${flag.key}`} store={this.props.store}></FeatureFlagListItem>
      })
    return features;
  }

  render() {

    return (<div>
      <NavBar></NavBar>

      <div className="container listContainer" >
        <h3> Manage Feature Flags </h3>
        <ListGroup>{this.renderListItems()}</ListGroup>
      </div>
    </div>);
  }
}
