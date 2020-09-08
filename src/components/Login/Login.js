import React from "react";
import "./Login.css";
import { connect } from "react-redux";
import { isSignedIn, setUserRole } from "../../Redux/Actions";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      UserData: [],
      userFound: false,
    };
  }

  stateChangeHandler = (event) => {
    if (event.target.type === "text") {
      this.setState({
        email: event.target.value,
      });
    } else {
      this.setState({
        password: event.target.value,
      });
    }
  };

  CheckCredentials = () => {
    fetch("https://run.mocky.io/v3/a0eec33c-cb8c-426c-ab66-827541ba9837")
      .then((res) => res.json())
      .then((res) => {
        for (let item of res) {
          if (
            this.state.email === item.email &&
            this.state.password === item.pass
          ) {
            this.setState({ userFound: true });
            this.props.setUserRole(item.role);
            this.props.isSignedIn();
            this.props.history.push("/dashboard");
            break;
          }
        }
        if (this.state.userFound !== true) {
          alert("Invalid User");
        }
      });
  };

  render() {
    return (
      <div className="Login_form">
        <h1>LOGIN</h1>
        <input
          className="login-input"
          type="text"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.stateChangeHandler}
        />
        <br />
        <input
          className="login-input"
          type="password"
          placeholder="Enter Password"
          value={this.state.password}
          onChange={this.stateChangeHandler}
        />
        <br />
        <button className="Login_button" onClick={this.CheckCredentials}>
          Login
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isSignedIn: () => dispatch(isSignedIn()),
    setUserRole: (data) => dispatch(setUserRole(data)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
