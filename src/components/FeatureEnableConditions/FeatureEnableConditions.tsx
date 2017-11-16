import './styles.css';

import { observer } from 'mobx-react';
import React from 'react';
import { Alert, Col, Container, Row } from 'reactstrap';
import { EnabledForAccountLables, EnabledForConditionsConfig, isConditionValueNonEmpty, FeatureFlag } from '../../common/interfaces';
import FeatureEnableCondition from '../FeatureEnableCondition/FeatureEnableCondition';
import EditSubmitCancelButtonGroup from '../InlineEdit-SubmitCancelButtonGroup/Edit-SubmitCancel-ButtonGroup';
import AddEnabledForCondition from '../AddEnabledForCondition/AddEnabledForCondition';


interface State {
  featureEnabledForWhom: {
    editing: boolean,
    value: string,
  }
}

interface Props {
  feature: FeatureFlag,
  store: any
}

@observer
class FeatureEnableConditions extends React.Component<Props, State> {
  conditionsRowCount: number = 0;
  constructor(props: Props) {
    super(props);
    this.state = {
      featureEnabledForWhom: {
        value: this.props.feature.enabledFor.allNoneOrFewSelected,
        editing: false
      }
    };

  }

  render() {
    return (
      <div className="enabledForContainer" >
        {this.renderFeatureEnabledForWhomElement()}

        {this.renderExistingConditions()}
        {this.renderError()}

        {this.renderAddConditionButton()}


      </div>
    )
  }

  docPropsNotToDisplay = ['_id', '__v', 'created_at', 'allNoneOrFewSelected'];


  renderExistingConditions = () => {
    const feature = this.props.feature;
    this.conditionsRowCount = 0;
    const conditionRows = this.getExistingConditions()
      .map(key => {
        const value = (feature.enabledFor as any)[key];
        const uniqueKey = `${feature.app}-${feature.key}-${key}`
        return <FeatureEnableCondition
          updateValueAtStore={this.updateValueAtStore}
          conditionName={key} value={value} key={uniqueKey} ></FeatureEnableCondition>;
      });

    return <Container>{conditionRows}</Container>
  }

  renderAddConditionButton() {
    const allConditions = EnabledForConditionsConfig
      .filter(c => this.docPropsNotToDisplay.indexOf(c.condition) < 0)

    if (this.getExistingConditions().length < allConditions.length) {
      return <AddEnabledForCondition feature={this.props.feature}>
      </AddEnabledForCondition>
    } else {
      return '';
    }
  }

  // get the featureFlag's existing 'EnabledFor' conditions
  getExistingConditions = () => {
    const feature = this.props.feature;
    if (this.state.featureEnabledForWhom.value === 'selected') {
      return Object.keys(feature.enabledFor)
        .filter(key => feature.enabledFor.hasOwnProperty(key) && this.docPropsNotToDisplay.indexOf(key) < 0)
        .filter(key => isConditionValueNonEmpty(key, (feature.enabledFor as any)[key]));
    } else {
      return [];
    }
  }

  renderFeatureEnabledForWhomElement = () => {
    return <div>
      <Container>
        <Row>
          <Col xs="4" sm="2"><label className="sectionHeader">Enabled For:</label></Col>
          <Col xs="8" sm="10">
            <h5>
              <span className="p-0-5">{this.buildFeatureEnabledForWhomSelectBox()}</span>
              <EditSubmitCancelButtonGroup
                onSubmit={this.setFeatureEnabledForWhom}
                onCancel={this.cancelEditFeatureEnabledForWhom}
                onEditClick={this.toggleAllNoneOrAccountsEdit}></EditSubmitCancelButtonGroup>
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  }

  buildFeatureEnabledForWhomSelectBox = () => {
    const enabledForLabel = EnabledForAccountLables
      .filter((l: { val: string }) => l.val === this.state.featureEnabledForWhom.value)[0]
      .label;

    if (this.state.featureEnabledForWhom.editing) {
      const elemId = `${this.props.feature.app}-${this.props.feature.key}-select-featureEnabledForWhom`
      return <div className="select">
        <span className="arr"></span>
        <select name="select-FeatureEnabledForWhom" id={elemId}
          value={this.state.featureEnabledForWhom.value}
          onChange={this.onChangeFeatureEnabledForWhom}>
          {
            EnabledForAccountLables.map((item) => {
              return <option key={item.val} value={item.val} >{item.label}</option>
            })
          }
        </select>
      </div>

    } else {
      return enabledForLabel;
    }
  }


  toggleAllNoneOrAccountsEdit = () => {
    const featureEnabledForWhom = { ...this.state.featureEnabledForWhom };
    featureEnabledForWhom.editing = !featureEnabledForWhom.editing;
    this.setState({ featureEnabledForWhom });
  }

  cancelEditFeatureEnabledForWhom = () => {
    const featureEnabledForWhom = {
      editing: false,
      value: this.props.feature.enabledFor.allNoneOrFewSelected
    };
    this.setState({ featureEnabledForWhom });
  }

  setFeatureEnabledForWhom = () => {
    const featureEnabledForWhom = { ...this.state.featureEnabledForWhom };
    featureEnabledForWhom.editing = false;
    this.setState({ featureEnabledForWhom });
    this.updateValueAtStore('allNoneOrFewSelected', this.state.featureEnabledForWhom.value);
  }

  onChangeFeatureEnabledForWhom = (e: React.FormEvent<HTMLSelectElement>) => {
    const featureEnabledForWhom = { ...this.state.featureEnabledForWhom };
    featureEnabledForWhom.value = e.currentTarget.value;
    this.setState({ featureEnabledForWhom });
  }

  updateValueAtStore = async (key: string, value: string | number, remove: boolean = false) => {
    const newValue: string | number = value;
    await this.props.store.updateEnabledForCondition(this.props.feature._id, key, newValue, remove);
  }


  renderError = () => {
    return <div className="p-10-0">
      <Alert color="danger" isOpen={this.props.store.responseError !== ''}
        toggle={this.props.store.resetError} >{this.props.store.responseError}</Alert>
    </div>
  }


}

export default FeatureEnableConditions;
