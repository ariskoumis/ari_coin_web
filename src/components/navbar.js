import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import db from '../utils/db_wrapper';    

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loggedIn: false
    };
  }

  componentWillMount() {
    let logged_in = this.loggedIn();
    this.setState({
      loggedIn: logged_in
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  async loggedIn() {
    let logged_in = await db.loggedIn();
    // alert(logged_in.result)
    if (logged_in.result) {
        return true
    } else {
        return false
    }
  }

  handleLogout = () => {
    db.logout();
    this.setState({
      loggedIn: false
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">AriCoin Web</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/home/">Home</NavLink>
              </NavItem>
                <NavLink href="/login/">Login</NavLink>
              <NavItem>
                <NavLink href="/about/">About</NavLink> 
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/ariskoumis/ari_coin_web">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}