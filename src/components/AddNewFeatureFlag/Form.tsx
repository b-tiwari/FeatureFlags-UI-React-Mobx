import React from 'react';
import { observer } from 'mobx-react';
import addFeatureFlagForm from '../../mobx-forms/addFeatureFlagForm';
import { Button, Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';


interface State {
  submitSuccess: boolean
}
@observer
export default class AddFeatureFlagForm extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = {
      submitSuccess: false
    };
  }

  form: any = (addFeatureFlagForm as any);

  render() {
    if (this.state.submitSuccess) {
      return <Redirect to="/" />;
    }
    return (
      <form>
        <Container>
          <Row className="listRow">
            <Col xs="4" sm="2" className="listCell label">
              <label htmlFor={this.form.$('app').id}> {this.form.$('app').label} *  </label>
            </Col>
            <Col xs="8" sm="6" className="listCell">
              <div className="select" color="primary">
                <span className="arr"></span>
                <select {...this.form.$('app').bind() } >

                  {
                    this.form.$('app').options
                      .map((o: { value: string, text: string }) => <option value={o.value} key={o.value}>{o.text}</option>)
                  }
                </select>
              </div>
            </Col>
            <Col xs="12" sm="4" className="listCell clearfix" >
              <span className="float-left errorText">{this.form.$('app').error}</span>
            </Col>
          </Row>

          <Row className="listRow">
            <Col xs="4" sm="2" className="listCell label">
              <label htmlFor={this.form.$('key').id}> {this.form.$('key').label} *  </label>
            </Col>
            <Col xs="8" sm="6" className="listCell"><input {...this.form.$('key').bind({ type: 'text' }) } /></Col>
            <Col xs="12" sm="4" className="listCell clearfix" >
              <span className="float-left errorText">{this.form.$('key').error}</span>
            </Col>
          </Row>

          <Row className="listRow">
            <Col xs="4" sm="2" className="listCell label">
              <label htmlFor={this.form.$('description').id}> {this.form.$('description').label}  </label>
            </Col>
            <Col xs="8" sm="6" className="listCell"><input {...this.form.$('description').bind({ type: 'text' }) } /></Col>
            <Col xs="12" sm="4" className="listCell clearfix" >
              <span className="float-left errorText">{this.form.$('description').error}</span>
            </Col>
          </Row>

          <Row className="listRow">
            <Col xs="12" className="listCell">
              <Button color="info" onClick={this.onSubmit}>Submit</Button>{' '}
              <Button outline color="secondary" onClick={this.form.onReset}>Reset</Button>{' '}
              <Button outline color="secondary" onClick={this.form.onClear}>Cancel</Button>{' '}
            </Col>
          </Row>
        </Container>
        <p className="errorText">{this.form.error}</p>
      </form>
    );
  }

  onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {

    const addedSuccessfully = await this.form.onSubmit(e);
    if (addedSuccessfully) {
      this.setState({ submitSuccess: true });
    }
  };
}
