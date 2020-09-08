import React from "react";
import Header from "../Dashboard/Header/Header";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import SearchBar from "../SearchBar/SearchBar";
import { connect } from "react-redux";

class Dragons extends React.Component {
  constructor() {
    super();
    this.state = {
      Data: [],
      filter: "Filter",
    };
  }

  getSearchedItem = () => {
    let Base_url = "https://api.spacexdata.com/v3/dragons/";
    fetch(Base_url + `${this.props.searchItem}`)
      .then((res) => res.json())
      .then((res) => {
        let searchedValue = [];
        searchedValue.push(res);
        this.setState({ Data: searchedValue });
      });
  };

  componentDidMount() {
    fetch("https://api.spacexdata.com/v3/dragons")
      .then((res) => res.json())
      .then((res) => this.setState({ Data: res }));
  }

  handleAllRequest = () => {
    this.setState({ filter: "All" });
    fetch("https://api.spacexdata.com/v3/dragons")
      .then((res) => res.json())
      .then((res) => this.setState({ Data: res }));
  };

  render() {
    return (
      <div>
        <Header />
        <div className="capsule-container">
          <h1>Dragons</h1>
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
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>type</th>
                <th>Crew Capacity</th>
                <th>Orbit Duration(Year)</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Data.length > 0
                ? this.state.Data.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.crew_capacity}</td>
                        <td>{item.orbit_duration_yr}</td>

                        <td>
                          <img
                            style={{ maxWidth: "80px" }}
                            src={item.flickr_images[0]}
                          />
                        </td>
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

export default connect(mapStateToProps, null)(Dragons);
