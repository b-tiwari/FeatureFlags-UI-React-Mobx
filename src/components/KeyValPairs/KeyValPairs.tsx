import React from 'react';
import { observer } from 'mobx-react';
import store from '../../mobx-stores/featureFlags';
import { FeatureFlag, KeyVal } from '../../common/interfaces';
import { Button, Container, Col, Input, Row } from 'reactstrap';
import AddKeyValPairForm from './Form';
import EditSubmitCancelButtonGroup from '../InlineEdit-SubmitCancelButtonGroup/Edit-SubmitCancel-ButtonGroup';

interface Props {
  feature: FeatureFlag
}

interface State {
  editing: boolean
  addNewKeyVal: boolean
  editingKeyVal: KeyVal
}

@observer
export default class KeyValPairs extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state = {
      editing: false,
      addNewKeyVal: false,
      editingKeyVal: {} as KeyVal
    }
  }

  render() {
    return <div className="enabledForContainer" >
      {this.renderSectionHeader()}
      {this.renderKeyValPairRows()}
      {this.renderForm()}
    </div>
  }

  renderSectionHeader = () => {
    return <Container>
      <Row>
        <Col xs="10"><label className="sectionHeader">Additional Property-Value Pairs</label></Col>
        <Col xs="2">
          <Button className="btn btn-info float-right" onClick={this.onAddNewButtonClick} >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  }

  renderKeyValPairRows = () => {
    const rows = this.props.feature.KeyVals.map((kv) => {
      const uniqueKey = `${this.props.feature.app}-${this.props.feature.key}-${kv.key}`
      return <Row className="listRow" key={uniqueKey}>
        <Col xs="6" sm="4" className="listCell label">{kv.key}</Col>
        <Col xs="6" sm="6" className="listCell">
          {this.renderEditForm(kv)}
        </Col>
        <Col xs="12" sm="2" className="listCell clearfix" >
          {this.getEditButtons(kv)}
        </Col>
      </Row>
    })

    return <Container>{rows}</Container>
  }

  renderForm = () => {
    if (this.state.addNewKeyVal) {
      return <Container>
        <Row>
          <Col xs="12">
            <AddKeyValPairForm
              feature={this.props.feature} toggle={this.onAddNewButtonClick} submit={this.onAddNewButtonClick}>
            </AddKeyValPairForm>
          </Col>
        </Row>
      </Container>
    } else {
      return ''
    }
  }

  getEditButtons = (keyVal: KeyVal) => {
    if (this.state.editing) {
      return '';
    } else {
      return <span className="float-right">
        <i className="fa fa-pencil" aria-hidden="true" onClick={() => this.setEditing(keyVal)}></i>{' '}
        <i className="fa fa-times-circle" aria-hidden="true" onClick={() => this.removeKeyVal(keyVal.key)}></i>
      </span>
    }
  }

  renderEditForm = (keyVal: KeyVal) => {
    if (this.state.editing) {
      return <span>
        <Input type="text" value={this.state.editingKeyVal.value} onChange={this.onValueChange} />
        <EditSubmitCancelButtonGroup onCancel={this.onEditCancel} onSubmit={this.onEditSubmit} showEdit={false}>
        </EditSubmitCancelButtonGroup>
      </span>
    } else {
      return keyVal.value
    }
  }

  setEditing = (keyVal: KeyVal) => {
    this.setState({ editing: !this.state.editing, editingKeyVal: keyVal });
  }

  onValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = (e.target as any).value;
    const keyval: KeyVal = { ...this.state.editingKeyVal };
    keyval.value = val;
    this.setState({ editingKeyVal: keyval });
  }

  onAddNewButtonClick = () => {
    this.setState({ addNewKeyVal: !this.state.addNewKeyVal });
  }

  removeKeyVal = (key: string) => {
    console.log('deleting key=', key);
    store.deleteKeyValPair(this.props.feature._id, key);
  }

  onEditCancel = () => {
    this.setState({ editing: !this.state.editing });
  }

  onEditSubmit = async () => {
    console.log('submitting value', this.state.editingKeyVal);
    await store.updateKeyValPair(this.props.feature._id, this.state.editingKeyVal.key, this.state.editingKeyVal.value);
    this.setState({ editing: !this.state.editing });
  }
}
