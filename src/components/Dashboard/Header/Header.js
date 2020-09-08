import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isSignedOut } from "../../../Redux/Actions";

class Header extends React.Component {

  signOut=()=>(
    this.props.isSignedOut()
  )

  render() {

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/dashboard">Space-X - {this.props.userRole}</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Info</Nav.Link>
            <NavDropdown title="Others" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/capsules">Capsules</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/cores">Cores</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/dragons">Dragons</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              {this.props.userRole === "admin" ? (
                <Link to="/history">History</Link>
              ) : null}
            </Nav.Link>
            <Nav.Link>
              {this.props.isSignedIn===true
              ?
              <p onClick={this.signOut}>SignOut</p>
              :
              null
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRole: state.userRole,
    isSignedIn:state.isSignedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isSignedOut: () => dispatch(isSignedOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
