import React from "react";
import Header from "../Dashboard/Header/Header";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import SearchBar from "../SearchBar/SearchBar";
import { connect } from "react-redux";
import "./Capsule.css";

class Capsule extends React.Component {
  constructor() {
    super();
    this.state = {
      CapsuleData: [],
      filter: "Filter",
    };
  }

  getSearchedItem = () => {
    let Base_url = "https://api.spacexdata.com/v3/capsules/";
    fetch(Base_url + `${this.props.searchItem}`)
      .then((res) => res.json())
      .then((res) => {
        let searchedValue = [];
        searchedValue.push(res);
        this.setState({ CapsuleData: searchedValue });
      });
  };

  componentDidMount() {
    fetch("https://api.spacexdata.com/v3/capsules")
      .then((res) => res.json())
      .then((res) => this.setState({ CapsuleData: res }));
  }

  handleAllCapsule = () => {
    this.setState({ filter: "All" });
    fetch("https://api.spacexdata.com/v3/capsules")
      .then((res) => res.json())
      .then((res) => this.setState({ CapsuleData: res }));
  };
  handleUpcomingCapsule = () => {
    this.setState({ filter: "Upcoming" });
    fetch("https://api.spacexdata.com/v3/capsules/upcoming")
      .then((res) => res.json())
      .then((res) => this.setState({ CapsuleData: res }));
  };

  handlePastRequest = () => {
    this.setState({ filter: "Past" });
    fetch("https://api.spacexdata.com/v3/capsules/past")
      .then((res) => res.json())
      .then((res) => this.setState({ CapsuleData: res }));
  };
  render() {
    console.log("CapsuleData", this.props.searchItem);

    return (
      <div>
        <Header />
        <div className="capsule-container">
          <h1>Capsules Data</h1>
          <br />

          <div className="filter-container">
            <SearchBar getSearchedItem={this.getSearchedItem} />
            <Dropdown className="filter-button">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {this.state.filter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.handleAllCapsule}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleUpcomingCapsule}>
                  Upcoming
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handlePastRequest}>
                  Past
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Capsule ID</th>
                <th>Status</th>
                <th>Original Launch</th>
                <th>Mission</th>
                <th>Landings</th>
                <th>Type</th>
                <th>Reuse Count</th>
              </tr>
            </thead>
            <tbody>
              {this.state.CapsuleData.length > 0
                ? this.state.CapsuleData.map((item) => {
                    return (
                      <tr key={item.capsule_serial}>
                        <td>{item.capsule_serial}</td>
                        <td>{item.capsule_id}</td>
                        <td>{item.status}</td>
                        <td>{item.original_launch}</td>

                        <td>
                          {item.missions.map((mission) => {
                            return (
                              <ul key={mission.name}>
                                <li>Mission Name:{mission.name}</li>
                                <li>Flight:{mission.flight}</li>
                              </ul>
                            );
                          })}
                        </td>
                        <td>{item.landings}</td>
                        <td>{item.type}</td>
                        <td>{item.reuse_count}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchItem: state.searchedItem,
  };
};

export default connect(mapStateToProps, null)(Capsule);
