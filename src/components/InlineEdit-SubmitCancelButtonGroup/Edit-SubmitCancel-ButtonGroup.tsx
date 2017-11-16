import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

interface State {
  editing: boolean
}
interface Props {
  onSubmit: any;
  onCancel: any;
  onEditClick?: () => void;
  showEdit?: boolean;
}
class EditSubmitCancelButtonGroup extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  render() {
    if (this.state.editing || (this.props.showEdit === false)) {
      return (
        <span className="p-0-5">
          <ButtonGroup>
            <Button className="btn btn-success" onClick={this.onSubmit} >
              <i className="fa fa-check" aria-hidden="true" ></i>
            </Button>
            <Button className="btn btn-secondary" onClick={this.onCancel}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </Button>
          </ButtonGroup>
        </span>
      );
    } else {
      return (
        <span className="p-0-5">
          <ButtonGroup>
            <Button className="btn btn-secondary" onClick={this.onEditClick}>
              <i className="fa fa-pencil" aria-hidden="true" ></i>
            </Button>
          </ButtonGroup>
        </span>
      )
    }
  }

  onEditClick = () => {
    this.setState({ editing: true })
    this.props.onEditClick();
  }

  onCancel = () => {
    this.setState({ editing: false });
    this.props.onCancel();
  }

  onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    this.setState({ editing: false });
    this.props.onSubmit(e);
  }

}

export default EditSubmitCancelButtonGroup;
