import './styles.css';
import React from 'react';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

interface State {
  isOpen: boolean
}

class NavBar extends React.Component<{}, State> {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Feature Flag Manager</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" className="menuLink">Feature Flags</Link>
              </NavItem>
              <NavItem>
                <Link to="/apps" className="menuLink">Client Applications</Link>
              </NavItem>
              <NavItem>
                <Link to="/addfeature" className="float-right">
                  <Button color="info"><i className="fa fa-plus" aria-hidden="true" ></i> Add New Feature-Flag</Button>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
