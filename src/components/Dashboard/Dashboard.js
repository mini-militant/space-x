import React from "react";
import Header from "./Header/Header";
import { Link } from "react-router-dom";
import "./Dashboard.css";
class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-container">
        <Header />
        <div class="dropdown-container">
          <div>Choose to Explore</div>
          <div>
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </div>
          <div class="dropdown-content">
            <Link to="/capsules">Capsules</Link>
            <br />
            <Link to="/cores">Cores</Link>
            <br />
            <Link to="/cores">Dragons</Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
