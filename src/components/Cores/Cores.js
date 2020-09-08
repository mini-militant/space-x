import React from "react";
import Header from "../Dashboard/Header/Header";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import SearchBar from "../SearchBar/SearchBar";
import { connect } from "react-redux";
import "./Cores.css";

class Cores extends React.Component {
  constructor() {
    super();
    this.state = {
      Data: [],
      filter: "Filter",
    };
  }

  getSearchedItem = () => {
    let Base_url = "https://api.spacexdata.com/v3/cores/";
    fetch(Base_url + `${this.props.searchItem}`)
      .then((res) => res.json())
      .then((res) => {
        let searchedValue = [];
        searchedValue.push(res);
        this.setState({ Data: searchedValue });
      });
  };

  componentDidMount() {
    fetch("https://api.spacexdata.com/v3/cores")
      .then((res) => res.json())
      .then((res) => this.setState({ Data: res }));
  }

  handleAllRequest = () => {
    this.setState({ filter: "All" });
    fetch("https://api.spacexdata.com/v3/cores")
      .then((res) => res.json())
      .then((res) => this.setState({ Data: res }));
  };
  handleUpcomingRequest = () => {
    this.setState({ filter: "Upcoming" });
    fetch("https://api.spacexdata.com/v3/cores/upcoming")
      .then((res) => res.json())
      .then((res) => this.setState({ Data: res }));
  };

  handlePastRequest = () => {
    this.setState({ filter: "Past" });
    fetch("https://api.spacexdata.com/v3/cores/past")
      .then((res) => res.json())
      .then((res) => this.setState({ Data: res }));
  };
  render() {
    return (
      <div>
        <Header />
        <div className="capsule-container">
          <h1>Cores Data</h1>
          <br />

          <div className="filter-container">
            <SearchBar getSearchedItem={this.getSearchedItem} />
            <Dropdown className="filter-button">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {this.state.filter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.handleAllRequest}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleUpcomingRequest}>
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
                <th>Block</th>
                <th>Status</th>
                <th>Original Launch</th>
                <th>Mission</th>
                <th>Reuse Count</th>
                <th>rtls_attempts</th>
                <th>rtls_landings</th>
                <th>asds_attempts</th>
                <th>asds_landings</th>
                <th>Water Landing</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Data.length > 0
                ? this.state.Data.map((item) => {
                    return (
                      <tr key={item.core_serial}>
                        <td>{item.core_serial}</td>
                        <td>{item.block}</td>
                        <td>{item.status}</td>
                        <td>{item.original_launch}</td>

                        <td>
                          {item.missions.map((mission) => {
                            return (
                              <ul>
                                <li>{mission.name}</li>
                                <li>{mission.flight}</li>
                              </ul>
                            );
                          })}
                        </td>
                        <td>{item.reuse_count}</td>
                        <td>{item.rtls_attempts}</td>
                        <td>{item.rtls_landings}</td>
                        <td>{item.asds_attempts}</td>
                        <td>{item.asds_landings}</td>
                        <td>{item.water_landing}</td>
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

export default connect(mapStateToProps, null)(Cores);
