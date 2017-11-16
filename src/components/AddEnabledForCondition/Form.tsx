import React from 'react';
import { observer } from 'mobx-react';
// import * as _ from 'lodash';
import addEnabledForConditionForm from '../../mobx-forms/addEnabledForCondition';
import { Button, Container, Input, Row, Col } from 'reactstrap';
import { EnabledForConditionsConfig, ElementMapper, FeatureFlag, isConditionValueNonEmpty } from '../../common/interfaces';
// import EditSubmitCancelButtonGroup from '../InlineEdit-SubmitCancelButtonGroup/Edit-SubmitCancel-ButtonGroup';

interface Props {
  toggle: () => void;
  submit: () => void;
  feature: FeatureFlag
}

interface State {
  selectedCondition: string
}



@observer
export default class AddEnabledForConditionForm extends React.Component<Props, State> {
  enabledForConditionsOptions: ElementMapper[];
  form: any;
  constructor(props: Props) {
    super(props);
    this.form = (addEnabledForConditionForm as any);
    this.state = {
      selectedCondition: ''
    }

    this.form.$('featureId').value = this.props.feature._id;
  }

  conditionsToSelect = () => {
    return EnabledForConditionsConfig
      .filter((o) => o.condition !== 'allNoneOrFewSelected')
      .filter((o) => {
        // filter those props that have empty values (empty array vals) or those that don't exist already in db
        return Object.keys(this.props.feature.enabledFor).indexOf(o.condition) < 0
          || !isConditionValueNonEmpty(o.condition, (this.props.feature.enabledFor as any)[o.condition])
      });
  }

  async componentWillMount() {
    this.enabledForConditionsOptions = this.conditionsToSelect();
    if (this.enabledForConditionsOptions.length > 0) {
      this.setState({ selectedCondition: this.enabledForConditionsOptions[0].condition });
      this.form.$('condition').value = this.state.selectedCondition;
    }
  }

  renderSelectConditionOptions = () => {
    if (this.enabledForConditionsOptions.length > 0) {
      return this.enabledForConditionsOptions.map((o) => <option value={o.condition} key={o.condition}>{o.label}</option>);
    } else {
      return null;
    }
  }

  onConditionSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    this.form.$('condition').value = (e.target as any).value;
  }

  render() {
    return (
      <div> {this.renderForm()} </div>
    );
  }

  renderForm = () => {
    if (this.enabledForConditionsOptions.length < 1) {
      return '';
    } else {
      return <form>
        <Row className="">
          <Container>
            <Row className="">
              <Col xs="12" sm="5" className="listCell">
                <div className="select" color="primary">
                  <span className="arr"></span>
                  <select {...this.form.$('condition').bind() } value={this.form.$('condition').value} onChange={this.onConditionSelect}>
                    {this.renderSelectConditionOptions()}
                  </select>
                </div>
                <span className="float-left errorText">{this.form.$('condition').error}</span>
              </Col>

              <Col xs="10" sm="5" className="listCell">
                <Input className="ff-input" {...this.form.$('conditionValue').bind({ type: 'text' }) } />
                <span className="float-left errorText">{this.form.$('conditionValue').error}</span>
              </Col>

              <Col xs="2" className="listCell">
                <Button color="success" onClick={this.onSubmit}>
                  <i className="fa fa-check" aria-hidden="true" ></i>
                </Button>{' '}
                <Button outline color="secondary" onClick={this.props.toggle}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </Button>{' '}
                <Input {...this.form.$('featureId').bind({ type: 'hidden' }) } />
              </Col>
            </Row>
          </Container>

        </Row>
      </form>
    }
  }



  onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    await this.form.onSubmit(e);
    this.props.submit();
  };


  // onClick = (e: React.FormEvent<HTMLButtonElement>) => {
  //   console.log(e.currentTarget.tagName);
  //   this.form.onSubmit(e, {
  //     onSuccess: this.onSubmitSuccess,
  //     onError: this.onSubmitError
  //   });
  // };

  // onSubmitSuccess = () => {
  //   console.log('in custom success');
  // };

  // onSubmitError = () => {
  //   console.log('in custom error');
  // };

}
