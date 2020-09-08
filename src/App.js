import React from "react";
import logo from "./logo.svg";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Capsule from "./components/Capsules/Capsule";
import History from "./components/History/History";
import Dragons from "./components/Dragons/Dragons";
import Cores from "./components/Cores/Cores";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import './App.css'
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            {this.props.isSignedIn === true ? (
              <>
                <Route path="/history" component={History}/>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/capsules" component={Capsule} />
                <Route path="/cores" component={Cores} />
                <Route path="/dragons" component={Dragons} />
              </>
            ) : 
            <Redirect to='/'/>
            }
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.isSignedIn,
  };
};

export default connect(mapStateToProps, null)(App);
