import './styles.css';

import { observer } from 'mobx-react';
import React from 'react';
import { Badge, Button, ButtonGroup, Col, Container, Input, Row } from 'reactstrap';

import { ElementMapper, EnabledForConditionsConfig } from '../../common/interfaces';

interface State {
  addNew: boolean,
  newValue: string | number
}

interface Props {
  conditionName: string,
  value: string | number | string[] | number[],
  updateValueAtStore: (k: string, v: string | number, remove?: boolean) => void
}

@observer
class FeatureEnableCondition extends React.Component<Props, State> {
  conditionConfig: ElementMapper;
  editIcon: string = 'fa fa-plus';
  constructor(props: Props) {
    super(props);
    this.state = {
      addNew: false,
      newValue: ''
    };

    const [conditionConfig] = EnabledForConditionsConfig.filter((c) => c.condition === this.props.conditionName);
    if (conditionConfig) {
      this.conditionConfig = conditionConfig;
    } else {
      // this would mean some unsupported conditionName passed in props
    }
    if (!this.conditionConfig.multiValue) {
      this.editIcon = 'fa fa-pencil';
    }
  }

  render() {
    return (
      <Row className="listRow">
        <Col xs="12" sm="5" className="listCell label">{this.conditionConfig.label}</Col>
        <Col xs="12" sm="5" className="listCell">{this.renderEditOption()}</Col>
        <Col xs="12" sm="2" className="listCell clearfix" ><span className="float-right">{this.editIcons()}</span></Col>
      </Row>
    );
  }


  toggleAddNewValue = () => {
    this.setState({ addNew: !this.state.addNew });
  }

  cancelAddNew = () => {
    return this.setState({ addNew: false });
  }

  submitNewValue = () => {
    this.props.updateValueAtStore(this.props.conditionName, this.state.newValue);
    this.toggleAddNewValue();
  }

  setNewValue = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ newValue: e.currentTarget.value });
  }



  editIcons = () => {
    if (this.state.addNew) {
      return '';
    } else {
      return <i className={this.editIcon} aria-hidden="true" onClick={this.toggleAddNewValue} ></i>;
    }
  }



  renderEditOption = () => {
    return <Container>
      <Row>
        <Col>
          {this.renderValueBadge()}
        </Col>
      </Row>
      {this.addNewInputRender()}

    </Container>
  }

  renderValueBadge = () => {
    if (this.conditionConfig.multiValue) {
      return (this.props.value as string[]).map((val) => {
        return <span className="fs20 p-0-5" key={`badge-${this.props.conditionName}-${val}`}>
          <Badge color="dark">
            {val}
            <span data-val={val} onClick={this.removeValue} className="p-0-5">
              <i className="fa fa-times-circle" aria-hidden="true" ></i>
            </span>
          </Badge>
        </span>
      })
    } else {
      return <span className="fs20">
        <Badge color="dark">
          {this.props.value} &nbsp;&nbsp;
          <span data-val={this.props.value} onClick={this.removeValue} >
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </span>
        </Badge>
      </span>
    }
  }

  addNewInputRender = () => {
    if (this.state.addNew) {
      return <Row>
        <Col xs="12" sm="9">
          <Input type={this.conditionConfig.type} onChange={this.setNewValue}></Input>
        </Col>
        <Col xs="12" sm="3">
          <ButtonGroup>
            <Button className="btn btn-success" id="Submit" onClick={this.submitNewValue} >
              <i className="fa fa-check" aria-hidden="true" ></i>
            </Button><Button className="btn btn-secondary" id="cancel" onClick={this.toggleAddNewValue}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    } else {
      return '';
    }
  }

  removeValue = (e: React.FormEvent<HTMLSpanElement>) => {
    const val = e.currentTarget.dataset.val;
    this.props.updateValueAtStore(this.props.conditionName, val, true);
  }

}



export default FeatureEnableCondition;
