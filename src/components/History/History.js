import React from "react";
import Header from "../Dashboard/Header/Header";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import SearchBar from "../SearchBar/SearchBar";
import { connect } from "react-redux";

class History extends React.Component {
  constructor() {
    super();
    this.state = {
      Data: [],
    };
  }

  getSearchedItem = () => {
    let Base_url = "https://api.spacexdata.com/v3/history/";
    fetch(Base_url + `${this.props.searchItem}`)
      .then((res) => res.json())
      .then((res) => {
        let searchedValue = [];
        searchedValue.push(res);
        this.setState({ Data: searchedValue });
      });
  };

  componentDidMount() {
    fetch("https://api.spacexdata.com/v3/history")
      .then((res) => res.json())
      .then((res) => this.setState({ Data: res }));
  }

  handleAllCapsule = () => {
    fetch("https://api.spacexdata.com/v3/history")
      .then((res) => res.json())
      .then((res) => this.setState({ Data: res }));
  };

  render() {
    return (
      <div>
        <Header />
        <div className="capsule-container">
          <h1>History</h1>
          <br />

          <div className="filter-container">
            <SearchBar getSearchedItem={this.getSearchedItem} />
            <Dropdown className="filter-button">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.handleAllCapsule}>
                  All
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Event Date</th>
                <th>Flight Number</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Data.length > 0
                ? this.state.Data.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.event_date_unix}</td>
                        <td>{item.flight_number}</td>
                        <td>{item.details}</td>
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

export default connect(mapStateToProps, null)(History);
