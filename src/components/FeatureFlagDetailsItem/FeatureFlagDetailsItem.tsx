import './styles.css';

import * as _ from 'lodash';
import React from 'react';
import { Button, ButtonGroup, Col, Input, Row } from 'reactstrap';


interface State {
  editing: boolean,
  value: string | boolean | number;
}

interface Props {
  label: string,
  value: string,
  updateValueAtStore: (k: string, v: string | boolean | number) => void
}

class FeatureFlagDetailsItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // this.setEditing = this.setEditing.bind(this);
    this.state = {
      editing: false,
      value: this.props.value
    };
  }

  setEditing = () => {
    this.setState({ editing: !this.state.editing });
    if (this.state.editing) {
      return '';
    } else {
      return <i className="fa fa-pencil" aria-hidden="true" onClick={this.setEditing}></i>;
    }
  }

  cancelEditing = () => {
    return this.setState({ editing: false });
  }

  submitValue = () => {
    this.props.updateValueAtStore(this.props.label, this.state.value);
    this.setEditing();
  }

  setValue = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value });
  }

  renderEditOption = () => {
    if (this.state.editing) {
      return <Input type="text" defaultValue={this.props.value} onChange={this.setValue} />;
    } else {
      return this.props.value;
    }
  }

  editIcons = () => {
    if (this.state.editing) {
      return <ButtonGroup>
        <Button className="btn btn-success" id="Submit" onClick={this.submitValue} >
          <i className="fa fa-check" aria-hidden="true" ></i>
        </Button><Button className="btn btn-secondary" id="cancel" onClick={this.setEditing}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </Button>
      </ButtonGroup>;
    } else {
      return <i className="fa fa-pencil" aria-hidden="true" onClick={this.setEditing} ></i>;
    }
  }

  render() {
    return (
      <Row className="listRow">
        <Col xs="4" sm="2" className="listCell label">{_.upperFirst(this.props.label)}</Col>
        <Col xs="8" sm="8" className="listCell">{this.renderEditOption()}</Col>
        <Col xs="12" sm="2" className="listCell clearfix" ><span className="float-right">{this.editIcons()}</span></Col>
      </Row>
    );
  }
}

export default FeatureFlagDetailsItem;
