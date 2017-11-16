import React from 'react';
import { observer } from 'mobx-react';

import { Button, Container } from 'reactstrap';
import { FeatureFlag } from '../../common/interfaces';
// import { EnabledForConditionElements, FeatureFlag } from '../../common/interfaces';
import AddEnabledForConditionForm from './Form';

interface State {
  addNewCondition: {
    editing: boolean,
    enabledForWhom: string
  }
}

interface Props {
  feature: FeatureFlag
}

@observer
export default class AddEnabledForCondition extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addNewCondition: {
        enabledForWhom: this.props.feature.enabledFor.allNoneOrFewSelected,
        editing: false
      }
    };
  }

  render() {
    return this.renderAddNewButton();
  }

  renderAddNewButton = () => {
    if (this.props.feature.enabledFor.allNoneOrFewSelected === 'selected') {
      return <div>
        {this.renderAddNewForm()}
        <Button onClick={this.toggleAddNewCondition}>Add New Condition</Button>
      </div>
    } else {
      return ''
    }
  }



  renderAddNewForm = () => {
    if (this.state.addNewCondition.editing) {
      return <Container>
        <AddEnabledForConditionForm
          feature={this.props.feature}
          submit={this.submitAddNewCondition}
          toggle={this.toggleAddNewCondition} ></AddEnabledForConditionForm>
      </Container>
    } else {
      return ''
    }



  }

  toggleAddNewCondition = () => {
    const addNewCondition = { ...this.state.addNewCondition };
    addNewCondition.editing = !addNewCondition.editing;
    this.setState({ addNewCondition });
  }

  submitAddNewCondition = () => {
    const addNewCondition = { ...this.state.addNewCondition };
    addNewCondition.editing = !addNewCondition.editing;
    this.setState({ addNewCondition });

  }


}
