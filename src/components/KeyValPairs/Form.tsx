import React from 'react';
import { observer } from 'mobx-react';
// import * as _ from 'lodash';
import addKeyValPairForm from '../../mobx-forms/addKeyValPairForm';
import { Button, Container, Input, Row, Col } from 'reactstrap';
import { FeatureFlag } from '../../common/interfaces';
// import EditSubmitCancelButtonGroup from '../InlineEdit-SubmitCancelButtonGroup/Edit-SubmitCancel-ButtonGroup';
// import store from '../../mobx-stores/featureFlags'

interface Props {
  toggle: () => void;
  submit: () => void;
  feature: FeatureFlag
}


@observer
export default class AddKeyValPairForm extends React.Component<Props, {}> {

  form: any;
  constructor(props: Props) {
    super(props);
    this.form = (addKeyValPairForm as any);
    this.form.$('featureId').value = this.props.feature._id;
  }

  render() {
    return (
      <div> {this.renderForm()} </div>
    );
  }

  renderForm = () => {
    return <form>
      <Row className="">
        <Container>
          <Row className="">
            <Col xs="12" sm="5" className="listCell">
              <Input className="ff-input" {...this.form.$('propertyKey').bind({ type: 'text' }) } />
              <span className="float-left errorText">{this.form.$('propertyKey').error}</span>
            </Col>

            <Col xs="10" sm="5" className="listCell">
              <Input className="ff-input" {...this.form.$('propVal').bind({ type: 'text' }) } />
              <span className="float-left errorText">{this.form.$('propVal').error}</span>
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



  onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    await this.form.onSubmit(e);
    this.props.submit();
  };

}
