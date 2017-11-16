import './styles.css';

import { observer } from 'mobx-react';
import React from 'react';
import { Button, Collapse, Container, Tooltip } from 'reactstrap';

import { ElementMapper, FeatureFlag } from '../../common/interfaces';
import FeatureEnableConditions from '../FeatureEnableConditions/FeatureEnableConditions';
import FeatureFlagDetailsItem from '../FeatureFlagDetailsItem/FeatureFlagDetailsItem';
import KeyValPairs from '../KeyValPairs/KeyValPairs'



interface State {
  collapse: boolean,
  deleteTooltipOpen: boolean,
  chevronClass: string,
  feature: FeatureFlag
}

interface Props {
  feature: FeatureFlag,
  store: any
}

@observer
class FeatureFlagListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleDeleteTooltip = this.toggleDeleteTooltip.bind(this);
    this.state = {
      collapse: false,
      deleteTooltipOpen: false,
      chevronClass: 'fa fa-chevron-down',
      feature: this.props.feature
    };
  }

  toggleCollapse = () => {
    let chevronClass: string = 'fa fa-chevron-down';
    if (!this.state.collapse) {
      chevronClass = 'fa fa-chevron-up';
    }
    this.setState({ chevronClass, collapse: !this.state.collapse });
  }

  toggleDeleteTooltip = () => {
    this.setState({
      deleteTooltipOpen: !this.state.deleteTooltipOpen
    });
  }

  docPropsNotToDisplay = ['_id', '__v', 'KeyVals', 'enabledFor', 'created_at', 'app'];

  renderFeatureDetailsItems = () => {
    const details = Object.keys(this.props.feature)
      .filter(key => this.props.feature.hasOwnProperty(key) && this.docPropsNotToDisplay.indexOf(key) < 0)
      .map(key => {
        const val = (this.props.feature as any)[key];
        return <FeatureFlagDetailsItem label={key} value={val} key={key} updateValueAtStore={this.updateValueAtStore}></FeatureFlagDetailsItem>;
      });
    return details;
  }


  render() {
    return (
      <div className="listItem">
        <div className="info" color="info clearfix" style={{ marginBottom: '1rem' }}>

          <span onClick={this.toggleCollapse} className="fs20">
            <i className={this.state.chevronClass} aria-hidden="true"></i> {this.props.feature.key}
          </span>
          <Button className="btn btn-danger float-right"
            id={`Delete-${this.props.feature.key}`} onClick={this.deleteFeatureAtStore} >
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </Button>
          <Tooltip placement="bottom" isOpen={this.state.deleteTooltipOpen}
            target={`Delete-${this.props.feature.key}`} toggle={this.toggleDeleteTooltip}>
            Delete
          </Tooltip>
        </div>
        <Collapse isOpen={this.state.collapse}>

          <Container>
            {this.renderFeatureDetailsItems()}
          </Container>

          <FeatureEnableConditions feature={this.props.feature} store={this.props.store}></FeatureEnableConditions>
          <KeyValPairs feature={this.props.feature} ></KeyValPairs>
        </Collapse>
      </div>
    );
  }

  updateValueAtStore = async (key: string, value: string | boolean | number) => {
    const feature = { ...this.props.feature };
    (feature as any)[key] = value;
    await this.props.store.updateFeatureFlag(feature);
  }

  deleteFeatureAtStore = async () => {
    await this.props.store.deleteFeatureFlag(this.props.feature._id);
  }


  buildSelect = (condition: ElementMapper) => {
    const options = condition.options.map((o) => <option value={o.value}>{o.text}</option>)
    return <select>{options}</select>
  }

  buildInput = (condition: ElementMapper) => {
    return <input type={condition.type}></input>;
  }
}

export default FeatureFlagListItem;
